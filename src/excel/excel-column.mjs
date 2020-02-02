import { ExcelObject } from './excel-object.mjs';
import { isLanguageCode } from '../html-text.mjs';

class ExcelColumn extends ExcelObject {
  constructor(sheet, data) {
    super(sheet.identifiers, data);

    this.sheet = sheet;
    this.name = data.name || '';
    this.flags = data.flags || [];
    this.cells = [];
  }

  getRow(index) {
    return this.cells[index];
  }

  getAvailableLanguages() {
    const codes = [];
    for (let flag of this.flags) {
      if (isLanguageCode(flag)) {
        codes.push(flag.toLowerCase());
      }
    }
    if (codes.length === 0) {
      for (let flag of this.sheet.flags) {
        if (isLanguageCode(flag)) {
          codes.push(flag.toLowerCase());
        }
      }
    }
    return codes;
  }
}

export {
    ExcelColumn,
};
