import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressUser {
    static create(data) {
        const user = new WordpressUser;
        user.site = data.identifier;
        user.id = data.rest.id;
        user.url = data.rest.url;
        user.name = WordpressText.create(data.rest.name);
        user.description = WordpressText.create(data.rest.description);
        user.link = data.rest.link;
        user.slug = data.rest.slug;
        user.avatarURLs = data.rest.avatar_urls;
        user.meta = data.rest.meta;
        return user;
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

    languages() {
        return [];
    }
}

export {
    WordpressUser,
    WordpressUser as WordPressUser,
};
