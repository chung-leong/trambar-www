import { Parser, DomHandler } from 'htmlparser2';
import { generateRichText } from './utils.mjs';

class WordpressText {
    static create(data) {
        const text = new WordpressText;
        const html = (typeof(data) === 'object') ? data.rendered : data;
        text.html = html;
        return text;
    }

    plainText(options) {
        const dom = parseHTML(this.html);
        return getNodeText(dom);
    }

    richText(options) {
        return this.html;
    }
}

function parseHTML(html) {
    let result, error;
    const handler = new DomHandler((err, dom) => {
        if (error) {
            error = err;
        } else {
            result = dom;
        }
    });
    const parser = new Parser(handler, {
        decodeEntities: true
    });
    parser.write(html);
    parser.end();
    if (error) {
        throw error;
    }
    return result;
}

function getNodeText(node) {
    if (node instanceof Array) {
        const list = []
        for (let child of node) {
            list.push(getNodeText(child));
        }
        return list.join('');
    } else {
        if (node.type === 'tag') {
            const innerText = getNodeText(node.children);
            return innerText;
        } else if (node.type === 'text') {
            return node.data;
        }
    }
}

export {
    WordpressText,
};
