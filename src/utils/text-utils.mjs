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

function generatePlainTextFromNodes(nodes, options, key) {
    const list = []
    for (let [ index, child ] of nodes.entries()) {
        const text = generatePlainTextFromNode(child, options);
        list.push(text);
    }
    return list.join('');
}

function generatePlainTextFromNode(node, options, key) {
    if (node.type === 'tag') {
        // TODO: add linefeeds
        const innerText = generatePlainTextFromNodes(node.children, options);
        return innerText;
    } else if (node.type === 'text') {
        return normalizeWhitespaces(node.data);
    }
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
            const propName = generatePropNameFromAttr(name);
            const propValue = generatePropValueFromAttr(attrs[name], propName);
            props[propName] = propValue;
        }
    }
    return props;
}

function generatePropNameFromAttr(name) {
    const nameLC = name.toLowerCase();
    switch (nameLC) {
        case 'class':
            return 'className';
        case 'readonly':
            return 'readOnly';
        case 'tabindex':
            return 'tabIndex';
        default:
            return nameLC;
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
        decodeEntities: true
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
