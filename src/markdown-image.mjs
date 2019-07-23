import { deriveImageProps, generateRichText } from './utils.mjs';

class MarkdownImage {
    constructor(page) {
        this.page = page;
    }

    static create(page, data) {
        const img = new MarkdownImage(page);
        img.url = data.url;
        img.width = data.width;
        img.height = data.height;
        img.format = data.format;
        return img;
    }

    plainText(options) {
        const props = this.props(options);
        return props.src;
    }

    richText(options) {
        const props = this.props(options);
        return generateRichText('img', props, undefined, options);
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

export {
    MarkdownImage,
};
