import { ExcelCell } from './excel-cell.mjs';

class ExcelColumn {
    constructor(sheet, data) {
        this.sheet = sheet;
        this.cells = [];
    }

    static create(sheet, data) {
        const column = new ExcelColumn(sheet);
        if (typeof(data) === 'string') {
            data = {
                name: data,
                flags: [],
            }
        }
        column.name = data.name;
        column.flags = data.flags || [];
        column.header = ExcelCell.create(column, data);
        return column;
    }

    get(path) {
        return this.row(path[0]);
    }

    row(index) {
        return this.cells[index];
    }

    plainText(options) {
        return this.map((cell) => cell.plainText(options));
    }

    richText(options) {
        return this.map((cell) => cell.richText(options));
    }

    map(f) {
        const objects = [];
        for (let cell of this.cells) {
            objects.push(f(cell));
        }
        return objects;
    }

    filter(language) {
        const chosen = chooseLanguageVersion(this.sheet.columns, language);
        if (chosen.indexOf(column) !== -1) {
            return this;
        }
    }

    includes(cell) {
        if (this === cell.column) {
            return true;
        }
        return false;
    }
}

export {
    ExcelColumn,
};
