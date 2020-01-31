import { WordpressObject } from './wordpress-object.mjs';
import { HTMLText } from '../html-text.mjs';

class WordpressUser extends WordpressObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.id = json.id;
    this.profileURL = json.url;
    this.name = new HTMLText(json.name);
    this.description = new HTMLText(json.description);
    this.link = json.link;
    this.slug = json.slug;
    this.avatarURLs = json.avatar_urls;
    this.meta = json.meta;
  }

  static getObjectFolder() {
    return 'wp/v2/users';
  }
}

export {
  WordpressUser,
};
