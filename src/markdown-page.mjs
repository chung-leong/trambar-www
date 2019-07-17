import React from 'react';
import { Parser, Renderer } from 'mark-gor/react';

class MarkdownPage {
    constructor(data) {
    }

    static create(data) {
        this.slug = data.slug;
        this.title = data.title;

        const parser = new Parser;
        this.tokens = parser.parse(data.markdown || '');
    }

    plainText(options) {
        const fragments = [];
        for (let token of this.tokens) {
            fragments.push(token.captured);
        }
        return fragments.join('');
    }

    richText(options) {
        const renderer = new Renderer;
        const children = renderer.render(this.tokens);
        return React.createElement('div', {}, children);
    }

    json(title) {

    }

    filter(language) {

    }
}

export {
    MarkdownPage
};
