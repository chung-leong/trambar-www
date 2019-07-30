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

    async fetchObject(url, options) {
        const query = this.createQuery({
            type: 'object',
            derive: this.deriveObjectQuery,
            transform: this.transformObject,
            url,
            options,
        });
        return query.promise;
    }

    async fetchObjects(url, options) {
        const query = this.createQuery({
            type: 'objects',
            transform: this.transformObjects,
            url,
            options,
        });
        return query.promise;
    }

    findQuery(props) {
        const { type, url, options } = props;
        for (let query of this.queries) {
            if (query.type === type) {
                if (query.url === url) {
                    if (compareOptions(query.options, options)) {
                        return query;
                    }
                }
            }
        }
    }

    createQuery(props) {
        const existingQuery = this.findQuery(props);
        if (existingQuery) {
            return existingQuery;
        }
        if (props.derive) {
            const derivedQuery = props.derive.call(this, props);
            if (derivedQuery) {
                this.queries.push(derivedQuery);
                return derivedQuery;
            }
        }
        const newQuery = {
            ...props,
            promise: null,
            result: null,
        };
        newQuery.promise = this.runQuery(newQuery);
        this.queries.push(newQuery);
        return newQuery;
    }

    async runQuery(query) {
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
                const data = await response.json();
                query.result = await query.transform.call(this, query, data);
                query.etag = etag;
                query.mtime = mtime;
            }
            return query.result;
        } catch (err) {
            query.error = err;
            throw err;
        }
    }

    deriveObjectQuery(props) {
    }

    async transformObject(query, data) {
        const transform = query.options.transform;
        const object = (transform) ? transform(data) : data;
        return object;
    }

    async transformObjects(query, array) {
        if (!(array instanceof Array)) {
            throw new DataSourceError(400, 'Response is not an array');
        }
        const transform = query.options.transform;
        const objects = [];
        for (let data of array) {
            const object = (transform) ? transform(data) : data;
            objects.push(object);
        }
        return objects;
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

function compareOptions(options1, options2) {
    for (let key in options1) {
        if (options1[key] !== options2[key]) {
            return false;
        }
    }
    for (let key in options2) {
        if (!(key in options1)) {
            return false;
        }
    }
    return true;
}

export {
    DataSource,
};
