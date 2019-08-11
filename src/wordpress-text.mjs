import { Parser } from 'htmlparser2';
import { generateRichText } from './utils.mjs';

class WordpressText {
    static create(data) {
        const text = new WordpressText;
        const html = (typeof(data) === 'object') ? data.rendered : data;
        text.html = html;
        return text;
    }

    plainText(options) {
        return this.html;
    }

    richText(options) {
        return this.html;
    }
}

export {
    WordpressText,
};
