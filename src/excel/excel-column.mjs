import { parsePath } from '../utils/path-utils.mjs';

class ExcelColumn {
    constructor(sheet, data) {
        this.sheet = sheet;
        this.cells = [];
    }

    static create(sheet, data) {
        const column = new ExcelColumn(sheet);
        column.name = data.name || '';
        column.flags = data.flags || [];
        return column;
    }

    get(path) {
        const names = parsePath(path, 1);
        return this.row(names[0]);
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
        if (cell && this === cell.column) {
            return true;
        }
        return false;
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
    ExcelColumn,
};