import { Parser, Renderer } from 'mark-gor/react';
import { generateRichText } from '../utils/text-utils.mjs';

class MarkdownBlock {
    constructor(page) {
        this.page = page;
    }

    static create(page, token, index) {
        const block = new MarkdownBlock(page, index);
        block.token = token;
        block.index = index;
        return block;
    }

    plainText(options) {
        return this.token.captured;
    }

    richText(options) {
        const renderer = new Renderer({
            createElement: (type, props, children) => {
                if (type === 'img') {
                    const image = this.page.image(props.src);
                    if (image) {
                        props = { ...props, ...image.props(options) };
                    }
                }
                return generateRichText(type, props, children, options);
            },
            renderText: (token, key) => {
                return generateRichText(undefined, { key }, token.text, options);
            },
        });
        return renderer.renderToken(this.token, this.index);
    }

    heading() {
        if (this.token.type === 'heading') {
            return this.token.markdown.trim();
        }
    }

    code() {
        if (this.token.type === 'code') {
            return {
                language: this.token.lang.toLowerCase(),
                text: this.token.text,
            };
        }
    }

    language() {
        if (this.token.type === 'heading') {
            const cap = this.token.captured.trim();
            const m = /^#\s*([a-z]{2}(-[a-z]{2})?)$/i.exec(cap);
            if (m) {
                return m[1].toLowerCase();
            }
        }
    }

    json(heading) {
        let currentHeading;
        for (let token of this.tokens) {
            if (token.type === 'heading') {
                currentHeading = token.markdown.trim();
            }
            if (token.type === 'code') {
                if (currentHeading === heading) {
                    try {
                        return JSON.parse(token.text);
                    } catch (err) {
                        console.error(err);
                        return undefined;
                    }
                }
            }
        }
    }
}

export {
    MarkdownBlock,
};
