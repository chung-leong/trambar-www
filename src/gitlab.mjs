import { DataSource } from './data-source.mjs';
import { MarkdownPage } from './markdown-page.mjs';

class Gitlab extends DataSource {
    async fetchWikiPage(slug) {
        const url = this.getURL([ 'wiki', slug ]);
        const file = await this.fetchObject(url, { transform: MarkdownPage.create });
        return file;
    }

    async fetchWikiPages(filter) {
        const url = this.getURL([ 'wiki' ], { filter });
        const files = await this.fetchObjects(url, { transform: MarkdownPage.create });
        return files;
    }
}

export {
    Gitlab,
    Gitlab as GitLab,
};
