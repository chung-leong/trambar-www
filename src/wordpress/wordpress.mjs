import { DataSource } from '../data-source.mjs';
import { WordpressCategory } from './wordpress-category.mjs';
import { WordpressMedia } from './wordpress-media.mjs';
import { WordpressPage } from './wordpress-page.mjs';
import { WordpressPost } from './wordpress-post.mjs';
import { WordpressSite } from './wordpress-site.mjs';
import { WordpressTag } from './wordpress-tag.mjs';
import { WordpressUser } from './wordpress-user.mjs';

class Wordpress extends DataSource {
  fetchWPCategory(siteId, categoryId) {
    return this.fetchWPObject(WordpressCategory, siteId, categoryId);
  }

  fetchWPCategories(siteId, categoryIds) {
    return this.fetchWPObjects(WordpressCategory, siteId, categoryIds);
  }

  fetchWPMedia(siteId, mediaId) {
    return this.fetchWPObject(WordpressMedia, siteId, mediaId);
  }

  fetchWPMedias(siteId, mediaIds) {
    return this.fetchWPObjects(WordpressMedia, siteId, mediaIds);
  }

  fetchWPPage(siteId, pageId) {
    return this.fetchWPObject(WordpressPage, siteId, pageId);
  }

  fetchWPPages(siteId, pageIds) {
    return this.fetchWPObjects(WordpressPage, siteId, pageIds);
  }

  fetchWPPost(siteId, postId) {
    return this.fetchWPObject(WordpressPost, siteId, postId);
  }

  fetchWPPosts(siteId, postIds) {
    return this.fetchWPObjects(WordpressPost, siteId, postIds);
  }

  findWPPosts(siteId, criteria) {
    return this.findObjects(WordpressPost, [ siteId ], criteria);
  }

  fetchWPTag(siteId, tagId) {
    return this.fetchWPObject(WordpressTag, siteId, tagId);
  }

  fetchWPTags(siteId, tagIds) {
    return this.fetchWPObjects(WordpressTag, siteId, tagIds);
  }

  fetchWPUser(siteId, userId) {
    return this.fetchWPObject(WordpressUser, siteId, userId);
  }

  fetchWPUsers(siteId, userIds) {
    return this.fetchWPObjects(WordpressUser, siteId, userIds);
  }

  findWPUsers(siteId, criteria) {
    return this.findObjects(WordpressUser, [ siteId ], criteria);
  }

  fetchWPSite(siteId) {
    return this.fetchObject(WordpressSite, [ siteId ]);
  }

  findWPSites() {
    return this.findObjects(WordpressSite, [], {});
  }

  fetchWPObject(constructor, siteId, objectId) {
    if (typeof(objectId) === 'string') {
      const number = parseInt(objectId);
      if (!isNaN(number)) {
        objectId = number;
      } else {
        return this.fetchWPObjectBySlug(constructor, siteId, objectId);
      }
    }
    return this.fetchObject(constructor, [ siteId, objectId ]);
  }

  fetchWPObjects(constructor, siteId, objectIds) {
    const promises = objectIds.map((objectId) => {
      return this.fetchWPObject(constructor, siteId, objectId);
    });
    return Promise.all(promises).then((objects) => {
      return objects;
    });
  }

  fetchWPObjectBySlug(constructor, siteId, slug) {
    // look for it among cached queries
    for (let query of this.queries) {
      if (query.constructor === constructor) {
        if (query.result && query.result.slug === slug) {
          // in case the query needs to be refreshed
          return this.fetchObject(constructor, [ siteId, query.result.id ]);
        }
      }
    }

    // retrieve id from server
    return this.findObjects(constructor, [ siteId ], { slug }).then((objects) => {
      return objects[0];
    });
  }
}

export {
  Wordpress,
};
