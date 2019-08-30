import { DataSource } from '../data-source.mjs';
import { MarkdownPage } from './markdown-page.mjs';

class Gitlab extends DataSource {
    async fetchWikiPage(identifier, slug) {
        const url = this.getDataURL([ 'wiki', identifier, slug ]);
        const file = await this.fetchObject(url, MarkdownPage.create);
        return file;
    }

    async fetchWikiPages(identifier) {
        const names = [ 'wiki' ];
        if (identifier) {
            names.push(identifier);
        }
        const url = this.getDataURL(names);
        const files = await this.fetchObjects(url, MarkdownPage.create);
        return files;
    }
}

export {
    Gitlab,
    Gitlab as GitLab,
};
