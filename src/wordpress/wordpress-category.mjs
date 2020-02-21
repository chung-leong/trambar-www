import { WordpressObject } from './wordpress-object.mjs';
import { Text } from '../text.mjs';

class WordpressCategory extends WordpressObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    if (json) {
      this.id = json.id;
      this.count = json.count;
      this.name = new Text(json.name);
      this.description = new Text(json.description);
      this.link = json.link;
      this.slug = json.slug;
      this.taxonomy = json.taxonomy;
      this.parent = json.parent;
      this.meta = json.meta;
    }
  }

  static getObjectFolder() {
    return 'wp/v2/categories';
  }
}

export {
  WordpressCategory,
};
