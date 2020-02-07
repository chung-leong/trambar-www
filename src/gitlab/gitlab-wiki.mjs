import { GitlabObject } from './gitlab-object.mjs';
import { HTMLText } from '../html-text.mjs';

class GitlabWiki extends GitlabObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.repoId = identifiers[0];
    if (json) {
      this.slug = json.slug;
      this.title = json.title;
      this.content = new HTMLText(json);
    }
  }

  static getObjectURL(identifiers) {
    const [ repoId, slug ] = identifiers;
    let url = `wiki/${repoId}/`;
    if (slug) {
      url += `${slug}/`;
    }
    return url;
  }
}

export {
  GitlabWiki,
};
