import React from 'react';
import { Parser, DomHandler } from 'htmlparser2';

function generateRichText(type, props, children, options) {
    const { richTextAdjust } = options;
    if (richTextAdjust instanceof Function) {
        const result = richTextAdjust(type, props, children);
        if (!(result instanceof Object)) {
            throw new Error('Function should return an object');
        }
        type = result.type;
        props = result.props;
        children = result.children;
    }
    if (process.env.NODE_ENV !== 'production') {
        if (children && typeof(children) !== 'string') {
            children = React.Children.toArray(children);
        }
    }
    if (type === undefined) {
        return children;
    } else {
        return React.createElement(type, props, children);
    }
}

function generateRichTextFromNode(node) {
}

function generatePlainTextFromNode(node) {
    if (node instanceof Array) {
        const list = []
        for (let child of node) {
            list.push(generatePlainTextFromNode(child));
        }
        return list.join('');
    } else {
        if (node.type === 'tag') {
            const innerText = generatePlainTextFromNode(node.children);
            return innerText;
        } else if (node.type === 'text') {
            return node.data;
        }
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

export {
    generateRichText,
    generateRichTextFromNode,
    generatePlainTextFromNode,
    parseHTML,
};
