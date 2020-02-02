import { HTMLText } from './html-text.mjs';

class DataSourceObject {
  constructor(identifiers, json) {
    this.identifiers = identifiers;
    this.json = json;
  }

  getAvailableLanguages() {
    const codes = [];
    for (let value of Object.values(this)) {
      if (value instanceof HTMLText) {
        const textCodes = value.getAvailableLanguages();
        for (let code of textCodes) {
          if (codes.indexOf(code) === -1) {
            codes.push(code);
          }
        }
      }
    }
    return codes;
  }

  getLanguageSpecific(lang) {
    const object = new this.constructor(this.identifiers);
    for (let [ name, value ] of Object.entries(this)) {
      if (value instanceof HTMLText) {
        value = value.getLanguageSpecific(lang);
      }
      object[name] = value;
    }
  }

  static getObjectURL(identifiers) {
    return '';
  }

  static getPageVariable() {
    return '';
  }
}

export {
  DataSourceObject,
};
