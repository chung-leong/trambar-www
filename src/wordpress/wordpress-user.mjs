import { WordpressObject } from './wordpress-object.mjs';
import { Text } from '../text.mjs';

class WordpressUser extends WordpressObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    if (json) {
      this.id = json.id;
      this.url = json.url;
      this.name = new Text(json.name);
      this.description = new Text(json.description);
      this.link = json.link;
      this.slug = json.slug;
      this.avatarURLs = json.avatar_urls;
      this.meta = json.meta;
    }
  }

  static getObjectFolder() {
    return 'wp/v2/users';
  }
}

export {
  WordpressUser,
};
