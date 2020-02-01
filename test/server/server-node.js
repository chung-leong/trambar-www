const _ = require('lodash');
const Express = require('express');
const CORS = require('cors');
const ExcelJS = require('exceljs');
const Util = require('util');
const FS = require('fs');
const Crypto = require('crypto');
const MarkGor = require('mark-gor');

const readFile = Util.promisify(FS.readFile);
const readdir = Util.promisify(FS.readdir);
const stat = Util.promisify(FS.stat);

module.exports = {
  start,
  stop,
};

let server;
let serverPort;

async function start(port) {
  // set up handlers
  const app = Express();
  const corsOptions = {
    exposedHeaders: [ 'etag' ],
  };
  app.use(CORS(corsOptions));
  app.set('json spaces', 2);
  app.get('/data/excel/:identifier/', handleExcelRequest);
  app.get('/data/excel/', handleExcelListRequest);
  app.get('/data/wiki/:identifier/:slug/', handleWikiRequest);
  app.get('/data/wiki/:identifier/', handleWikiListRequest);
  app.get('/data/wiki/', handleWikiListRequest);
  app.get('/data/rest/:identifier/*', handleRestRequest);
  app.get('/data/rest/:identifier/', handleRestRequest);
  app.get('/data/rest/', handleRestListRequest);
  app.use(handleError);

  // start up server
  await new Promise((resolve, reject) => {
    try {
      server = app.listen(port, resolve);
      serverPort = port;

      // break connections on shutdown
      const connections = {};
      server.on('connection', function(conn) {
        const key = conn.remoteAddress + ':' + conn.remotePort;
        connections[key] = conn;
        conn.on('close', function() {
          delete connections[key];
        });
      });
      server.destroy = function(cb) {
        server.close(cb);
        for (let key in connections) {
          connections[key].destroy();
        }
      };
    } catch (err) {
      reject(err);
    }
  });
}

async function stop() {
  await new Promise((resolve, reject) => {
    if (server) {
      server.destroy(resolve);
      server = null;
    }
  });
}

