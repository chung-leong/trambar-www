import { WordpressObject } from './wordpress-object.mjs';
import { HTMLText } from '../html-text.mjs';

class WordpressSite extends WordpressObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    if (json) {
      this.url = json.url;
      this.home = json.home;
      this.name = new HTMLText(json.name);
      this.description = new HTMLText(json.description);
      this.gmtOffset = json.gmt_offset;
      this.timezone = json.timezone_string;
    }
  }
}

export {
  WordpressSite,
};
