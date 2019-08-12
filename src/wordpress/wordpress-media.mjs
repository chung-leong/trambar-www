import { WordpressText } from './wordpress-text.mjs';

class WordpressMedia {
    static create(data) {
        const media = new WordpressMedia;
        media.id = data.id;
        media.date = new Date(data.date_gmt + 'Z');
        media.modified = new Date(data.modified_gmt + 'Z');
        media.slug = data.slug;
        media.status = data.status;
        media.type = data.type;
        media.link = data.link;
        media.mediaType = data.media_type;
        media.mimeType = data.mime_type;
        media.title = WordpressText.create(data.title);
        media.description = WordpressText.create(data.description);
        media.caption = WordpressText.create(data.caption);
        media.author = data.author;
        media.altText = data.alt_text;
        media.mediaDetails = data.media_details;
        media.post = data.post;
        media.sourceURL = data.source_url;
        media.meta = data.meta;
        return media;
    }
}

export {
    WordpressMedia,
    WordpressMedia as WordPressMedia,
};
