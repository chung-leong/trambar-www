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
      const columnNames = [];
      for (let columnData of data.columns || []) {
        const column = new ExcelColumn(identifiers, columnData, defaultLanguages);
        this.columns.push(column);
        columnNames.push(column.name);
        for (let code of column.languages) {
          if (this.languages.indexOf(code) === -1) {
            this.languages.push(code);
          }
        }
      }
      for (let rowData of data.rows || []) {
        const row = new ExcelRow(identifiers, rowData, columnNames, this.languages);
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
    const chosen = chooseLanguageVersion(this.columns, sheet.language);
    const columnNames = [];
    for (let columnChosen of chosen) {
      const column = new ExcelColumn(this.identifiers);
      column.name = columnChosen.name;
      column.flags = columnChosen.flags;
      column.language = sheet.language;
      for (let cellChosen of columnChosen.cells) {
        const cell = new ExcelCell(this.identifiers);
        cell.type = cellChosen.type;
        cell.content = cellChosen.content;
        cell.language = sheet.language;
        column.cells.push(cell);
      }
      sheet.columns.push(column);
      columnNames.push(column.name);
    }
    for (let [ index, rowExisting ] of this.rows.entries()) {
      const row = new ExcelRow(this.identifiers);
      row.names = columnNames;
      for (let column of sheet.columns) {
        row.cells.push(column.cells[index]);
      }
      sheet.rows.push(row);
    }
    return sheet;
  }

  getImage(url) {
    for (let column of this.columns) {
      const image = column.getImage(url);
      if (image) {
        return image;
      }
    }
  }

  getDictionary(options) {
    const dict = {};
    if (this.columns.length >= 2) {
      const richText = (options && options.richText);
      for (let row of this.rows) {
        const [ cell1, cell2 ] = row.cells;
        const phrase = cell1.content.getPlainText();
        let text;
        if (richText) {
          text = cell2.content.getRichText(options);
        } else {
          text = cell2.content.getPlainText(options);
        }
        dict[phrase] = text;
      }
    }
    return dict;
  }
}

export {
  ExcelSheet,
};
