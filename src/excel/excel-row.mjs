import { ExcelObject } from './excel-object.mjs';
import { chooseLanguageVersion } from '../html-text.mjs';

class ExcelRow extends ExcelObject {
  constructor(identifiers, data, sheetLanguageCodes) {
    super(identifiers, data);
    this.cells = [];
    this.languages = sheetLanguageCodes;
  }

  getColumn(name) {
    const columns = this.sheet.columns;
    for (let [ index, column ] of columns.entries()) {
      if (column.name === name) {
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
}

export {
  ExcelRow,
};
