import { ExcelObject } from './excel-object.mjs';
import { findLanguageCodes } from '../text.mjs';

class ExcelColumn extends ExcelObject {
  constructor(identifiers, data, defaultLanguages) {
    super(identifiers);
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

  getImage(url) {
    for (let cell of this.cells) {
      const image = cell.getImage(url);
      if (image) {
        return image;
      }
    }
  }
}

export {
    ExcelColumn,
};
