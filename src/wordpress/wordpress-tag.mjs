import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressTag {
    static create(data) {
        const tag = new WordpressTag;
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
    WordpressTag,
    WordpressTag as WordPressTag,
};
