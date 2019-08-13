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

const blockLevelTags = [
    'address', 'article', 'aside', 'blockquote', 'details', 'dialog', 'dd',
    'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li', 'main',
    'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'
];

function isBlockLevel(node) {
    if (node && node.type === 'tag') {
        return blockLevelTags.indexOf(node.name) !== -1;
    } else {
        return false;
    }
}

function generatePlainTextFromNodes(nodes, options, key, parent) {
    const list = []
    const blockLevel = nodes.map(isBlockLevel);
    for (let [ index, child ] of nodes.entries()) {
        const text = generatePlainTextFromNode(child, options, index, parent);
        if (blockLevel[index - 1] && blockLevel[index + 1]) {
            // ignore whitespaces between block level elements
            if (child.type === 'text' && !text.trim()) {
                continue;
            }
        }
        list.push(text);
    }
    const text = list.join('');
    if (key === undefined) {
        return text.trim();
    } else {
        return text;
    }
}

function generatePlainTextFromNode(node, options, key, parent) {
    if (node.type === 'tag') {
        const innerText = generatePlainTextFromNodes(node.children, options, key, node);
        const outerText = wrapPlainText(innerText, node, parent);
        return outerText;
    } else if (node.type === 'text') {
        let text = normalizeWhitespaces(node.data);
        if (isBlockLevel(parent)) {
            text = text.trim();
        }
        return text;
    }
}

function wrapPlainText(innerText, node, parent) {
    if (!isBlockLevel(node)) {
        if (node.name === 'br') {
            return innerText + '\n';
        } else {
            return innerText;
        }
    }
    let text = innerText;
    if (!/\n$/.test(text)) {
        text += '\n';
    }
    switch (node.name) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'p':
            if (!/\n\n$/.test(text)) {
                text += '\n';
            }
            break;
        case 'li':
            if (parent && parent.name === 'ol') {
                let num = 1;
                for (let child of parent.children) {
                    if (child === node) {
                        break;
                    }
                    if (child.name === 'li') {
                        num++;
                    }
                }
                text = `${num}. ${text}`;
            } else {
                text = `* ${text}`;
            }
            break;
        case 'hr':
            text = '――――――――――\n';
    }
    return text;
}

function normalizeWhitespaces(text) {
    return text.replace(/\s+/g, ' ');
}

function generateRichTextFromNodes(nodes, options, key) {
    const list = []
    for (let [ index, child ] of nodes.entries()) {
        list.push(generateRichTextFromNode(child, index));
    }
    if (key === undefined) {
        return generateRichText(React.Fragment, {}, list, options);
    } else {
        return list;
    }
}

function generateRichTextFromNode(node, options, key) {
    if (node.type === 'tag') {
        const type = node.name;
        const props = generatePropsFromAttrs(node.attribs, options, key);
        const children = generateRichTextFromNodes(node.children, options, key);
        return generateRichText(type, props, children, options);
    } else if (node.type === 'text') {
        const text = normalizeWhitespaces(node.data);
        return generateRichText(undefined, { key }, text, options);
    }
}

function generatePropsFromAttrs(attrs, options, key) {
    const props = { key };
    if (attrs instanceof Object) {
        for (let name in attrs) {
            if (/^on/.test(name)) {
                continue;
            }
            const propName = generatePropNameFromAttr(name);
            const propValue = generatePropValueFromAttr(attrs[name], propName);
            props[propName] = propValue;
        }
    }
    return props;
}

function generatePropNameFromAttr(name) {
    switch (name) {
        case 'class':
            return 'className';
        case 'readonly':
            return 'readOnly';
        case 'tabindex':
            return 'tabIndex';
        default:
            return name;
    }
}

function generatePropValueFromAttr(value, name) {
    switch (name) {
        case 'style':
            return generateStyleFromAttr(value);
        case 'disabled':
        case 'readOnly':
            return true;
        case 'tabIndex':
        case 'width':
        case 'height':
            return parseInt(value);
        default:
            return value;
    }
}

function generateStyleFromAttr(inlineStyle) {
    const style = {};
    const entries = inlineStyle.trim().split(/\s*;\s*/);
    for (let entry of entries) {
        const [ name, def ] = entry.split(/\s*:\s*/);
        if (name) {
            const styleName = generateStyleNameFromAttr(name);
            style[styleName] = def;
        }
    }
    return style;
}

function generateStyleNameFromAttr(name) {
    const nameLC = name.toLowerCase();
    const nameSC = nameLC.replace(/-\w/g, (m) => {
        return m.substr(1).toUpperCase();
    });
    if (nameSC.substr(0, 2) === 'Ms') {
        // See: https://zhenyong.github.io/react/tips/inline-styles.html
        return 'ms' + nameSC.substr(2);
    } else {
        return nameSC;
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
        decodeEntities: true,
        lowerCaseTags: true,
        lowerCaseAttributeNames: true,
    });
    parser.write(html);
    parser.end();
    if (error) {
        throw error;
    }
    return result;
}

function getPlainTextProperties(object, options) {
    const props = {};
    for (let key in object) {
        const value = object[key];
        if (value instanceof Object && value.richText instanceof Function) {
            props[key] = value.plainText(options);
        } else {
            props[key] = value;
        }
    }
    return props;
}

function getRichTextProperties(object, options) {
    const props = {};
    for (let key in object) {
        const value = object[key];
        if (value instanceof Object && value.richText instanceof Function) {
            props[key] = value.richText(options);
        } else {
            props[key] = value;
        }
    }
    return props;
}

export {
    generateRichText,
    generateRichTextFromNodes,
    generatePlainTextFromNodes,
    parseHTML,
    getRichTextProperties,
    getPlainTextProperties,
};
