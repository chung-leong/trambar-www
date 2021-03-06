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
    this.fetchVisitorGeolocation().catch((err) => {});
  }

  fetchProjectMeta() {
    return this.fetchObject(ProjectMetadata, []);
  }

  fetchVisitorGeolocation() {
    return this.fetchObject(VisitorGeolocation, []);
  }

  getDataURL(objectClass, identifiers, criteria) {
    let url = this.options.baseURL || '';
    if (!url.endsWith('/')) {
      url += '/';
    }
    url += 'data/';
    url += encodeURI(objectClass.getObjectURL(identifiers));
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

  fetchObject(objectClass, identifiers) {
    const url = this.getDataURL(objectClass, identifiers);
    let query = this.findQuery({ url, objectClass });
    if (query) {
      if (query.dirty) {
        this.checkObject(query);
      }
    } else {
      query = this.addQuery({
        url,
        objectClass,
        identifiers
      });
      query.promise = this.updateObject(query);
    }
    return query.promise.then(() => {
      return query.result;
    });
  }

  findObjects(objectClass, identifiers, criteria) {
    const url = this.getDataURL(objectClass, identifiers, criteria);
    let query = this.findQuery({ url, objectClass: null });
    if (query) {
      if (query.dirty) {
        this.checkListing(query);
      }
    } else {
      query = this.addQuery({
        url,
        objectClass: null,
        pageVariable: objectClass.getPageVariable(),
        pageQueries: [ {} ],
      });
      query.promise = this.updateListing(query);
    }
    return query.promise.then(() => {
      if (!(query.result instanceof Array)) {
        throw new Error('Server did not return a list');
      }
      const promises = query.result.map((path) => {
        const additional = path.split('/').filter(Boolean);
        const combined = [ ...identifiers, ...additional ];
        return this.fetchObject(objectClass, combined);
      });
      return Promise.all(promises).then((objects) => {
        if (!compareArrays(objects, query.objects)) {
          if (query.pageVariable) {
            objects.more = this.requestMore.bind(this, query);
          }
          query.objects = objects;
        }
        if (query.result.total !== undefined) {
          objects.total = query.result.total;
        }
        if (query.result.pages !== undefined) {
          objects.pages = query.result.pages;
        }
        return query.objects;
      });
    });
  }

  requestMore(query) {
    if (query.result) {
      if (query.pageQueries.length < query.result.pages) {
        query.pageQueries.push({});
        this.checkListing(query);
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

  updateObject(query) {
    return this.fetch(query.url, { method: 'GET' }).then((response) => {
      const etag = response.headers.get('etag');
      const mtime = response.headers.get('last-modified');
      const status = response.headers.get('x-cache-status');
      const total = response.headers.get('x-total');
      const pages = response.headers.get('x-total-pages');
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

      let changed = true;
      if (etag && query.etag === etag) {
        changed = false;
      } else if (mtime && query.mtime == mtime) {
        changed = false;
      }
      if (changed) {
        return response.json().then((json) => {
          const { objectClass, identifiers } = query;
          const result = (objectClass) ? new objectClass(identifiers, json) : json;
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
          return true;
        });
      } else {
        return false;
      }
    }).catch((err) => {
      query.error = err;
      throw err;
    });
  }

  updateListing(query) {
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
    return Promise.all(promises).then((pageChanged) => {
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

      const changed = some(pageChanged);
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
              if (pageQuery.result.total !== undefined) {
                items.total = pageQuery.result.total;
              }
              if (pageQuery.result.pages !== undefined) {
                items.pages = pageQuery.result.pages;
              }
            }
          }
        }
        query.result = items;
        return true;
      } else {
        return false;
      }
    }).catch((err) => {
      query.error = err;
      throw err;
    });
  }

  checkObject(query) {
    if (!query.checking) {
      query.checking = true;
      this.updateObject(query).then((changed) => {
        query.checking = false;
        if (changed) {
          this.triggerEvent(new DataSourceEvent('change', this));
        }
      }).catch((err) => {
        query.checking = false;
        throw err;
      });
    }
  }

  checkListing(query) {
    if (!query.checking) {
      query.checking = true;
      this.updateListing(query).then((changed) => {
        query.checking = false;
        if (changed) {
          const objectURLs = query.result;
          const updates = [];
          for (let objectURL of objectURLs) {
            const props = {
              url: objectURL,
              objectClass: query.objectClass
            };
            const objectQuery = this.findQuery(props);
            if (objectQuery && objectQuery.dirty) {
              updates.push(this.updateObject(objectQuery));
            }
          }
          Promise.all(updates).then(() => {
            this.triggerEvent(new DataSourceEvent('change', this));
          });
        }
      }).catch((err) => {
        query.checking = false;
        throw err;
      });
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
  fetch(url, options) {
    if (!options) {
      options = {};
    }
    return this.waitForActivation().then(() => {
      const f = this.options.fetchFunc || fetch;
      return f(url, options).then((response) => {
        if (response.status >= 400) {
          throw new DataSourceError(response.status, response.statusText);
        }
        return response;
      }).catch((err) => {
        // try again if the data source was deactivated in the middle of
        // an operation--we'll wait once again for active to become true
        if (!this.active && !err.status) {
          return this.fetch(url, options);
        } else {
          throw err;
        }
      });
    });
  }

  waitForActivation() {
    if (this.active) {
      return Promise.resolve();
    }
    if (!this.activationPromise) {
      let resolve;
      this.activationPromise = new Promise((r) => { resolve = r });
      this.activationPromise.resolve = resolve;
    }
    return this.activationPromise;
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
};
