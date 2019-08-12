import React from 'react';
import { Parser } from 'mark-gor/react';
import { MarkdownBlock } from './markdown-block.mjs';
import { MarkdownImage } from './markdown-image.mjs';
import { chooseLanguageVersion } from '../utils/language-utils.mjs';
import { generateRichText } from '../utils/text-utils.mjs';

class MarkdownPage {
    static create(data) {
        const page = new MarkdownPage;
        page.url = data.url || '';
        page.repo = data.repo;
        page.slug = data.slug;
        page.title = data.title;
        page.images = [];
        page.blocks = [];

        if (data.resources instanceof Array) {
            for (let res of data.resources) {
                if (res.type === 'image') {
                    page.images.push(MarkdownImage.create(page, res));
                }
            }
        }

        const parser = new Parser;
        const tokens = parser.parse(data.markdown || '');
        for (let [ index, token ] of tokens.entries()) {
            page.blocks.push(MarkdownBlock.create(page, token));
        }
        return page;
    }

    plainText(options) {
        const fragments = [];
        for (let block of this.blocks) {
            fragments.push(block.plainText(options));
        }
        return fragments.join('');
    }

    richText(options) {
        const children = [];
        for (let block of this.blocks) {
            children.push(block.richText(options));
        }
        return generateRichText(React.Fragment, {}, children, options);
    }

    image(url) {
        for (let img of this.images) {
            const image = img.image(url);
            if (image) {
                return image;
            }
        }
    }

    json(heading) {
        let currentHeading;
        for (let block of this.blocks) {
            const newHeading = block.heading();
            if (newHeading) {
                currentHeading = newHeading;
            }
            const code = block.code();
            if (code && code.language === 'json') {
                if (currentHeading === heading) {
                    try {
                        return JSON.parse(code.text);
                    } catch (err) {
                        console.error(err);
                        return undefined;
                    }
                }
            }
        }
    }

    filter(language) {
        if (this.language) {
            return this;
        }
        const choices = [];
        let currentLanguage;
        let currentTopic = 0;
        let currentSection;
        for (let block of this.blocks) {
            const newLanguage = block.language();
            if (newLanguage) {
                if (newLanguage !== 'zz') {
                    if (!currentLanguage) {
                        currentTopic++;
                    }
                    currentLanguage = newLanguage;
                } else {
                    if (currentLanguage) {
                        currentTopic++;
                    }
                    currentLanguage = undefined;
                }
                currentSection = undefined;
                continue;
            }

            if (!currentSection) {
                currentSection = {
                    flags: (currentLanguage) ? [ currentLanguage ] : [],
                    blocks: [],
                    name: `T${currentTopic}`,
                };
                choices.push(currentSection);
            }
            currentSection.blocks.push(block);
        }
        const chosen = chooseLanguageVersion(choices, language);

        const page = new MarkdownPage;
        page.slug = this.slug;
        page.title = this.title;
        page.images = this.images;
        page.language = language;
        page.blocks = [];
        for (let section of chosen) {
            for (let token of section.blocks) {
                page.blocks.push(token);
            }
        }
        return page;
    }

    includes(block) {
        return (this.blocks.indexOf(block) !== -1);
    }
}

export {
    MarkdownPage
};