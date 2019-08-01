import EventEmitter, { GenericEvent } from 'relaks-event-emitter';

const defaultOptions = {
    baseURL: '',
    fetchFunc: null,
};

class DataSource extends EventEmitter {
    constructor(extensions, options) {
        super();
        this.active = false;
        this.activationPromise = null;
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
    }

    deactivate() {
        this.active = false;
    }

    getURL(names, query) {
        let url = this.options.baseURL || '';
        names = names.filter(Boolean);
        if (names.length > 0) {
            if (!url.endsWith('/')) {
                url += '/';
            }
            url += names.map(encodeURIComponent).join('/');
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
            let objectURL = this.options.baseURL || '';
            if (!objectURL.endsWith('/')) {
                objectURL += '/';
            }
            objectURL += relativeURL;
            const promise = this.fetchObject(objectURL, itemTransform);
            promises.push(promise);
        }
        const results = await Promise.all(promises);
        if (!compareArrays(results, query.results)) {
            query.results = results;
        }
        return query.results;
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
        };
        this.queries.push(query);
        return query;
    }

    async updateObject(query) {
        try {
            const response = await this.fetch(query.url, { method: 'GET' });
            const etag = response.headers.get('etag');
            const mtime = response.headers.get('last-modified');
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
        const changed = await updateObject(query);
        if (changed) {
            this.triggerEvent(new DataSourceEvent('change', this));
        }
    }

    async checkListing(query) {
        const changed = await updateListing(query);
        if (changed) {
            const objectURLs = query.result;
            for (let objectURL of objectURLs) {
                const props = {
                    url: objectURL,
                    transform: query.itemTransform
                };
                const objectQuery = this.findQuery(props);
                if (objectQuery && objectQuery.dirty) {
                    await updateObject(objectQuery);
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
