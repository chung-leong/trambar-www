import { GitlabObject } from './gitlab-object.mjs';
import { Text } from '../text.mjs';

class GitlabWiki extends GitlabObject {
  constructor(identifiers, json) {
    super(identifiers);
    if (json) {
      this.repoId = identifiers[0];
      this.slug = json.slug;
      this.title = new Text(json.title);
      this.content = new Text(json.content);
    }
  }

  static getObjectURL(identifiers) {
    const [ repoId, slug ] = identifiers;
    let url = `repo/${repoId}/wiki/`;
    if (slug) {
      url += `${slug}/`;
    }
    return url;
  }
}

export {
  GitlabWiki,
};
