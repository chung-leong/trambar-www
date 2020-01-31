import { ExcelObject } from './excel-object.mjs';

class ExcelColumn extends ExcelObject {
  constructor(sheet, data) {
    super(sheet.identifiers, data);

    this.sheet = sheet;
    this.name = data.name || '';
    this.flags = data.flags || [];
    this.cells = [];
  }

  row(index) {
    return this.cells[index];
  }
}

export {
    ExcelColumn,
};
