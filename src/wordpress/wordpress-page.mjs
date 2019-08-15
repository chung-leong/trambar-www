import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressPage {
    static create(data) {
        const page = new WordpressPage;
        page.site = data.identifier;
        page.id = data.rest.id;
        page.date = new Date(data.rest.date_gmt + 'Z');
        page.modified = new Date(data.rest.modified_gmt + 'Z');
        page.slug = data.rest.slug;
        page.status = data.rest.status;
        page.type = data.rest.type;
        page.link = data.rest.link;
        page.title = WordpressText.create(data.rest.title);
        page.content = WordpressText.create(data.rest.content);
        page.excerpt = WordpressText.create(data.rest.excerpt);
        page.author = data.rest.author;
        page.featuredMedia = data.rest.featured_media;
        page.menuOrder = data.rest.menu_order;
        page.parent = data.rest.parent;
        page.format = data.rest.format;
        page.meta = data.rest.meta;
        return page;
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
    WordpressPage,
    WordpressPage as WordPressPage,
};
