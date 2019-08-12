import {
    parseHTML,
    generateRichTextFromNode,
    generatePlainTextFromNode
} from '../utils/text-utils.mjs';

class WordpressText {
    static create(data) {
        const text = new WordpressText;
        text.html = (typeof(data) === 'object') ? data.rendered : data;
        return text;
    }

    plainText(options) {
        const tree = this.tree();
        return generatePlainTextFromNode(tree);
    }

    richText(options) {
        const tree = this.tree();
        return generateRichTextFromNode(tree);
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
};
