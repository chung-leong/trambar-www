import { DataSource } from '../data-source.mjs';
import { GitlabWiki } from './gitlab-wiki.mjs';

class Gitlab extends DataSource {
  fetchWikiPage(repoId, slug) {
    return this.fetchObject(GitlabWiki, [ repoId, slug ]);
  }

  findWikiPages(repoId, criteria) {
    return this.findObjects(GitlabWiki, [ repoId ], criteria);
  }
}

export {
  Gitlab,
};
