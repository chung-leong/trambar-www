import { DataSource } from '../data-source.mjs';
import { MarkdownPage } from './markdown-page.mjs';

class Gitlab extends DataSource {
    async fetchWikiPage(repo, slug) {
        const url = this.getURL([ 'wiki', repo, slug ]);
        const file = await this.fetchObject(url, MarkdownPage.create);
        return file;
    }

    async fetchWikiPages(repo, prefix) {
        const names = [ 'wiki' ];
        if (repo) {
            names.push(repo);
        }
        const url = this.getURL(names, { prefix });
        const files = await this.fetchObjects(url, MarkdownPage.create);
        return files;
    }
}

export {
    Gitlab,
    Gitlab as GitLab,
};