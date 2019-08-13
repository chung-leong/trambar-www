import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressUser {
    static create(data) {
        const user = new WordpressUser;
        user.id = data.id;
        user.url = data.url;
        user.name = WordpressText.create(data.name);
        user.description = WordpressText.create(data.description);
        user.link = data.link;
        user.slug = data.slug;
        user.avatarURLs = data.avatar_urls;
        user.meta = data.meta;
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
}

export {
    WordpressUser,
    WordpressUser as WordPressUser,
};
