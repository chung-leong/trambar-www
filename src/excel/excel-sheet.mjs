import { ExcelObject } from './excel-object.mjs';
import { ExcelColumn } from './excel-column.mjs';
import { ExcelRow } from './excel-row.mjs';

class ExcelSheet extends ExcelObject {
  constructor(file, data) {
    super(file.identifiers, data);

    this.file = file;
    this.name = data.name || '';
    this.flags = data.flags || [];
    this.columns = (data.columns || []).map((columnData) => {
      return new ExcelColumn(this, columnData);
    });
    this.rows = (data.rows || []).map((rowData) => {
      return new ExcelRow(this, rowData);
    });
  }

  column(name) {
    for (let column of this.columns) {
      if (column.name === name) {
        return column;
      }
    }
  }

  row(index) {
    return this.rows[index];
  }
}

export {
  ExcelSheet,
};
