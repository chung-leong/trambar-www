import { WordpressObject } from './wordpress-object.mjs';
import { HTMLText } from '../html-text.mjs';

class WordpressTag extends WordpressObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.id = json.id;
    this.count = json.count;
    this.name = new HTMLText(json.name);
    this.description = new HTMLText(json.description);
    this.link = json.link;
    this.slug = json.slug;
    this.taxonomy = json.taxonomy;
    this.meta = json.meta;
  }

  static getObjectFolder() {
    return 'wp/v2/tags';
  }
}

export {
  WordpressTag,
};
