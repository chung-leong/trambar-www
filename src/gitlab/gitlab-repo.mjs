import { GitlabObject } from './gitlab-object.mjs';
import { Text } from '../text.mjs';

class GitlabRepo extends GitlabObject {
  constructor(identifiers, json) {
    super(identifiers);
    if (json) {
      this.id = identifiers[0];
      this.name = new Text(json.name);
      this.description = new Text(json.description);
    }
  }

  static getObjectURL(identifiers) {
    const [ repoId, slug ] = identifiers;
    let url = `repo/`;
    if (repoId) {
      url += `${repoId}/`;
    }
    return url;
  }
}

export {
  GitlabRepo,
};
