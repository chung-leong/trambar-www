import { DataSourceObject } from './data-source-object.mjs';
import { Text } from './text.mjs';

class ProjectMetadata extends DataSourceObject {
  constructor(identifiers, json) {
    super();
    if (json) {
      this.id = json.id || '';
      this.title = new Text(json.title);
      this.description = new Text(json.description);
      this.archived = json.archived || false;
    }
  }

  static getObjectURL(identifiers) {
    return `meta/`;
  }
}

export {
  ProjectMetadata
};
