import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressPost {
    static create(data) {
        const post = new WordpressPost;
        post.site = data.identifier;
        post.id = data.rest.id;
        post.date = new Date(data.rest.date_gmt + 'Z');
        post.modified = new Date(data.rest.modified_gmt + 'Z');
        post.slug = data.rest.slug;
        post.status = data.rest.status;
        post.type = data.rest.type;
        post.link = data.rest.link;
        post.title = WordpressText.create(data.rest.title);
        post.content = WordpressText.create(data.rest.content);
        post.excerpt = WordpressText.create(data.rest.excerpt);
        post.author = data.rest.author;
        post.featuredMedia = data.rest.featured_media;
        post.sticky = data.rest.sticky;
        post.format = data.rest.format;
        post.meta = data.rest.meta;
        post.categories = data.rest.categories;
        post.tags = data.rest.tags;
        return post;
    }

    plainText(options) {
        return getPlainTextProperties(this, options);
    }

    richText(options) {
        return getRichTextProperties(this, options);
    }

    filter(language) {
        return this;
    }
}

export {
    WordpressPost,
    WordpressPost as WordPressPost,
};
