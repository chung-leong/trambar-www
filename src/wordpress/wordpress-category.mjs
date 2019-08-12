import { WordpressText } from './wordpress-text.mjs';

class WordpressCategory {
    static create(data) {
        const category = new WordpressCategory;
        category.id = data.id;
        category.count = data.count;
        category.name = WordpressText.create(data.name);
        category.description = WordpressText.create(data.description);
        category.link = data.link;
        category.slug = data.slug;
        category.taxonomy = data.taxonomy;
        category.parent = data.parent;
        category.meta = data.meta;
        return category;
    }
}

export {
    WordpressCategory,
    WordpressCategory as WordPressCategory,
};
