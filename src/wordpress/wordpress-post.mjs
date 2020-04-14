import { WordpressObject } from './wordpress-object.mjs';
import { Text } from '../text.mjs';

class WordpressPost extends WordpressObject {
  constructor(identifiers, json) {
    super(identifiers);
    if (json) {
      this.id = json.id;
      this.date = new Date(json.date_gmt + 'Z');
      this.modified = new Date(json.modified_gmt + 'Z');
      this.slug = json.slug;
      this.status = json.status;
      this.type = json.type;
      this.link = json.link;
      this.title = new Text(json.title);
      this.content = new Text(json.content);
      this.excerpt = new Text(json.excerpt);
      this.author = json.author;
      this.featuredMedia = json.featured_media;
      this.sticky = json.sticky;
      this.format = json.format;
      this.meta = json.meta;
      this.categories = json.categories;
      this.tags = json.tags;
    }
  }

  static getObjectFolder() {
    return 'wp/v2/posts';
  }
}

export {
  WordpressPost,
};
