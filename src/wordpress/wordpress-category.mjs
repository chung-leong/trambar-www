import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressCategory {
    static create(data) {
        const category = new WordpressCategory;
        category.id = data.rest.id;
        category.count = data.rest.count;
        category.name = WordpressText.create(data.rest.name);
        category.description = WordpressText.create(data.rest.description);
        category.link = data.rest.link;
        category.slug = data.rest.slug;
        category.taxonomy = data.rest.taxonomy;
        category.parent = data.rest.parent;
        category.meta = data.rest.meta;
        return category;
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
    WordpressCategory,
    WordpressCategory as WordPressCategory,
};
