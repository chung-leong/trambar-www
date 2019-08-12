import { WordpressText } from './wordpress-text.mjs';

class WordpressPage {
    static create(data) {
        const page = new WordpressPage;
        page.id = data.id;
        page.date = new Date(data.date_gmt + 'Z');
        page.modified = new Date(data.modified_gmt + 'Z');
        page.slug = data.slug;
        page.status = data.status;
        page.type = data.type;
        page.link = data.link;
        page.title = WordpressText.create(data.title);
        page.content = WordpressText.create(data.content);
        page.excerpt = WordpressText.create(data.excerpt);
        page.author = data.author;
        page.featuredMedia = data.featured_media;
        page.menuOrder = data.menu_order;
        page.parent = data.parent;
        page.format = data.format;
        page.meta = data.meta;
        return page;
    }
}

export {
    WordpressPage,
    WordpressPage as WordPressPage,
};
