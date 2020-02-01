import { ExcelObject } from './excel-object.mjs';
import { ExcelColumn } from './excel-column.mjs';
import { ExcelRow } from './excel-row.mjs';
import { isLanguageCode } from '../html-text.mjs';

class ExcelSheet extends ExcelObject {
  constructor(file, data) {
    super(file.identifiers, data);

    this.file = file;
    this.name = data.name || '';
    this.flags = data.flags || [];
    this.languageCodes = this.findAvailableLanguage(data.flags);
    this.columns = (data.columns || []).map((columnData) => {
      return new ExcelColumn(this, columnData);
    });
    this.rows = (data.rows || []).map((rowData) => {
      return new ExcelRow(this, rowData);
    });
  }

  getColumn(name) {
    for (let column of this.columns) {
      if (column.name === name) {
        return column;
      }
    }
  }

  getRow(index) {
    return this.rows[index];
  }

  getAvailableLanguages() {
    const codes = [];
    for (let column of this.columns) {
      const columnCodes = column.getAvailableLanguages();
      for (let code of columnCodes) {
        if (codes.indexOf(code) === -1) {
          codes.push(code);
        }
      }
    }
    return codes;
  }
}

export {
  ExcelSheet,
};
