import { GitlabObject } from './gitlab-object.mjs';
import { Text } from '../text.mjs';

class GitlabWiki extends GitlabObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.repoId = identifiers[0];
    if (json) {
      this.slug = json.slug;
      this.title = new Text(json.title);
      this.content = new Text(json.content);
    }
  }

  static getObjectURL(identifiers) {
    const [ repoId, slug ] = identifiers;
    let url = `wiki/`;
    if (repoId) {
      url += `${repoId}/`;
      if (slug) {
        url += `${slug}/`;
      }
    }
    return url;
  }
}

export {
  GitlabWiki,
};
