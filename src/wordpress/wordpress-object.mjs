import { DataSourceObject } from '../data-source-object.mjs';

class WordpressObject extends DataSourceObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.siteId = identifiers[0];
  }

  static getObjectURL(identifiers) {
    const [ siteId, objectId ] = identifiers;
    const folder = this.getObjectFolder();
    let url = `rest/${siteId}/`;
    if (folder) {
      url += `${folder}/`;
    }
    if (objectId) {
      url += `${objectId}/`;
    }
    return url;
  }

  static getObjectFolder() {
    return '';
  }

  static getPageVariable() {
    return '';
  }
}

export {
  WordpressObject
};
