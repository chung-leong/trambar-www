import { DataSource } from '../data-source.mjs';
import { GitlabWiki } from './gitlab-wiki.mjs';
import { GitlabRepo } from './gitlab-repo.mjs';

class Gitlab extends DataSource {
  /**
   * Fetch wiki page
   *
   * @param  {string} slug
   * @param  {string} [repoId]
   *
   * @return {Promise<GitlabWiki>}
   */
  fetchWikiPage(slug, repoId) {
    return this.findRepoId(repoId).then((repoId) => {
      return this.fetchObject(GitlabWiki, [ repoId, slug ]);
    });
  }

  /**
   * Find matching wiki page
   *
   * @param  {Object} criteria
   * @param  {string} [repoId]
   *
   * @return {Promise<GitlabWiki[]>}
   */
  findWikiPages(criteria, repoId) {
    return this.findRepoId(repoId).then((repoId) => {
      if (!repoId) {
        return [];
      }
      return this.findObjects(GitlabWiki, [ repoId ], criteria);
    });
  }

  /**
   * Fetch repo information
   *
   * @param  {string} repoId
   *
   * @return {Promise<GitlabRepo>}
   */
  fetchRepo(repoId) {
    return this.fetchObject(GitlabRepo, [ repoId ]);
  }

  /**
   * Find all repos
   *
   * @return {Promise<GitlabRepo[]>}
   */
  findRepos() {
    return this.findObjects(GitlabRepo, [], {});
  }

  /**
   * Return id of first repo if no id is given
   *
   * @param  {string} repoId
   *
   * @return {Promise<string>}
   */
  findRepoId(repoId) {
    if (repoId) {
      return Promise.resolve(repoId);
    } else {
      return this.findRepos().then((repos) => {
        return (repos[0]) ? repos[0].id : '';
      });
    }
  }
}

export {
  Gitlab,
};
