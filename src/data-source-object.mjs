class DataSourceObject {
  constructor(identifiers, json) {
    this.identifiers = identifiers;
    this.json = json;
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
