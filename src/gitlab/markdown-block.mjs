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
        const fragments = [];
        const add = (token) => {
            if (token.children instanceof Array) {
                for (let child of token.children) {
                    add(child);
                }
            }
            switch (token.type) {
                case 'url':
                case 'autolink':
                case 'text': fragments.push(token.text); break;
                case 'image': fragments.push(`[${token.text}]`); break;
                case 'code':
                case 'blockquote':
                case 'heading':
                case 'paragraph': fragments.push('\n\n'); break;
                case 'br':
                case 'list':
                case 'list_item':
                case 'loose_item':
                case 'table':
                case 'table_row': fragments.push('\n'); break;
                case 'table_header_cell':
                case 'table_row_cell': fragments.push('\t'); break;
                case 'hr': fragments.push('-----\n'); break;
            }
        };
        add(this.token);
        return fragments.join('');
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

    markdown(options) {
        return this.token.captured;
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

    links(external) {
        const list = [];
        if (this.token.children) {
            for (let token of this.token.children) {
                if (token.type === 'link') {
                    const url = token.href;
                    if (external || /^[\w\-]+$/.test(url)) {
                        list.push(url);
                    }
                }
            }
        }
        return list;
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
