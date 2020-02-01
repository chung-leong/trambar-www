import { ExcelObject } from './excel-object.mjs';

class ExcelColumn extends ExcelObject {
  constructor(sheet, data) {
    super(sheet.identifiers, data);

    this.sheet = sheet;
    this.name = data.name || '';
    this.flags = data.flags || [];
    this.languageCodes = this.findAvailableLanguage(data.flags, sheet.languageCodes);
    this.cells = [];
  }

  getRow(index) {
    return this.cells[index];
  }

  getAvailableLanguages() {
    return this.languageCodes || [];
  }
}

export {
    ExcelColumn,
};
