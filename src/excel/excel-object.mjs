import { DataSourceObject } from '../data-source-object.mjs';

class ExcelObject extends DataSourceObject {
  getAvailableLanguages() {
    return this.languages;
  }
}

export {
  ExcelObject
};
