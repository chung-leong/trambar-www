const _ = require('lodash');
const Express = require('express');
const CORS = require('cors');
const ExcelJS = require('exceljs');
const Util = require('util');
const FS = require('fs');

const readFile = Util.promisify(FS.readFile);

module.exports = {
    start,
    stop,
};

let server;
let serverPort;

async function start(port) {
    // set up handlers
    const app = Express();
    app.use(CORS());
    app.set('json spaces', 2);
    app.get('/excel/:name', handleExcelRequest);
    app.get('/wiki/:slug', handleWikiRequest);
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
        const name = req.params.name;
        const path = `${__dirname}/../assets/${name}.xlsx`;
        const buffer = await readFile(path);
        const data = await parseSpreadsheet(buffer);
        res.json({ name, ...data });
    } catch (err) {
        next(err);
    }
}

async function handleWikiRequest(res, res) {
    try {
        const slug = req.params.slug;
        const path = `${__dirname}/../assets/${slug}.md`;
        const text = await readFile(path, 'utf8');
        const data = {
            slug: slug,
            title: slug.replace(/-/g, ' '),
            markdown: text
        };
        res.json(data);
    } catch (err) {
        next(err);
    }
}

function handleError(err, req, res) {
    console.err(err);
    res.sendStatus(400);
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
        const sheetName = _.trim(worksheet.name);
        const { state, rowCount, columnCount } = worksheet;
        if (state === 'visible' && sheetName) {
            const { rowCount, columnCount } = worksheet;
            const sheet = {
                name: sheetName,
                columns: [],
                rows: [],
            };
            const importing = {};
            for (let r = 1; r <= rowCount; r++) {
                const row = worksheet.getRow(r);
                if (r === 1) {
                    for (let c = 1; c <= columnCount; c++) {
                        const cell = row.getCell(c);
                        let name = _.trim(cell.text);
                        if (/\[import\]/i.test(name)) {
                            name = name.replace(/\s*\[import\]\s*/, ''),
                            importing[c] = true;
                        }
                        sheet.columns.push(name);
                    }
                } else {
                    const currentRow = [];
                    for (let c = 1; c <= columnCount; c++) {
                        const cell = row.getCell(c);
                        const value = extractCellValue(cell, !!importing[c]);
                        currentRow.push(value);
                    }
                    sheet.rows.push(currentRow);
                }
            }
            sheets.push(sheet);
        }
    }
    return { title, subject, description, keywords, sheets };
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
