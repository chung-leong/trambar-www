import { DataSource } from '../data-source.mjs';
import { GitlabObject } from './gitlab-object.mjs';
import { GitlabWiki } from './gitlab-wiki.mjs';

class Gitlab extends DataSource {
  async fetchWikiPage(repoId, slug) {
    return this.fetchObject(GitlabWiki, repoId, slug);
  }

  async findWikiPages(repoId, criteria) {
    return this.findObjects(GitlabWiki, repoId, criteria);
  }
}

export {
  Gitlab,
  GitlabObject,
  GitlabWiki,
};
