import { DataSourceObject } from './data-source-object.mjs';
import { Text } from './text.mjs';

class ProjectMetadata extends DataSourceObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.name = json.name || '';
    this.title = createText(json.title);
    this.description = createText(json.description);
    this.archived = json.archived || false;
  }

  static getObjectURL(identifiers) {
    return `meta/`;
  }
}

function createText(langText) {
  const tokens = [];
  if (langText instanceof Object) {
    for (let [ lang, text ] of Object.entries(langText)) {
      tokens.push({ type: 'h1', children: [ text ] });
      tokens.push(text);
    }
  }
  return new Text(tokens);
}

export {
  ProjectMetadata
};
