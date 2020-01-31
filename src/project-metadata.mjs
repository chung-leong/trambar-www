import { DataSourceObject } from './data-source-object.mjs';
import { HTMLText } from './html-text.mjs';

class ProjectMetadata extends DataSourceObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.name = json.name || '';
    this.title = createHTMLText(json.title);
    this.description = createHTMLText(json.description);
    this.archived = json.archived || false;
  }

  static getObjectURL(identifiers) {
    return `meta/`;
  }
}

function createHTMLText(langText) {
  const tokens = [];
  if (langText instanceof Object) {
    for (let [ lang, text ] of Object.entries(langText)) {
      tokens.push({ type: 'h1', children: [ text ] });
      tokens.push(text);
    }
  }
  return new HTMLText(tokens);
}

export {
  ProjectMetadata
};
