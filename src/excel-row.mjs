import { parsePath, chooseLanguageVersion } from './excel-utils.mjs';

class ExcelRow {
    constructor(sheet) {
        this.sheet = sheet;
        this.cells = [];
    }

    static create(sheet) {
        return new ExcelRow(sheet);
    }

    get(path) {
        const names = parsePath(path, 1);
        return this.column(names[0]);
    }

    column(name) {
        const columns = this.sheet.columns;
        for (let [ index, column ] of columns.entries()) {
            if (column.name === name) {
                return this.cells[index];
            }
        }
    }

    plainText(options) {
        return this.map((cell) => cell.getPlainText(options));
    }

    richText(options) {
        return this.map((cell) => cell.getRichText(options));
    }

    map(f) {
        const columns = this.sheet.columns;
        const object = {};
        for (let [ index, cell ] of this.cell) {
            const column = columns[index];
            if (object[column.name] === undefined) {
                object[column.name] = f(cell);
            }
        }
        return object;
    }

    filter(language) {
        const columns = this.sheet.columns;
        const chosen = chooseLanguageVersion(columns, language);
        const excluded = [];
        for (let column of this.sheet.columns) {
            if (chosen.indexOf(column) === -1) {
                excluded.push(true);
            } else {
                excluded.push(false);
            }
        }
        return this.exclude(excluded);
    }

    exclude(excluded) {
        const row = new ExcelRow(this.sheet);
        for (let [ index, cell ] of this.cells.entries()) {
            if (!excluded[index]) {
                row.cells.push(cell);
            }
        }
        return row;
    }

    includes(cell) {
        return this.cells.indexOf(cell) !== -1;
    }
}

export {
    ExcelRow,
};
