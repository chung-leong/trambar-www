import { ExcelObject } from './excel-object.mjs';
import { ExcelSheet } from './excel-sheet.mjs';
import { chooseLanguageVersion } from '../html-text.mjs';

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
      this.languages = [];
      this.sheets = [];
      for (let sheetData of json.sheets || []) {
        const sheet = new ExcelSheet(identifiers, sheetData);
        this.sheets.push(sheet);
        for (let code of sheet.languages) {
          if (this.languages.indexOf(code) === -1) {
            this.languages.push(code);
          }
        }
      }
    }
  }

  getSheet(name) {
    for (let sheet of this.sheets) {
      if (sheet.name === name) {
        return sheet;
      }
    }
  }

  getLanguageSpecific(lang) {
    const file = new ExcelFile(this.identifiers);
    file.title = this.title;
    file.type = this.type;
    file.filename = this.filename;
    file.keywords = this.keywords;
    file.subject = this.subject;
    file.description = this.description;
    file.language = lang.toLowerCase();
    file.sheets = [];
    const chosen = chooseLanguageVersion(this.sheets, file.language);
    for (let sheet of chosen) {
      const newSheet = sheet.getLanguageSpecific(file.language);
      file.sheets.push(newSheet);
    }
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
