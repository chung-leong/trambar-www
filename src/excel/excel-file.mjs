import { ExcelSheet } from './excel-sheet.mjs';
import { parsePath } from '../utils/path-utils.mjs';
import { chooseLanguageVersion } from '../utils/language-utils.mjs';

class ExcelFile {
    constructor() {
        this.sheets = [];
    }

    static create(data) {
        const file = new ExcelFile;
        file.identifier = data.identifier;
        file.url = data.url || '';
        file.title = data.title || '';
        file.type = data.type || '';
        file.identifier = data.identifier || '';
        file.filename = data.filename || '';
        file.keywords = data.keywords || [];
        file.subject = data.subject || '';
        file.description = data.description || '';
        if (data.sheets instanceof Array) {
            for (let sheetData of data.sheets) {
                file.sheets.push(ExcelSheet.create(file, sheetData));
            }
        }
        return file;
    }

    get(path) {
        const names = parsePath(path, 3);
        const sheet = this.sheet(names[0]);
        if (sheet) {
            if (names.length === 1) {
                return sheet;
            } else {
                return sheet.get(names.slice(1));
            }
        }
    }

    sheet(name) {
        for (let sheet of this.sheets) {
            if (sheet.name === name) {
                return sheet;
            }
        }
    }

    plainText(options) {
        return this.map((sheet) => sheet.plainText(options));
    }

    richText(options) {
        return this.map((sheet) => sheet.richText(options));
    }

    map(f) {
        const object = {};
        for (let sheet of this.sheets) {
            if (object[sheet.name] === undefined) {
                object[sheet.name] = f(sheet);
            }
        }
        return object;
    }

    filter(language, noFallback) {
        if (this.language) {
            return this;
        }
        const file = new ExcelFile;
        file.identifier = this.identifier;
        file.url = this.url;
        file.title = this.title;
        file.type = this.type;
        file.name = this.name;
        file.keywords = this.keywords;
        file.subject = this.subject;
        file.description = this.description;
        file.language = language;

        const sheets = chooseLanguageVersion(this.sheets, language, noFallback);
        for (let sheet of sheets) {
            file.sheets.push(sheet.filter(language, noFallback))
        }
        return file;
    }

    languages() {
        const list = [];
        for (let sheet of this.sheets) {
            const sheetList = sheet.languages();
            for (let code of sheetList) {
                if (list.indexOf(code) === -1) {
                    list.push(code);
                }
            }
        }
        return list;
    }

    includes(object) {
        for (let sheet of this.sheets) {
            if (sheet.includes(object)) {
                return true;
            }
        }
        return false;
    }

    image(url) {
        for (let sheet of this.sheets) {
            const image = sheet.image(url);
            if (image) {
                return image;
            }
        }
    }

    localization(language, noFallback) {
        const filtered = this.filter(language, noFallback);
        const table = {};
        for (let sheet of filtered.sheets) {
            if (sheet.columns.length >= 2) {
                for (let row of sheet.rows) {
                    const [ cell1, cell2 ] = row.cells;
                    if (cell1 && cell2) {
                        const phrase = cell1.plainText();
                        const translation = cell2.plainText();
                        table[phrase] = translation;
                    }
                }
            }
        }
        return table;
    }
}

export {
    ExcelFile,
};
