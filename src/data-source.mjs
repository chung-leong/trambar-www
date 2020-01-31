import { EventEmitter } from 'relaks-event-emitter';
import { DataSourceError } from './data-source-error.mjs';
import { DataSourceEvent } from './data-source-event.mjs';
import { DataSourceObject } from './data-source-object.mjs';
import { ProjectMetadata } from './project-metadata.mjs';
import { VisitorGeolocation } from './visitor-geolocation.mjs';

const defaultOptions = {
  baseURL: '',
  fetchFunc: null,
  refreshDelay: 1000,
  refreshInterval: Infinity,
};

class DataSource extends EventEmitter {
  constructor(extensions, options) {
    super();
    this.active = false;
    this.activationPromise = null;
    this.freshnessCheckInterval = 0;
    this.queries = [];

    this.options = {};
    for (let name in defaultOptions) {
      if (options && options[name] !== undefined) {
        this.options[name] = options[name];
      } else {
        this.options[name] = defaultOptions[name];
      }
    }

    for (let extension of extensions) {
      let p = extension.prototype;
      while (p && p !== DataSource.prototype) {
        const names = Object.getOwnPropertyNames(p);
        for (let name of names) {
          if (name !== 'constructor') {
            this[name] = p[name];
          }
        }
        p = p.prototype;
      }
    }
  }

  activate() {
    this.active = true;
    if (this.activationPromise) {
      const { resolve } = this.activationPromise;
      this.activationPromise = null;
      resolve();
    }
    this.freshnessCheckInterval = setInterval(() => {
      this.checkFreshness();
    }, 250);
  }

  deactivate() {
    this.active = false;
    clearInterval(this.freshnessCheckInterval);
    this.freshnessCheckInterval = 0;
  }

  log() {
    this.fetchGeoIP().catch((err) => {});
  }

  async fetchProjectMeta() {
    return this.fetchObject(ProjectMetadata, []);
  }

  async fetchVisitorGeolocation() {
    return this.fetchObject(VisitorGeolocation, []);
  }

  getDataURL(constructor, identifiers, criteria) {
    let url = this.options.baseURL || '';
    if (!url.endsWith('/')) {
      url += '/';
    }
    url += 'data/';
    url += encodeURI(constructor.getObjectURL(identifiers));
    if (criteria instanceof Object) {
      const pairs = [];
      for (let [ key, value ] of Object.entries(criteria)) {
        if (value !== undefined) {
          const keyEnc = encodeURIComponent(key);
          const valueEnc = encodeURIComponent(value);
          pairs.push(`${keyEnc}=${valueEnc}`);
        }
      }
      if (pairs.length > 0) {
        url += '?' + pairs.join('&');
      }
    }
    return url;
  }

  async fetchObject(constructor, identifiers) {
    const url = this.getDataURL(constructor, identifiers);
    let query = this.findQuery({ url, constructor });
    if (query) {
      if (query.dirty) {
        this.checkObject(query);
      }
    } else {
      query = this.addQuery({
        url,
        constructor,
        identifiers
      });
      query.promise = this.updateObject(query);
    }
    await query.promise;
    return query.result;
  }

  async findObjects(constructor, identifiers, criteria) {
    const url = this.getDataURL(constructor, identifiers, criteria);
    let query = this.findQuery({ url, constructor: null });
    if (query) {
      if (query.dirty) {
        this.checkListing(query);
      }
    } else {
      query = this.addQuery({
        url,
        constructor: null,
        pageVariable: constructor.getPageVariable(),
        pageQueries: [ {} ],
      });
      query.promise = this.updateListing(query);
    }
    await query.promise;
    if (!(query.result instanceof Array)) {
      throw new Error('Server did not return a list');
    }
    const promises = query.result.map((path) => {
      const additional = path.split('/').filter(Boolean);
      const combined = [ ...identifiers, ...additional ];
      return this.fetchObject(constructor, combined);
    });
    const objects = await Promise.all(promises);
    if (!compareArrays(objects, query.objects)) {
      if (query.pageVariable) {
        objects.more = this.requestMore.bind(this, query);
      }
      query.objects = objects;
    }
    objects.total = query.result.total;
    objects.pages = query.result.pages;
    return query.objects;
  }

  async requestMore(query) {
    if (query.result) {
      if (query.pageQueries.length < query.result.pages) {
        query.pageQueries.push({});
        await this.checkListing(query);
      }
    }
  }

  findQuery(props) {
    for (let query of this.queries) {
      let different = false;
      for (let [ key, value ] of Object.entries(props)) {
        if (query[key] !== value) {
          different = true;
        }
      }
      if (!different) {
        return query;
      }
    }
  }

  addQuery(props) {
    const query = {
      ...props,
      promise: null,
      result: null,
      dirty: false,
      stale: null,
    };
    this.queries.push(query);
    return query;
  }

  async updateObject(query) {
    try {
      const response = await this.fetch(query.url, { method: 'GET' });
      const etag = response.headers.get('etag');
      const mtime = response.headers.get('last-modified');
      const status = response.headers.get('x-cache-status');
      const total = response.headers.get('x-total');
      const pages = response.headers.get('x-total-pages');
      let changed = true;
      if (etag && query.etag === etag) {
        changed = false;
      } else if (mtime && query.mtime == mtime) {
        changed = false;
      }
      if (changed) {
        const { constructor, identifiers } = query;
        const json = await response.json();
        const result = (constructor) ? new constructor(identifiers, json) : json;
        query.result = result;
        query.etag = etag;
        query.mtime = mtime;
        if (result instanceof Array) {
          if (total) {
            result.total = parseInt(total);
          }
          if (pages) {
            result.pages = parseInt(pages);
          }
        }
      }
      const now = new Date;;
      if (status === 'STALE' || status === 'UPDATING') {
        query.stale = now;
        query.fresh = null;
      } else {
        query.stale = null;
        query.fresh = now;
      }
      query.dirty = false;
      query.error = null;
      return changed;
    } catch (err) {
      query.error = err;
      throw err;
    }
  }

