import { WordpressObject } from './wordpress-object.mjs';
import { HTMLText } from '../html-text.mjs';

class WordpressMedia extends WordpressObject {
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
      this.mediaType = json.media_type;
      this.mimeType = json.mime_type;
      this.title = new HTMLText(json.title);
      this.description = new HTMLText(json.description);
      this.caption = new HTMLText(json.caption);
      this.author = json.author;
      this.altText = json.alt_text;
      this.mediaDetails = json.media_details;
      this.post = json.post;
      this.sourceURL = json.source_url;
      this.meta = json.meta;
    }
  }

  static getObjectFolder() {
    return 'wp/v2/media';
  }
}

export {
  WordpressMedia,
};
