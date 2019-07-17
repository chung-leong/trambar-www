import React from 'react';
import { chooseLanguageVersion } from './excel-utils.mjs';

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
        const props = this.getProps(options || {});
        return props.src;
    }

    richText(options) {
        const props = this.getProps(options || {});
        return React.createElement('img', props);
    }

    getProps(options) {
        // calcuate size of image based on specified dimensions
        const reqWidth = options.imageWidth;
        const reqHeight = options.imageHeight;
        const aspectRatio = this.width / this.height;
        let scaledWidth, scaledHeight;
        let crop;
        if (reqWidth && reqHeight) {
            const reqAspectRatio = reqWidth / reqHeight;
            if (reqAspectRatio !== aspectRatio) {
                // need to crop image
                crop = {};
                if (reqAspectRatio > aspectRatio) {
                    // wider than actual image--crop top and bottom
                    crop.width = this.width;
                    crop.height = Math.round(this.width / reqAspectRatio);
                    crop.left = 0;
                    crop.top = Math.round((this.height - crop.height) / 2);
                } else {
                    crop.width = Math.round(this.height * reqAspectRatio);
                    crop.height = this.height;
                    crop.left = Math.round((this.width - crop.width) / 2);
                    crop.top = 0;
                }
            }
            scaledWidth = reqWidth;
            scaledHeight = reqHeight;
        } else if (reqWidth) {
            scaledWidth = reqWidth;
            scaledHeight = Math.round(reqWidth / aspectRatio);
        } else if (reqHeight) {
            scaledWidth = Math.round(reqHeight * aspectRatio);
            scaledHeight = reqHeight;
        } else {
            scaledWidth = this.width;
            scaledHeight = this.height;
        }

        // calculate source image size based on device pixel ratio
        const imagePixelRatio = Math.min(this.width / scaledWidth, this.height / scaledHeight);
        const devicePixelRatio = options.devicePixelRatio || 1;
        const pixelRatio = Math.min(devicePixelRatio, imagePixelRatio);
        const realWidth = Math.round(scaledWidth * pixelRatio);
        const realHeight = Math.round(scaledHeight * pixelRatio);

        // apply necessary filters
        const dimFilters = {};
        let origWidth = this.width;
        let origHeight = this.height;
        if (crop) {
            dimFilters.crop = crop;
            origWidth = crop.width;
            origHeight = crop.height;
        }
        if (origWidth !== realWidth || origHeight !== realHeight) {
            dimFilters.resize = { width: realWidth, height: realHeight };
        }
        const filters = { ...dimFilters, ...options.imageFilters };
        const format = options.imageFormat || this.format;
        const server = options.imageServer;
        const url = this.getURL(filters, format, server);
        return {
            src: url,
            width: realWidth,
            height: realHeight,
            style: {
                width: scaledWidth,
                height: scaledHeight,
            }
        };
    }

    getURL(filters, format, server) {
        const modifiers = [];
        for (let [ n, v ] of Object.entries(filters)) {
            let m = '';
            switch (n) {
                case 'background':
                    m = `ba${v.r}-${v.g}-${v.b}-${v.a}`;
                    break;
                case 'blur':
                    if (v) {
                        if (typeof(v) === 'number') {
                            m = `bl${v}`;
                        } else {
                            m = `bl`;
                        }
                    }
                    break;
                case 'crop':
                    m = `cr${v.left}-${v.top}-${v.width}-${v.height}`;
                    break;
                case 'extract':
                    m = `ex${v}`;
                    break;
                case 'flatten':
                    if (v) {
                        m = `fla`;
                    }
                    break;
                case 'flip':
                    if (v) {
                        m = `fli`;
                    }
                    break;
                case 'flop':
                    if (v) {
                        m = `flo`;
                    }
                    break;
                case 'gamma':
                    m = `ga${v}`;
                    break;
                case 'grayscale':
                    if (v) {
                        m = `gr`;
                    }
                    break;
                case 'negate':
                    if (v) {
                        m = `ne`;
                    }
                    break;
                case 'normalize':
                    if (v) {
                        m = `no`;
                    }
                    break;
                case 'lossless':
                    if (v) {
                        m = `lo`;
                    }
                    break;
                case 'quality':
                    m = `q${v}`;
                    break;
                case 'rotate':
                    m = `ro${v}`;
                    break;
                case 'resize':
                    m = `re${v.width}-${v.height}`;
                    break;
                case 'sharpen':
                    if (v) {
                        m = `sh`;
                    }
                    break;
                case 'trim':
                    if (v) {
                        m = `tr`;
                    }
                    break;
            }
            if (m) {
                modifiers.push(m);
            }
        }
        let url = this.url;
        if (modifiers.length > 0 || format) {
            url += `/${modifiers.join('+')}`;
            if (format) {
                url += `.${format}`;
            }
        }
        if (server) {
            url = server + url;
        }
        return url;
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
