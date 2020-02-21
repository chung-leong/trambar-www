import { ExcelObject } from './excel-object.mjs';
import { ExcelColumn } from './excel-column.mjs';
import { ExcelRow } from './excel-row.mjs';
import { ExcelCell } from './excel-cell.mjs';
import { findLanguageCodes, chooseLanguageVersion } from '../text.mjs';

class ExcelSheet extends ExcelObject {
  constructor(identifiers, data) {
    super(identifiers, data);
    this.columns = [];
    this.rows = [];

    if (data) {
      this.name = data.name || '';
      this.flags = data.flags || [];
      this.languages = [];
      const defaultLanguages = findLanguageCodes(this.flags);
      for (let columnData of data.columns || []) {
        const column = new ExcelColumn(identifiers, columnData, defaultLanguages);
        this.columns.push(column);
        for (let code of column.languages) {
          if (this.languages.indexOf(code) === -1) {
            this.languages.push(code);
          }
        }
      }
      for (let rowData of data.rows || []) {
        const row = new ExcelRow(identifiers, rowData, this.languages);
        this.rows.push(row);
        for (let [ index, cellData ] of rowData.entries()) {
          const column = this.columns[index];
          const cell = new ExcelCell(identifiers, cellData, column.languages);
          row.cells.push(cell);
          column.cells.push(cell);
        }
      }
    }
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

  getLanguageSpecific(lang) {
    const sheet = new ExcelSheet(this.identifiers);
    sheet.name = this.name;
    sheet.flags = this.flags;
    sheet.language = lang.toLowerCase();
    for (let i = 0; i < this.rows.length; i++) {
      const row = new ExcelRow(this.identifiers);
      sheet.rows.push(row);
    }
    const chosen = chooseLanguageVersion(this.columns, sheet.language);
    for (let column of chosen) {
      sheet.columns.push(column);
      for (let [ index, cell ] of column.cells.entries()) {
        const row = sheet.rows[index];
        row.cells.push(cell);
      }
    }
    return sheet;
  }
}

export {
  ExcelSheet,
};
