import { parsePath, chooseLanguageVersion } from './utils.mjs';

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

    filter(language) {
        if (this.language) {
            return this;
        }
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
        const row = this.exclude(excluded);
        row.language = language;
        return row;
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

    image(url) {
        for (let cell of this.cells) {
            const image = cell.image(url);
            if (image) {
                return image;
            }
        }
    }
}

export {
    ExcelRow,
};
