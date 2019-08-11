import { DataSource } from './data-source.mjs';
import { WordpressPost } from './wordpress-post.mjs';

class Wordpress extends DataSource {
    async fetchWPPost(name, id) {
        const url = this.getURL([ 'rest', name, 'wp', 'v2', 'posts', id ]);
        const post = await this.fetchObject(url, WordpressPost.create);
        return post;
    }

    async fetchWPPostBySlug(name, slug) {
        const id = await this.findWPObjectIDBySlug(name, 'posts', slug);
        if (id) {
            return this.fetchWPPost(name, id);
        }
    }

    async fetchWPPosts(name, query) {
        const url = this.getURL([ 'rest', name, 'wp', 'v2', 'posts' ], query);
        const posts = await this.fetchObjects(url, WordpressPost.create);
        return posts;
    }

    async findWPObjectIDBySlug(name, folder, slug) {
        // look for it among cached queries
        const folderURL = this.getURL([ 'rest', name, 'wp', 'v2', folder ]);
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
        const idURL = this.getURL([ 'rest', name, 'wp', 'v2', folder ], query);
        const ids = await this.fetchObject(idURL);
        return ids[0];
    }
}

export {
    Wordpress,
    Wordpress as WordPress,
};
