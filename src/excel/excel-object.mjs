import { DataSourceObject } from '../data-source-object.mjs';
import { isLanguageCode } from '../html-text.mjs';

class ExcelObject extends DataSourceObject {
  findAvailableLanguage(flags, parentCodes) {
    const codes = [];
    if (flags instanceof Array) {
      for (let flag of flags) {
        if (isLanguageCode(flag)) {
          codes.push(flag.toLowerCase());
        }
      }
    }
    return (codes.length > 0) ? codes : parentCodes;
  }
}

export {
  ExcelObject
};
