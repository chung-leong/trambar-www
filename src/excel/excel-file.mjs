import { ExcelObject } from './excel-object.mjs';
import { ExcelSheet } from './excel-sheet.mjs';

class ExcelFile extends ExcelObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.fileId = identifiers[0];
    if (json) {
      this.title = json.title || '';
      this.type = json.type || '';
      this.filename = json.filename || '';
      this.keywords = json.keywords || [];
      this.subject = json.subject || '';
      this.description = json.description || '';
      this.sheets = (json.sheets || []).map((sheetData) => {
        return new ExcelSheet(this, sheetData);
      });
    }
  }

  getSheet(name) {
    for (let sheet of this.sheets) {
      if (sheet.name === name) {
        return sheet;
      }
    }
  }

  getAvailableLanguages() {
    const codes = [];
    for (let sheet of this.sheets) {
      const sheetCodes = sheet.getAvailableLanguages();
      for (let code of sheetCodes) {
        if (codes.indexOf(code) === -1) {
          codes.push(code);
        }
      }
    }
    return codes;
  }

  getLanguageSpecific(lang) {
    const file = new ExcelFile(this.identifiers);
    file.title = this.title;
    file.type = this.type;
    file.filename = this.filename;
    file.keywords = this.keywords;
    file.subject = this.subject;
    file.description = this.description;
    file.sheets = sheets;
    return file;
  }

  static getObjectURL(identifiers) {
    const [ fileId ] = identifiers;
    return `excel/${fileId}/`;
  }
}

export {
  ExcelFile,
};
