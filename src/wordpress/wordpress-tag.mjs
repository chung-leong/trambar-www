import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressTag {
    static folder = 'tags';

    static create(data) {
        const tag = new WordpressTag;
        tag.site = data.identifier;
        tag.id = data.rest.id;
        tag.count = data.rest.count;
        tag.name = WordpressText.create(data.rest.name);
        tag.description = WordpressText.create(data.rest.description);
        tag.link = data.rest.link;
        tag.slug = data.rest.slug;
        tag.taxonomy = data.rest.taxonomy;
        tag.meta = data.rest.meta;
        return tag;
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

    languages() {
        return [];
    }
}

export {
    WordpressTag,
    WordpressTag as WordPressTag,
};
