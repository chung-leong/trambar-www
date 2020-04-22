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
  app.get('/data/excel/:fileId/', handleExcelRequest);
  app.get('/data/excel/', handleExcelListRequest);
  app.get('/data/repo/:repoId/wiki/:slug/', handleWikiRequest);
  app.get('/data/repo/:repoId/wiki/', handleWikiListRequest);
  app.get('/data/repo/:repoId/', handleRepoRequest);
  app.get('/data/repo/', handleRepoListRequest);
  app.get('/data/rest/:restId/*', handleRestRequest);
  app.get('/data/rest/:restId/', handleRestRequest);
  app.get('/data/rest/', handleRestListRequest);
  app.get('/data/meta/', handleMetaRequest);
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
    const { fileId } = req.params;
    const data = await loadExcel(fileId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function handleExcelListRequest(req, res, next) {
  try {
    const fileIds = await findExcel();
    res.json(fileIds);
  } catch (err) {
    next(err);
  }
}

async function handleWikiRequest(req, res, next) {
  try {
    const { repoId, slug } = req.params;
    const data = await loadWiki(repoId, slug);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function handleWikiListRequest(req, res, next) {
  try {
    const { repoId } = req.params;
    const slugs = await findWiki(repoId);
    res.json(slugs);
  } catch (err) {
    next(err);
  }
}

async function handleRepoRequest(req, res, next) {
  try {
    const { repoId } = req.params;
    const repo = await loadRepo(repoId);
    res.json(repo);
  } catch (err) {
    next(err);
  }
}

async function handleRepoListRequest(req, res, next) {
  try {
    const repoIds = await findRepos();
    res.json(repoIds);
  } catch (err) {
    next(err);
  }
}

async function handleRestRequest(req, res, next) {
  try {
    const { restId } = req.params;
    const path = req.params[0];
    const data = await findRestObjects(restId, path);
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

async function handleMetaRequest(req, res, next) {
  try {
    const data = await loadProjectMeta();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

function handleError(err, req, res, next) {
  console.log(err.stack);
  res.sendStatus(400);
}

async function loadProjectMeta() {
  const jsonPath = `${__dirname}/../assets/project.json`;
  const jsonText = await readFile(jsonPath, 'utf8');
  const project = JSON.parse(jsonText);
  const data = {
    id: project.name,
    title: convertMultilingualText(project.details.title),
    description: convertMultilingualText(project.details.description),
    archived: project.archived,
  };
  return data;
}

async function loadExcel(fileId) {
  const path = `${__dirname}/../assets/excel/${fileId}.xlsx`;
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
    mediaImport.src;
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

async function loadWiki(repoId, slug) {
  const path = `${__dirname}/../assets/gitlab/${repoId}/${slug}.md`;
  const text = await readFile(path, 'utf8');
  const json = await parseMarkdown(text);
  const resources = await importImages(json);
  const title = createTitle(slug);
  const data = {
    slug,
    title: { json: [ title ] },
    content: { json, resources },
  };
  return data;
}

async function findRepos() {
  const path = `${__dirname}/../assets/gitlab`;
  const names = await readdir(path);
  const folders = [];
  for (let name of names) {
    const info = await stat(`${path}/${name}`);
    if (info.isDirectory()) {
      folders.push(name);
    }
  }
  return _.sortBy(folders);
}

async function loadRepo(repoId) {
  const jsonPath = `${__dirname}/../assets/gitlab/${repoId}.json`;
  const jsonText = await readFile(jsonPath, 'utf8');
  const repo = JSON.parse(jsonText);
  const data = {
    id: repo.name,
    title: convertMultilingualText(repo.details.title),
    description: convertMultilingualText(repo.details.description),
  };
  return data;
}

async function findWiki(repoId) {
  const path = `${__dirname}/../assets/gitlab/${repoId}`;
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

async function findRestSources() {
  const path = `${__dirname}/../assets/rest`;
  const names = await readdir(path);
  const folders = [];
  for (let name of names) {
    const info = await stat(`${path}/${name}`);
    if (info.isDirectory()) {
      folders.push(name);
    }
  }
  return _.sortBy(folders);
}

async function findRestObjects(restId, path) {
  const name = restId + ((path) ? `/${_.trimEnd(path, '/')}` : ``);
  try {
    const jsonPath = `${__dirname}/../assets/rest/${name}.json`;
    const jsonText = await readFile(jsonPath, 'utf8');
    const json = JSON.parse(jsonText);
    const res = await transformData(json, { type: 'wordpress' });
    return res;
  } catch (err) {
    const folderPath = `${__dirname}/../assets/rest/${name}`;
    const names = await readdir(folderPath);
    return _.map(names, name => parseInt(name));
  }
}

async function transformData(data, rest) {
  let transformed;
  if (rest.type === 'wordpress') {
    transformed = await transformWPData(data, rest);
  } else {
    return data;
  }
  if (transformed instanceof Array) {
    transformed.total = data.total;
    transformed.pages = data.pages;
  }
  return transformed;
}

const wpProps = {
  _links: { omit: true },
  authentication: { omit: true },
  date: { omit: true },
  description: { html: true },
  comment_status: { omit: true },
  guid: { omit: true },
  modified: { omit: true },
  name: { html: true },
  namespaces: { omit: true },
  routes: { omit: true },
  ping_status: { omit: true },
  template: { omit: true },
};

async function transformWPData(data, url) {
  if (data instanceof Array) {
    return _.map(data, 'id');
  } else {
    const res = {};
    for (let [ key, value ] of Object.entries(data)) {
      const prop = wpProps[key] || {};
      if (!prop.omit) {
        let html, additional;
        if (value instanceof Object) {
          const { rendered, ...others } = value;
          if (typeof(rendered) === 'string') {
            html = rendered;
            additional = others;
          }
        } else if (prop.html) {
          html = value;
          additional = {};
        }
        if (html !== undefined) {
          // parse the HTML
          const json = await parseHTML(html);
          const resources = await importImages(json);
          value = { json, resources, ...additional };
        }
        res[key] = value;
      }
    }
    return res;
  }
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

function convertMultilingualText(langText) {
  const json = [];
  if (langText instanceof Object) {
    const entries = Object.entries(langText);
    for (let [ lang, text ] of entries) {
      // add heading when there're multiple languages
      if (entries.length > 1) {
        const heading = `(${lang})`;
        json.push({ type: 'h1', children: [ heading ] });
      }
      json.push(text);
    }
  }
  return { json };
}

function createTitle(slug) {
  let title = slug.replace(/-/g, ' ');
  title = title.substr(0, 1).toUpperCase() + title.substr(1);
  return title;
}

async function importImages(json) {
  const list = [];
  for (let token of json) {
    if (typeof(token) === 'object') {
      const { type, props, children } = token;
      if (type === 'img') {
        const type = 'image';
        const src = props.src;
        const hash = Crypto.createHash('md5').update(src).digest('hex');
        const url = `/srv/media/images/${hash}/`;
        const width = hash.charCodeAt(1) * 10;
        const height = hash.charCodeAt(2) * 10;
        list.push({ type, src, url, width, height });
      }
      if (children instanceof Array) {
        const clist = await importImages(children);
        if (clist) {
          for (let res of clist) {
            list.push(res);
          }
        }
      }
    }
  }
  return (list.length > 0) ? list : undefined;
}

async function parseMarkdown(text) {
  const parser = new MarkGor.AsyncParser;
  const renderer = new MarkGor.JSONRenderer;
  const tokens = await parser.parse(text);
  const json = renderer.render(tokens);
  return json;
}

async function parseHTML(html) {
  const parser = new MarkGor.AsyncParser({ htmlOnly: true });
  const renderer = new MarkGor.JSONRenderer;
  const tokens = await parser.parse(html);
  const json = renderer.render(tokens);
  return json;
}

process.on('unhandledRejection', (reason, promise) => {
  console.log(`Unhandled Rejection: ${reason}`);
});

module.exports = {
  start,
  stop,
};
