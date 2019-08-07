import { chooseLanguageVersion, generateRichText } from './utils.mjs';

class ProjectMetadata {
    static create(data) {
        const metadata = new ProjectMetadata;
        metadata.name = data.name || '';
        metadata.title = data.title || {};
        return metadata;
    }

    plainText(options) {
        return {
            name: this.name,
            title: this.title,
        }
    }

    richText(options) {
        const rt = (text) => {
            return generateRichText(undefined, { key: 0 }, text, options || {});
        };
        const name = rt(this.name);
        let title;
        if (this.title instanceof Object) {
            title = {};
            for (let [ lang, text ] of Object.entries(this.title)) {
                title[lang] = rt(text);
            }
        } else {
            title = rt(this.title);
        }
        return { name, title };
    }

    filter(language) {
        if (this.language) {
            return this;
        }
        const choices = [];
        for (let [ lang, text ] of Object.entries(this.title)) {
            choices.push({
                flags: [ lang ],
                text,
                name: 'title'
            });
        }
        const chosen = chooseLanguageVersion(choices, language);

        const metadata = new ProjectMetadata;
        metadata.name = this.name;
        metadata.title = (chosen[0]) ? chosen[0].text : '';
        metadata.language = language;
        return metadata;
    }
}

export {
    ProjectMetadata
};
