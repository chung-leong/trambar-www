import { pickLanguageVersion } from './utils/language-utils.mjs';
import { generateRichText } from './utils/text-utils.mjs';

class ProjectMetadata {
    static create(data) {
        const metadata = new ProjectMetadata;
        metadata.name = data.name || '';
        metadata.title = data.title || {};
        metadata.description = data.description || {};
        metadata.archived = data.archived || false;
        return metadata;
    }

    plainText(options) {
        return {
            name: this.name,
            title: this.title,
            description: this.description,
        };
    }

    richText(options) {
        const rt = (text) => {
            if (text instanceof Object) {
                const multilingual = {};
                for (let [ lang, langText ] of Object.entries(text)) {
                    multilingual[lang] = rt(langText);
                }
                return multilingual;
            } else {
                return generateRichText(undefined, { key: 0 }, text, options || {});
            }
        };
        const name = rt(this.name);
        const title = rt(this.title);
        const description = rt(this.description);
        return { name, title, description };
    }

    filter(language, noFallback) {
        if (this.language) {
            return this;
        }
        const metadata = new ProjectMetadata;
        metadata.name = this.name;
        metadata.title = pickLanguageVersion(this.title, language);
        metadata.description = pickLanguageVersion(this.description, language);
        metadata.language = language;
        return metadata;
    }
}

export {
    ProjectMetadata
};
