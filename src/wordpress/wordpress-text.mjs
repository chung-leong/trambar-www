import {
    parseHTML,
    generateRichTextFromNodes,
    generatePlainTextFromNodes
} from '../utils/text-utils.mjs';

class WordpressText {
    static create(data) {
        const text = new WordpressText;
        text.html = (typeof(data) === 'object') ? data.rendered : data;
        return text;
    }

    plainText(options) {
        const tree = this.tree();
        return generatePlainTextFromNodes(tree, options || {});
    }

    richText(options) {
        const tree = this.tree();
        return generateRichTextFromNodes(tree, options || {});
    }

    filter(language) {
        return this;
    }

    languages() {
        return [];
    }

    tree() {
        if (!this.dom) {
            this.dom = parseHTML(this.html);
            this.html = undefined;
        }
        return this.dom;
    }
}

export {
    WordpressText,
    WordpressText as WordPressText,
};
