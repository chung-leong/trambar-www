import { ExcelObject } from './excel-object.mjs';
import { ExcelCell } from './excel-cell.mjs';

class ExcelRow extends ExcelObject {
  constructor(sheet, data) {
    super(sheet.identifiers, data);

    this.sheet = sheet;
    this.cells = sheet.columns.map((column, index) => {
      const cell = new ExcelCell(column, (data || [])[index]);
      column.cells.push(cell);
      return cell;
    });
  }

  getColumn(name) {
    const columns = this.sheet.columns;
    for (let [ index, column ] of columns.entries()) {
      if (column.name === name) {
        return this.cells[index];
      }
    }
  }

  getAvailableLanguages() {
    return this.sheet.getLanguageCodes();
  }
}

export {
  ExcelRow,
};