  async updateListing(query) {
    const promises = [];
    for (let [ pageIndex, pageQuery ] of query.pageQueries.entries()) {
      let promise;
      if (!pageQuery.promise) {
        pageQuery.url = addPageNumber(query.url, query.pageVariable, pageIndex + 1);
        promise = this.updateObject(pageQuery);
      } else if (pageQuery.dirty || pageQuery.error) {
        promise = this.updateObject(pageQuery);
      }
      if (promise) {
        pageQuery.promise = promise;
        promises.push(promise);
      } else {
        promises.push(false);
      }
    }
    try {
      const pageChanged = await Promise.all(promises);
      let changed = some(pageChanged);
      if (changed) {
        const items = [];
        for (let [ pageIndex, pageQuery ] of query.pageQueries.entries()) {
          if (pageQuery.result) {
            for (let item of pageQuery.result) {
              // check for duplication in case page boundaries shifted
              // in the middle of retrieval
              if (items.indexOf(item) === -1) {
                  items.push(item);
              }
            }

            if (pageChanged[pageIndex]) {
              if (pageQuery.result.total) {
                items.total = pageQuery.result.total;
              }
              if (pageQuery.result.pages) {
                items.pages = pageQuery.result.pages;
              }
            }
          }
        }
        query.result = items;
      }
      let minStaleTime = null;
      for (let pageQuery of query.pageQueries) {
        if (pageQuery.stale) {
          if (!minStaleTime || minStaleTime > pageQuery.stale) {
            minStaleTime = pageQuery.stale;
          }
        }
      }
      if (minStaleTime) {
        query.stale = minStaleTime;
        query.fresh = null;
      } else {
        query.stale = null;
        query.fresh = new Date;
      }
      query.dirty = false;
      query.error = null;
      return changed;
    } catch (err) {
      query.error = err;
      throw err;
    }
  }

  async checkObject(query) {
    if (!query.checking) {
      query.checking = true;
      const changed = await this.updateObject(query);
      query.checking = false;
      if (changed) {
        this.triggerEvent(new DataSourceEvent('change', this));
      }
    }
  }

  async checkListing(query) {
    if (!query.checking) {
      query.checking = true;
      const changed = await this.updateListing(query);
      query.checking = false;
      if (changed) {
        const objectURLs = query.result;
        for (let objectURL of objectURLs) {
          const props = {
            url: objectURL,
            constructor: query.constructor
          };
          const objectQuery = this.findQuery(props);
          if (objectQuery && objectQuery.dirty) {
            await this.updateObject(objectQuery);
          }
        }
        this.triggerEvent(new DataSourceEvent('change', this));
      }
    }
  }

  checkFreshness() {
    const now = new Date;
    const { refreshDelay, refreshInterval } = this.options;
    const invalidating = [];
    for (let query of this.queries) {
      if (query.stale) {
        // we received stale data from Nginx
        const elapsed = now - query.stale;
        if (elapsed > refreshDelay) {
            // a short time has passed since we received
            // stale data from Nginx; the server should have
            // brought the data up-to-date by now
            invalidating.push(query);
        }
      } else if (query.fresh) {
        const elapsed = now - query.fresh;
        if (elapsed > refreshInterval) {
          // some time has passed since we received
          // fresh data from Nginx; check with the server in
          // case the data has changed
          invalidating.push(query);
        }
      }
    }
    if (invalidating.length > 0) {
      for (let query of invalidating) {
        query.dirty = true;
        query.stale = null;
        query.fresh = null;
        if (query.pageQueries) {
          for (let pageQuery of query.pageQueries) {
            if (pageQuery.promise) {
                pageQuery.dirty = true;
                pageQuery.stale = null;
                pageQuery.fresh = null;
            }
          }
        }
      }
      this.triggerEvent(new DataSourceEvent('change', this));
    }
  }

  /**
   * Wait for active to become true then run fetch(), using custom function
   * if one is supplied
   *
   * @type {Promise<Response>}
   */
  async fetch(url, options) {
    await this.waitForActivation();
    if (!options) {
      options = {};
    }
    const f = this.options.fetchFunc || fetch;
    try {
      const response = await f(url, options);
      if (response.status >= 400) {
        throw new DataSourceError(response.status, response.statusText);
      }
      return response;
    } catch (err) {
      // try again if the data source was deactivated in the middle of
      // an operation--we'll wait once again for active to become true
      if (!this.active && !err.status) {
        return this.fetch(url, options);
      } else {
        throw err;
      }
    }
  }

  async waitForActivation() {
    if (this.active) {
      return;
    }
    if (!this.activationPromise) {
      let resolve;
      this.activationPromise = new Promise((r) => { resolve = r });
      this.activationPromise.resolve = resolve;
    }
    await this.activationPromise;
  }
}

function compareArrays(array1, array2) {
  if (!array1 || !array2) {
    return false;
  }
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function addPageNumber(url, pageVariable, pageNumber) {
  if (pageNumber > 1) {
    url += (url.indexOf('?') === -1) ? '?' : '&';
    url += pageVariable + '=' + pageNumber;
  }
  return url;
}

function some(array) {
  for (let el of array) {
    if (el) {
      return true;
    }
  }
  return false;
}

export {
  DataSource,
  DataSourceError,
  DataSourceEvent,
  DataSourceObject,
  ProjectMetadata,
  VisitorGeolocation,
};
