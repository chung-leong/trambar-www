import { Text } from './text.mjs';

class DataSourceObject {
  constructor(identifiers) {
    this.identifiers = identifiers;
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
    const object = new this.constructor;
    for (let [ name, value ] of Object.entries(this)) {
      if (value instanceof Text) {
        value = value.getLanguageSpecific(lang);
      }
      object[name] = value;
    }
    return object;
  }

  getImage(url) {
    for (let [ name, value ] of Object.entries(this)) {
      if (value instanceof Text) {
        const image = value.getImage(url);
        if (image) {
          return image;
        }
      }
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
