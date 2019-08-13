import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressPost {
    static create(data) {
        const post = new WordpressPost;
        post.id = data.id;
        post.date = new Date(data.date_gmt + 'Z');
        post.modified = new Date(data.modified_gmt + 'Z');
        post.slug = data.slug;
        post.status = data.status;
        post.type = data.type;
        post.link = data.link;
        post.title = WordpressText.create(data.title);
        post.content = WordpressText.create(data.content);
        post.excerpt = WordpressText.create(data.excerpt);
        post.author = data.author;
        post.featuredMedia = data.featured_media;
        post.sticky = data.sticky;
        post.format = data.format;
        post.meta = data.meta;
        post.categories = data.categories;
        post.tags = data.tags;
        return post;
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
    WordpressPost,
    WordpressPost as WordPressPost,
};
