import { ExcelSheet } from './excel-sheet.mjs';
import { parsePath, chooseLanguageVersion } from './excel-utils.mjs';

class ExcelFile {
    constructor() {
        this.sheets = [];
    }

    static create(data) {
        const file = new ExcelFile;
        file.title = data.title;
        file.type = data.type;
        file.name = data.name;
        file.keywords = data.keywords;
        file.subject = data.subject;
        file.description = data.description;
        for (let sheetData of data.sheets) {
            file.sheets.push(ExcelSheet.create(file, sheetData));
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

    filter(language) {
        const file = new ExcelFile;
        file.title = this.title;
        file.type = this.type;
        file.name = this.name;

        const sheets = chooseLanguageVersion(this.sheets, language);
        for (let sheet of sheets) {
            file.sheets.push(sheet.filter(language))
        }
        return file;
    }

    includes(cell) {
        for (let sheet of this.sheets) {
            if (sheet.includes(cell)) {
                return true;
            }
        }
        return false;
    }
}

export {
    ExcelFile,
};
