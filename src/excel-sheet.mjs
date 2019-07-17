import { ExcelColumn } from './excel-column.mjs';
import { ExcelRow } from './excel-row.mjs';
import { ExcelCell } from './excel-cell.mjs';
import { chooseLanguageVersion } from './excel-utils.mjs';

class ExcelSheet {
    constructor(file) {
        this.file = file;
        this.columns = [];
        this.rows = [];
    }

    static create(file, data) {
        const sheet = new ExcelSheet(file);
        sheet.name = data.name;
        sheet.flags = data.flags;
        for (let columnData of data.columns) {
            sheet.columns.push(ExcelColumn.create(sheet, columnData));
        }
        for (let rowData of data.rows) {
            const row = ExcelRow.create(sheet);
            const cells = [];
            for (let [ index, data ] of rowData.entries()) {
                const column = sheet.columns[index];
                const cell = ExcelCell.create(column, data);
                row.cells.push(cell);
                column.cells.push(cell);
            }
            sheet.rows.push(row);
        }
        return sheet;
    }

    get(path) {
        const column = this.column(path[0]);
        if (column) {
            if (path.length === 1) {
                return column;
            } else {
                return column.get(path.slice(1));
            }
        }
    }

    column(name) {
        for (let column of this.columns) {
            if (column.name === name) {
                return column;
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
        const objects = [];
        for (let column of this.columns) {
            for (let [ index, cell ] of column.cells.entries()) {
                const object = objects[index];
                if (!object) {
                    object = objects[index] = {};
                }
                object[column.name] = f(cell);
            }
        }
        return objects;
    }

    filter(language) {
        const sheet = new ExcelSheet(this.file);
        sheet.name = this.name;
        sheet.flags = this.flags;

        const chosen = chooseLanguageVersion(this.columns, language);
        const excluded = [];
        for (let column of this.columns) {
            if (chosen.indexOf(column) === -1) {
                excluded.push(true);
            } else {
                excluded.push(false);
                sheet.columns.push(column);
            }
        }
        for (let row of this.rows) {
            sheet.rows.push(row.exclude(excluded));
        }
        return sheet;
    }

    includes(cell) {
        for (let column of this.columns) {
            if (column === cell.column) {
                return true;
            }
        }
        return false;
    }
}

export {
    ExcelSheet,
};
