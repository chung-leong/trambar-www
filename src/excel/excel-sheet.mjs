import { ExcelObject } from './excel-object.mjs';
import { ExcelColumn } from './excel-column.mjs';
import { ExcelRow } from './excel-row.mjs';
import { ExcelCell } from './excel-cell.mjs';
import { findLanguageCodes, chooseLanguageVersion } from '../text.mjs';

class ExcelSheet extends ExcelObject {
  constructor(identifiers, data) {
    super(identifiers);
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
        const row = new ExcelRow(identifiers, columnNames, this.languages);
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
    for (let column of chosen) {
      const newColumn = new ExcelColumn(this.identifiers);
      newColumn.name = column.name;
      newColumn.flags = column.flags;
      newColumn.language = sheet.language;
      for (let cell of column.cells) {
        const newCell = new ExcelCell(this.identifiers);
        newCell.type = cell.type;
        newCell.content = cell.content;
        newCell.language = sheet.language;
        newColumn.cells.push(newCell);
      }
      sheet.columns.push(newColumn);
      columnNames.push(newColumn.name);
    }
    for (let [ index, row ] of this.rows.entries()) {
      const newRow = new ExcelRow(this.identifiers);
      newRow.names = columnNames;
      for (let newColumn of sheet.columns) {
        newRow.cells.push(newColumn.cells[index]);
      }
      sheet.rows.push(newRow);
    }
    return sheet;
  }

  getLanguageSpecificSections(lang) {
    const sheet = new ExcelSheet(this.identifiers);
    sheet.name = this.name;
    sheet.flags = this.flags;
    sheet.languages = this.languages;
    const chosen = chooseLanguageVersion(this.columns, lang.toLowerCase());
    for (let column of this.columns) {
      const newColumn = new ExcelColumn(this.identifiers);
      newColumn.name = column.name;
      newColumn.flags = column.flags;
      newColumn.languages = column.languages;
      newColumn.match = (chosen.indexOf(column) !== -1);
      for (let cell of column.cells) {
        const newCell = new ExcelCell(this.identifiers);
        newCell.type = cell.type;
        newCell.content = cell.content;
        newCell.languages = cell.languages;
        newCell.match = newColumn.match;
        newColumn.cells.push(newCell);
      }
      sheet.columns.push(newColumn);
    }
    for (let [ index, row ] of this.rows.entries()) {
      const newRow = new ExcelRow(this.identifiers);
      newRow.names = row.names;
      for (let newColumn of sheet.columns) {
        newRow.cells.push(newColumn.cells[index]);
      }
      sheet.rows.push(newRow);
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
