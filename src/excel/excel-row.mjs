import { ExcelObject } from './excel-object.mjs';
import { chooseLanguageVersion } from '../text.mjs';

class ExcelRow extends ExcelObject {
  constructor(identifiers, names, sheetLanguageCodes) {
    super(identifiers);
    this.cells = [];
    this.languages = sheetLanguageCodes;
    this.names = names;
  }

  getColumn(name) {
    for (let [ index, columnName ] of this.names.entries()) {
      if (columnName === name) {
        return this.cells[index];
      }
    }
  }

  getLanguageSpecific(lang) {
    const row = new ExcelRow(this.identifiers);
    row.language = lang.toLowerCase();
    const chosen = chooseLanguageVersion(this.cells, row.language);
    for (let cell of chosen) {
      row.cells.push(cell);
    }
    return row;
  }

  getImage(url) {
    for (let cell of this.cells) {
      const image = cell.getImage(url);
      if (image) {
        return image;
      }
    }
  }
}

export {
  ExcelRow,
};
