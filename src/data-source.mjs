import EventEmitter, { GenericEvent } from 'relaks-event-emitter';
import { ProjectMetadata } from './project-metadata.mjs';

const defaultOptions = {
    baseURL: '',
    fetchFunc: null,
    refreshDelay: 1000,
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
            let self = DataSource.prototype;
            while (p && p !== self) {
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
        }, 1000);
    }

    deactivate() {
        this.active = false;
        clearInterval(this.freshnessCheckInterval);
        this.freshnessCheckInterval = 0;
    }

    log() {
        this.fetchGeoIP().catch((err) => {});
    }

    async fetchProjectMeta(name) {
        const url = this.getDataURL([ 'meta' ]);
        const metadata = await this.fetchObject(url, ProjectMetadata.create);
        return metadata;
    }

    async fetchGeoIP() {
        const url = this.getDataURL([ 'geoip' ]);
        const info = await this.fetchObject(url);
        return info;
    }

    getDataURL(names, query) {
        let url = this.options.baseURL || '';
        if (names.length > 0) {
            if (!url.endsWith('/')) {
                url += '/';
            }
            url += 'data/' + names.map(encodeURIComponent).join('/') + '/';
        }
        if (query instanceof Object) {
            const pairs = [];
            for (let [ key, value ] of Object.entries(query)) {
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

    async fetchObject(url, transform) {
        const props = { url, transform };
        let query = this.findQuery(props);
        if (query) {
            if (query.dirty) {
                this.checkObject(query);
            }
        } else {
            query = this.addQuery(props);
            query.promise = this.updateObject(query);
        }
        await query.promise;
        return query.result;
    }

    async fetchObjects(url, itemTransform) {
        const props = { url, itemTransform };
        let query = this.findQuery(props);
        if (query) {
            if (query.dirty) {
                this.checkListing(query);
            }
        } else {
            query = this.addQuery(props);
            query.promise = this.updateListing(query);
        }
        await query.promise;
        const relativeURLs = query.result;
        if (!(relativeURLs instanceof Array)) {
            throw new Error('Server did not return a list of URLs');
        }
        const promises = [];
        for (let relativeURL of relativeURLs) {
            const qIndex = url.indexOf('?');
            let objectURL = (qIndex !== -1) ? url.substr(0, qIndex) : url;
            if (!objectURL.endsWith('/')) {
                objectURL += '/';
            }
            objectURL += relativeURL;
            if (!objectURL.endsWith('/')) {
                objectURL += '/';
            }
            const promise = this.fetchObject(objectURL, itemTransform);
            promises.push(promise);
        }
        const results = await Promise.all(promises);
        if (!compareArrays(results, query.results)) {
            query.results = results;
        }
        return query.results;
    }

    findQuery(predicate) {
        if (predicate instanceof Function) {
            const func = predicate;
            for (let query of this.queries) {
                if(func(query)) {
                    return query;
                }
            }
        } else if (predicate instanceof Object) {
            const props = predicate;
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
            let changed = true;
            if (etag && query.etag === etag) {
                changed = false;
            } else if (mtime && query.mtime == mtime) {
                changed = false;
            }
            if (changed) {
                const t = query.transform;
                const data = await response.json();
                const result = (t) ? t(data) : data;
                query.result = result;
                query.etag = etag;
                query.mtime = mtime;
            }
            query.dirty = false;
            if (status === 'STALE' || status === 'UPDATING') {
                query.stale = new Date;
            } else {
                query.stale = null;
            }
            return changed;
        } catch (err) {
            query.error = err;
            throw err;
        }
    }

    async updateListing(query) {
        return this.updateObject(query);
    }

    async checkObject(query) {
        const changed = await this.updateObject(query);
        if (changed) {
            this.triggerEvent(new DataSourceEvent('change', this));
        }
    }

    async checkListing(query) {
        const changed = await this.updateListing(query);
        if (changed) {
            const objectURLs = query.result;
            for (let objectURL of objectURLs) {
                const props = {
                    url: objectURL,
                    transform: query.itemTransform
                };
                const objectQuery = this.findQuery(props);
                if (objectQuery && objectQuery.dirty) {
                    await this.updateObject(objectQuery);
                }
            }
            this.triggerEvent(new DataSourceEvent('change', this));
        }
    }

    checkFreshness() {
        const now = new Date;
        const delay = this.options.refreshDelay;
        let invalidated = false;
        for (let query of this.queries) {
            if (query.stale) {
                const elapsed = now - query.stale;
                if (elapsed > delay) {
                    query.dirty = true;
                    query.stale = null;
                    invalidated = true;
                }
            }
        }
        if (invalidated) {
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

class DataSourceError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

class DataSourceEvent extends GenericEvent {
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

export {
    DataSource,
};