async function handleExcelRequest(req, res, next) {
  try {
    const { identifier } = req.params;
    const data = await loadExcel(identifier);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function handleExcelListRequest(req, res, next) {
  try {
    const identifiers = await findExcel();
    res.json(identifiers);
  } catch (err) {
    next(err);
  }
}

async function handleWikiRequest(req, res, next) {
  try {
    const { identifier, slug } = req.params;
    const data = await loadWiki(identifier, slug);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function handleWikiListRequest(req, res, next) {
  try {
    const { identifier } = req.params;
    if (identifier !== undefined) {
      const slugs = await findWiki(identifier);
      res.json(slugs);
    } else {
      const urls = [];
      const identifiers = await findRepos();
      for (let identifier of identifiers) {
        const slugs = await findWiki(identifier);
        for (let slug of slugs) {
          urls.push(`${identifier}/${slug}`);
        }
      }
      res.json(urls);
    }
  } catch (err) {
    next(err);
  }
}

async function handleRestRequest(req, res, next) {
  try {
    const { identifier } = req.params;
    const path = req.params[0];
    const data = await findRestObjects(identifier, path);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function handleRestListRequest(req, res, next) {
  try {
    const data = await findRestSources();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

function handleError(err, req, res, next) {
  console.log(err.stack);
  res.sendStatus(400);
}

async function loadExcel(identifier) {
  const path = `${__dirname}/../assets/excel/${identifier}.xlsx`;
  const buffer = await readFile(path);
  const workbook = await parseSpreadsheet(buffer);
  const mediaImports = findMediaImports(workbook.sheets);
  for (let mediaImport of mediaImports) {
    const src = mediaImport.src;
    const hash = Crypto.createHash('md5').update(src).digest('hex');
    const type = src.split('.').pop();
    mediaImport.url = `http://localhost/srv/media/image/${hash}`;
    mediaImport.type = 'image';
    mediaImport.format = (type === 'jpg') ? 'jpeg' : type;
    mediaImport.width = 1000;
    mediaImport.height = 500;
    delete mediaImport.src;
  }
  return workbook;
}

async function findExcel() {
  const path = `${__dirname}/../assets/excel`;
  const filenames = await readdir(path);
  const names = [];
  for (let filename of filenames) {
    const m = /(.*)\.xlsx$/.exec(filename);
    if (m) {
      names.push(m[1]);
    }
  }
  return _.sortBy(names);
}

async function loadWiki(repoName, slug) {
  const path = `${__dirname}/../assets/gitlab/${repoName}/${slug}.md`;
  const text = await readFile(path, 'utf8');
  const data = {
    slug: slug,
    title: slug.replace(/-/g, ' '),
    json: parseMarkdown(text),
  };
  try {
    const jsonPath = `${__dirname}/../assets/gitlab/${repoName}/${slug}.json`;
    const jsonText = await readFile(jsonPath, 'utf8');
    const props = JSON.parse(jsonText);
    for (let [ key, value ] of Object.entries(props)) {
      data[key] = value;
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw err;
    }
  }
  return data;
}

async function findRepos() {
  const path = `${__dirname}/../assets/gitlab`;
  const folders = await readdir(path);
  const names = [];
  for (let folder of folders) {
    const info = await stat(`${path}/${folder}`);
    if (info.isDirectory()) {
      names.push(folder);
    }
  }
  return _.sortBy(names);
}

async function findWiki(repoName) {
  const path = `${__dirname}/../assets/gitlab/${repoName}`;
  const filenames = await readdir(path);
  const slugs = [];
  for (let filename of filenames) {
    const m = /(.*)\.md$/.exec(filename);
    if (m) {
      slugs.push(m[1]);
    }
  }
  return _.sortBy(slugs);
}

async function findRestObjects(identifier, path) {
  if (path) {
    try {
      const jsonPath = `${__dirname}/../assets/rest/${identifier}/${path}.json`;
      const jsonText = await readFile(jsonPath, 'utf8');
      const rest = JSON.parse(jsonText);
      return { identifier, rest };
    } catch (err) {
      const folderPath = `${__dirname}/../assets/rest/${identifier}/${path}`;
      const names = await readdir(folderPath);
      return _.map(names, (name) => {
        return parseInt(name);
      });
    }
  } else {
    const jsonPath = `${__dirname}/../assets/rest/${identifier}.json`;
    const jsonText = await readFile(jsonPath, 'utf8');
    const rest = JSON.parse(jsonText);
    return { identifier, rest };
  }
}

async function findRestSources() {
  const path = `${__dirname}/../assets/rest`;
  const folders = await readdir(path);
  return folders;
}

async function parseSpreadsheet(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const keywords = _.split(workbook.keywords, /\s+/);
  const title = workbook.title;
  const description = workbook.description;
  const subject = workbook.subject;
  const sheets = [];
  for (let worksheet of workbook.worksheets) {
    const { state, rowCount, columnCount } = worksheet;
    const sheetNameFlags = extractNameFlags(worksheet.name);
    if (state === 'visible' && sheetNameFlags) {
      const sheet = {
        ...sheetNameFlags,
        columns: [],
        rows: [],
      };
      const using = {};
      const importing = {};
      const { rowCount, columnCount } = worksheet;
      for (let r = 1; r <= rowCount; r++) {
        const row = worksheet.getRow(r);
        if (r === 1) {
          for (let c = 1; c <= columnCount; c++) {
            const cell = row.getCell(c);
            const columnNameFlags = extractNameFlags(cell.text);
            if (columnNameFlags) {
              const column = columnNameFlags;
              sheet.columns.push(column);
              using[c] = true;
              importing[c] = (column.flags && column.flags.indexOf('import') !== -1);
            }
          }
        } else {
          const currentRow = [];
          for (let c = 1; c <= columnCount; c++) {
            if (using[c]) {
              const cell = row.getCell(c);
              const value = extractCellValue(cell, importing[c]);
              currentRow.push(value);
            }
          }
          sheet.rows.push(currentRow);
        }
      }
      sheets.push(sheet);
    }
  }
  return { title, subject, description, keywords, sheets };
}

function extractNameFlags(text) {
  const trimmed = _.trim(text);
  if (trimmed) {
    const m = /\s*\(([^\)]+)\)$/.exec(trimmed);
    const results = {};
    if (m) {
      const name = trimmed.substr(0, trimmed.length - m[0].length);
      const flags = m[1].split(/\s*,\s*/).map(_.toLower);
      return { name, flags };
    } else {
      return { name: trimmed };
    }
  }
}

function extractCellValue(cell, importing) {
  if (importing) {
    const src = _.trim(cell.text);
    return { src };
  } else {
    const style = {};
    if (cell.alignment && !_.isEqual(cell.alignment, defaultAlignment)) {
      style.alignment = cell.alignment;
    }
    if (cell.border && !_.isEqual(cell.border, defaultBorder)) {
      style.border = cell.border;
    }
    if (cell.fill && !_.isEqual(cell.fill, defaultFill)) {
      style.fill = cell.fill;
    }
    let richText = (cell.value) ? cell.value.richText : null;
    if (!richText) {
      if (cell.font) {
        richText = [ { font: cell.font, text: cell.text } ];
      } else if (!_.isEmpty(style)) {
        richText = [ { font: {}, text: cell.text }];
      }
    }
    if (richText) {
      return { richText, ...style };
    } else {
      return cell.text;
    }
  }
}

const defaultAlignment = { vertical: 'top', horizontal: 'left' };
const defaultFill = { type: 'pattern', pattern: 'none' };
const defaultBorder = {};

function findMediaImports(sheets) {
  const list = [];
  for (let sheet of sheets) {
    for (let row of sheet.rows) {
      for (let cell of row) {
        if (cell.src) {
          list.push(cell);
        }
      }
    }
  }
  return list;
}

function parseMarkdown(text) {
  const parser = new MarkGor.Parser;
  const renderer = new MarkGor.JSONRenderer;
  const tokens = parser.parse(text);
  const json = renderer.render(tokens);
  return json;
}
