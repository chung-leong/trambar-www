import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressMedia {
    static create(data) {
        const media = new WordpressMedia;
        media.id = data.rest.id;
        media.date = new Date(data.rest.date_gmt + 'Z');
        media.modified = new Date(data.rest.modified_gmt + 'Z');
        media.slug = data.rest.slug;
        media.status = data.rest.status;
        media.type = data.rest.type;
        media.link = data.rest.link;
        media.mediaType = data.rest.media_type;
        media.mimeType = data.rest.mime_type;
        media.title = WordpressText.create(data.rest.title);
        media.description = WordpressText.create(data.rest.description);
        media.caption = WordpressText.create(data.rest.caption);
        media.author = data.rest.author;
        media.altText = data.rest.alt_text;
        media.mediaDetails = data.rest.media_details;
        media.post = data.rest.post;
        media.sourceURL = data.rest.source_url;
        media.meta = data.rest.meta;
        return media;
    }

    plainText(options) {
        return getPlainTextProperties(options);
    }

    richText(options) {
        return getRichTextProperties(options);
    }

    filter(language) {
        return this;
    }
}

export {
    WordpressMedia,
    WordpressMedia as WordPressMedia,
};
