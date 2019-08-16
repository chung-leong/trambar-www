import { DataSource } from '../data-source.mjs';
import { WordpressSite } from './wordpress-site.mjs';
import { WordpressPost } from './wordpress-post.mjs';

class Wordpress extends DataSource {
    async fetchWPSite(identifier) {
        const url = this.getURL([ 'rest', identifier ]);
        const site = await this.fetchObject(url, WordpressSite.create);
        return site;
    }

    async fetchWPSites() {
        const url = this.getURL([ 'rest' ], { type: 'wordpress' });
        const sites = await this.fetchObjects(url, WordpressSite.create);
        return sites;
    }

    async fetchWPPost(identifier, id) {
        const url = this.getURL([ 'rest', identifier, 'wp', 'v2', 'posts', id ]);
        const post = await this.fetchObject(url, WordpressPost.create);
        return post;
    }

    async fetchWPPostBySlug(identifier, slug) {
        const id = await this.findWPObjectIDBySlug(identifier, 'posts', slug);
        if (id) {
            return this.fetchWPPost(identifier, id);
        }
    }

    async fetchWPPosts(identifier, query) {
        const url = this.getURL([ 'rest', identifier, 'wp', 'v2', 'posts' ], query);
        const posts = await this.fetchObjects(url, WordpressPost.create);
        return posts;
    }

    async findWPObjectIDBySlug(identifier, folder, slug) {
        // look for it among cached queries
        const folderURL = this.getURL([ 'rest', identifier, 'wp', 'v2', folder ]);
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
        const idURL = this.getURL([ 'rest', identifier, 'wp', 'v2', folder ], { slug });
        const ids = await this.fetchObject(idURL);
        return ids[0];
    }
}

export {
    Wordpress,
    Wordpress as WordPress,
};
