import { chooseLanguageVersion } from '../utils/language-utils.mjs';
import { deriveImageProps } from '../utils/image-utils.mjs';
import { generateRichText } from '../utils/text-utils.mjs';

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
            return ExcelErrorCell.create(column, data);
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
        return generateRichText(undefined, { key: 0 }, this.text, options || {});
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
            const props = { key: index, style };
            children.push(generateRichText('span', props, text, options || {}));
        }
        if (children.length === 1) {
            return children[0];
        } else {
            return generateRichText('span', {}, children, options || {});
        }
    }
}

class ExcelImageCell extends ExcelCell {
    static create(column, data) {
        const cell = new ExcelImageCell(column);
        cell.source = data.src;
        cell.url = data.url;
        cell.width = data.width;
        cell.height = data.height;
        cell.format = data.format;
        return cell;
    }

    plainText(options) {
        const props = this.props(options);
        return props.src;
    }

    richText(options) {
        const props = this.props(options);
        return generateRichText('img', props, undefined, options || {});
    }

    props(options) {
        return deriveImageProps(this, options || {});
    }

    image(url) {
        if (url && url.indexOf(this.url) !== -1) {
            return this;
        }
    }
}

class ExcelErrorCell extends ExcelCell {
    static create(column, data) {
        const cell = new ExcelErrorCell(column);
        if (typeof(data.error) === 'string') {
            cell.text = '[error]';
            cell.title = data.error;
        } else {
            cell.text = '[invalid data]';
        }
        return cell;
    }

    plainText(options) {
        return this.text;
    }

    richText(options) {
        const props = {
            key: 0,
            title: this.title,
        };
        return generateRichText('span', props, this.text, options || {});
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
