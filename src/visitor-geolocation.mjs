import { DataSourceObject } from './data-source-object.mjs';

class VisitorGeolocation extends DataSourceObject {
  constructor(identifiers, json) {
    super(identifiers, json);

    this.countryCode = json.country;
  }

  static getObjectURL(identifiers) {
    return `geoip/`;
  }
}

export {
  VisitorGeolocation
};
