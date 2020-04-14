import { WordpressObject } from './wordpress-object.mjs';
import { Text } from '../text.mjs';

class WordpressSite extends WordpressObject {
  constructor(identifiers, json) {
    super(identifiers);
    if (json) {
      this.url = json.url;
      this.home = json.home;
      this.name = new Text(json.name);
      this.description = new Text(json.description);
      this.gmtOffset = json.gmt_offset;
      this.timezone = json.timezone_string;
    }
  }

  static getObjectURL(identifiers) {
    const [ siteId ] = identifiers;
    let url = `rest/`;
    if (siteId) {
      url += `${siteId}/`;
    }
    return url;
  }
}

export {
  WordpressSite,
};
