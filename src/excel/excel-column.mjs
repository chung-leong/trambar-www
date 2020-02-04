import { ExcelObject } from './excel-object.mjs';
import { findLanguageCodes } from '../html-text.mjs';

class ExcelColumn extends ExcelObject {
  constructor(identifiers, data, defaultLanguages) {
    super(identifiers, data);
    this.cells = [];

    if (data) {
      this.name = data.name || '';
      this.flags = data.flags || [];
      this.languages = findLanguageCodes(this.flags, defaultLanguages);
    }
  }

  getRow(index) {
    return this.cells[index];
  }
}

export {
    ExcelColumn,
};
