import { WordpressText } from './wordpress-text.mjs';

class WordpressUser {
    static create(data) {
        const user = new WordpressUser;
        user.id = data.id;
        user.name = data.name;
        user.url = data.url;
        user.description = WordpressText.create(data.description);
        user.link = data.link;
        user.slug = data.slug;
        user.avatarURLs = data.avatar_urls;
        user.meta = data.meta;
        return user;
    }
}

export {
    WordpressUser,
};
