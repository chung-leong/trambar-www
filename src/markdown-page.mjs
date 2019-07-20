import React from 'react';
import { Parser, Renderer } from 'mark-gor/react';
import { chooseLanguageVersion, deriveImageProps } from './utils.mjs';

class MarkdownPage {
    static create(data) {
        const page = new MarkdownPage;
        page.slug = data.slug;
        page.title = data.title;
        page.resources = data.resources;

        const parser = new Parser;
        page.tokens = parser.parse(data.markdown || '');
        return page;
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

    filter(language) {
        const sections = [];
        let currentLanguage;
        let currentTopic = 0;
        let currentSection;
        for (let token of this.tokens) {
            if (token.type === 'heading') {
                const cap = token.captured.trim();
                const m = /^#\s*([a-z]{2}(-[a-z]{2})?)$/i.exec(cap);
                if (m) {
                    const language = m[1].toLowerCase();
                    if (language !== 'zz') {
                        if (!currentLanguage) {
                            currentTopic++;
                        }
                        currentLanguage = language;
                    } else {
                        if (currentLanguage) {
                            currentTopic++;
                        }
                        currentLanguage = undefined;
                    }
                    currentSection = undefined;
                    continue;
                }
            }
            if (!currentSection) {
                currentSection = {
                    flags: (currentLanguage) ? [ currentLanguage ] : [],
                    tokens: [],
                    name: `T${currentTopic}`,
                };
                sections.push(currentSection);
            }
            currentSection.tokens.push(token);
        }
        const chosen = chooseLanguageVersion(sections, language);

        const page = new MarkdownPage;
        page.slug = this.slug;
        page.title = this.title;
        page.resources = this.resources;
        page.tokens = [];
        for (let section of chosen) {
            for (let token of section.tokens) {
                page.tokens.push(token);
            }
        }
        return page;
    }
}

export {
    MarkdownPage
};
