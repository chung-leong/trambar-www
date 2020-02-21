import { Text } from './text.mjs';

class DataSourceObject {
  constructor(identifiers, json) {
    this.identifiers = identifiers;
    this.json = json;
  }

  getAvailableLanguages() {
    const codes = [];
    for (let value of Object.values(this)) {
      if (value instanceof Text) {
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
      if (value instanceof Text) {
        value = value.getLanguageSpecific(lang);
      }
      object[name] = value;
    }
    return object;
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
