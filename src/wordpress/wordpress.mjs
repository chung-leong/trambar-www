import { DataSource } from '../data-source.mjs';
import { WordpressCategory } from './wordpress-category.mjs';
import { WordpressMedia } from './wordpress-media.mjs';
import { WordpressPage } from './wordpress-page.mjs';
import { WordpressPost } from './wordpress-post.mjs';
import { WordpressSite } from './wordpress-site.mjs';
import { WordpressTag } from './wordpress-tag.mjs';
import { WordpressUser } from './wordpress-user.mjs';

class Wordpress extends DataSource {
    getWPDataURL(identifier, parts, query) {
        const full = [ 'rest' ];
        if (identifier) {
            full.push(identifier);
            if (parts && parts.length > 0) {
                full.push('wp', 'v2');
                for (let part of parts) {
                    full.push(part);
                }
            }
        }
        return this.getDataURL(full, query);
    }

    async fetchWPCategory(identifier, criteria) {
        return this.fetchWPObject(identifier, criteria, WordpressCategory);
    }

    async fetchWPCategories(identifier, criteria) {
        return this.fetchWPObjects(identifier, criteria, WordpressCategory);
    }

    async fetchWPMedia(identifier, criteria) {
        return this.fetchWPObject(identifier, criteria, WordpressMedia);
    }

    async fetchWPMedias(identifier, criteria) {
        return this.fetchWPObjects(identifier, criteria, WordpressMedia);
    }

    async fetchWPPage(identifier, criteria) {
        return this.fetchWPObject(identifier, criteria, WordpressPage);
    }

    async fetchWPPages(identifier, criteria) {
        return this.fetchWPObjects(identifier, criteria, WordpressPage);
    }

    async fetchWPPost(identifier, criteria) {
        return this.fetchWPObject(identifier, criteria, WordpressPost);
    }

    async fetchWPPosts(identifier, criteria) {
        return this.fetchWPObjects(identifier, criteria, WordpressPost);
    }

    async fetchWPSite(identifier) {
        const url = this.getWPDataURL(identifier);
        return this.fetchObject(url, WordpressSite.create);
    }

    async fetchWPSites() {
        const url = this.getWPDataURL(null, { type: 'wordpress' });
        return this.fetchObjects(url, WordpressSite.create);
    }

    async fetchWPTag(identifier, criteria) {
        return this.fetchWPObject(identifier, criteria, WordpressTag);
    }

    async fetchWPTags(identifier, criteria) {
        return this.fetchWPObjects(identifier, criteria, WordpressTag);
    }

    async fetchWPUser(identifier, criteria) {
        return this.fetchWPObject(identifier, criteria, WordpressUser);
    }

    async fetchWPUsers(identifier, criteria) {
        return this.fetchWPObjects(identifier, criteria, WordpressUser);
    }

    async fetchWPObject(identifier, criteria, type) {
        if (typeof(criteria) === 'number' || parseInt(criteria) > 0) {
            const id = criteria;
            const url = this.getWPDataURL(identifier, [ type.folder, id ]);
            return this.fetchObject(url, type.create);
        } else if (typeof(criteria) === 'string') {
            const slug = criteria;
            const id = await this.findWPObjectIDBySlug(identifier, slug, type);
            if (id) {
                return this.fetchWPObject(identifier, id, type);
            }
        } else if (criteria instanceof Object) {
            const [ object ] = await this.fetchWPObjects(identifier, criteria, type);
            return object;
        } else {
            throw new Error('Invalid criteria');
        }
    }

    async fetchWPObjects(identifier, criteria, type) {
        if (criteria instanceof Array) {
            const promises = criteria.map((key) => {
                return this.fetchWPObject(identifier, key, type);
            });
            return Promise.all(promises);
        } else if (criteria == null || criteria instanceof Object) {
            const query = criteria;
            const url = this.getWPDataURL(identifier, [ type.folder ], query);
            const posts = await this.fetchObjects(url, type.create, 'page');
            return posts;
        } else {
            throw new Error('Invalid criteria');
        }
    }

    async findWPObjectIDBySlug(identifier, slug, type) {
        // look for it among cached queries
        const folderURL = this.getWPDataURL(identifier, [ type.folder ]);
        const query = this.findQuery((query) => {
            if (query.result && query.result.slug === slug) {
                if (query.url.startsWith(folderURL)) {
                    if (query.result.id) {
                        return true;
                    }
                }
            }
        });
        if (query) {
            return query.result.id;
        }

        // retrieve id from server
        const idURL = this.getWPDataURL(identifier, [ type.folder ], { slug });
        const ids = await this.fetchObject(idURL);
        return ids[0];
    }
}

export {
    Wordpress,
    Wordpress as WordPress,
};
