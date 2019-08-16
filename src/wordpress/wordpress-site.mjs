import { WordpressText } from './wordpress-text.mjs';
import { getPlainTextProperties, getRichTextProperties } from '../utils/text-utils.mjs';

class WordpressSite {
    static create(data) {
        const site = new WordpressSite;
        site.identifier = data.identifier;
        site.url = data.rest.url;
        site.home = data.rest.home;
        site.name = WordpressText.create(data.rest.name);
        site.description = WordpressText.create(data.rest.description);
        site.gmtOffset = data.rest.gmt_offset;
        site.timezone = data.rest.timezone_string;
        return site;
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
    WordpressSite,
    WordpressSite as WordPressSite,
};
