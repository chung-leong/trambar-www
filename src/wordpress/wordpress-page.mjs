import { WordpressObject } from './wordpress-object.mjs';
import { HTMLText } from '../html-text.mjs';

class WordpressPage extends WordpressObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    if (json) {
      this.id = json.id;
      this.date = new Date(json.date_gmt + 'Z');
      this.modified = new Date(json.modified_gmt + 'Z');
      this.slug = json.slug;
      this.status = json.status;
      this.type = json.type;
      this.link = json.link;
      this.title = new HTMLText(json.title);
      this.content = new HTMLText(json.content);
      this.excerpt = new HTMLText(json.excerpt);
      this.author = json.author;
      this.featuredMedia = json.featured_media;
      this.menuOrder = json.menu_order;
      this.parent = json.parent;
      this.format = json.format;
      this.meta = json.meta;
    }
  }

  static getObjectFolder() {
    return 'wp/v2/pages';
  }
}

export {
  WordpressPage,
};
