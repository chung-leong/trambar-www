import React from 'react';
import { chooseLanguageVersion } from './excel-utils.mjs';
import { deriveImageProps } from './image-utils.mjs';

class ExcelCell {
    constructor(column) {
        this.column = column;
    }

    static create(column, data) {
        if (containsPlainText(data)) {
            return ExcelPlainTextCell.create(column, data);
        } else if (containsRichText(data)) {
            return ExcelRichTextCell.create(column, data);
        } else if (containsImage(data)) {
            return ExcelImageCell.create(column, data);
        } else {
            return ExcelPlainTextCell.create(column, '[invalid data]');
        }
    }

    filter(language) {
        const columns = this.column.sheet.columns;
        const chosen = chooseLanguageVersion(columns, language);
        if (chosen.indexOf(this.column) !== -1) {
            return this;
        }
    }

    image(url) {
    }
}

class ExcelPlainTextCell extends ExcelCell {
    static create(column, data) {
        const cell = new ExcelPlainTextCell(column);
        cell.text = data + '';
        return cell;
    }

    plainText(options) {
        return this.text;
    }

    richText(options) {
        return this.text;
    }
}

class ExcelRichTextCell extends ExcelCell {
    static create(column, data) {
        const cell = new ExcelRichTextCell(column);
        cell.tokens = data.richText;
        return cell;
    }

    plainText(options) {
        const fragments = [];
        for (let token of this.tokens) {
            fragments.push(token.text);
        }
        return fragments.join('');
    }

    richText(options) {
        const children = [];
        for (let [ index, token ] of this.tokens.entries()) {
            const { font, text } = token;
            const style = {};
            if (font) {
                if (font.bold) {
                    style.fontWeight = 'bold';
                }
                if (font.italic) {
                    style.fontStyle = 'italic';
                }
                if (font.underline) {
                    style.textDecoration = 'underline';
                }
            }
            children.push(React.createElement('span', { key: index, style }, text));
        }
        if (children.length === 1) {
            return children[0];
        } else {
            return React.createElement('span', {}, children);
        }
    }
}

class ExcelImageCell extends ExcelCell {
    static create(column, data) {
        const cell = new ExcelImageCell(column);
        cell.url = data.url;
        cell.width = data.width;
        cell.height = data.height;
        cell.format = data.format;
        return cell;
    }

    plainText(options) {
        const props = this.props(options || {});
        return props.src;
    }

    richText(options) {
        const props = this.props(options || {});
        return React.createElement('img', props);
    }

    props(options) {
        return deriveImageProps(this, options);
    }

    image(url) {
        if (url && url.indexOf(this.url)) {
            return this;
        }
    }
}

function containsPlainText(data) {
    if (data instanceof Object) {
        return false;
    }
    return true;
}


function containsRichText(data) {
    if (!(data instanceof Object)) {
        return false;
    }
    if (!(data.richText instanceof Array)) {
        return false;
    }
    return true;
}

function containsImage(data) {
    if (!(data instanceof Object)) {
        return false;
    }
    if (data.type !== 'image') {
        return false;
    }
    if (typeof(data.url) !== 'string') {
        return false;
    }
    if (typeof(data.width) !== 'number') {
        return false;
    }
    if (typeof(data.height) !== 'number') {
        return false;
    }
    return true;
}

export {
    ExcelCell,
    ExcelPlainTextCell,
    ExcelRichTextCell,
    ExcelImageCell,
};
