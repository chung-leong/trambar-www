import { WordpressText } from './wordpress-text.mjs';

class WordpressTag {
    static create(data) {
        const tag = new WordpressTag;
        tag.id = data.id;
        tag.count = data.count;
        tag.name = WordpressText.create(data.name);
        tag.description = WordpressText.create(data.description);
        tag.link = data.link;
        tag.slug = data.slug;
        tag.taxonomy = data.taxonomy;
        tag.meta = data.meta;
        return tag;
    }
}

export {
    WordpressTag,
    WordpressTag as WordPressTag,
};
