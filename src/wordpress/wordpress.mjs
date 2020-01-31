import { DataSource } from '../data-source.mjs';
import { WordpressCategory } from './wordpress-category.mjs';
import { WordpressMedia } from './wordpress-media.mjs';
import { WordpressObject } from './wordpress-object.mjs';
import { WordpressPage } from './wordpress-page.mjs';
import { WordpressPost } from './wordpress-post.mjs';
import { WordpressSite } from './wordpress-site.mjs';
import { WordpressTag } from './wordpress-tag.mjs';
import { WordpressUser } from './wordpress-user.mjs';

class Wordpress extends DataSource {
  async fetchWPCategory(siteId, categoryId) {
    return this.fetchWPObject(WordpressCategory, siteId, categoryId);
  }

  async fetchWPCategories(siteId, categoryIds) {
    return this.fetchWPObjects(WordpressCategory, siteId, categoryIds);
  }

  async fetchWPMedia(siteId, mediaId) {
    return this.fetchWPObject(WordpressMedia, siteId, mediaId);
  }

  async fetchWPMedias(siteId, mediaIds) {
    return this.fetchWPObjects(WordpressMedia, siteId, mediaIds);
  }

  async fetchWPPage(siteId, pageId) {
    return this.fetchWPObject(WordpressPage, siteId, pageId);
  }

  async fetchWPPages(siteId, pageIds) {
    return this.fetchWPObjects(WordpressPage, siteId, pageIds);
  }

  async fetchWPPost(siteId, postId) {
    return this.fetchWPObject(WordpressPost, siteId, postId);
  }

  async fetchWPPosts(siteId, postIds) {
    return this.fetchWPObjects(WordpressPost, siteId, postIds);
  }

  async findWPPosts(siteId, criteria) {
    return this.findObjects(WordpressPost, [ siteId ], criteria);
  }

  async fetchWPTag(siteId, tagId) {
    return this.fetchWPObject(WordpressTag, siteId, tagId);
  }

  async fetchWPTags(siteId, tagIds) {
    return this.fetchWPObjects(WordpressTag, siteId, tagIds);
  }

  async fetchWPUser(siteId, userId) {
    return this.fetchWPObject(WordpressUser, siteId, userId);
  }

  async fetchWPUsers(siteId, userIds) {
    return this.fetchWPObjects(WordpressUser, siteId, userIds);
  }

  async findWPUsers(siteId, criteria) {
    return this.findObjects(WordpressUser, [ siteId ], criteria);
  }

  async fetchWPSite(siteId) {
    return this.fetchObject(WordpressSite, [ siteId ]);
  }

  async findWPSites() {
    return this.findObjects(WordpressSite, [], {});
  }

  async fetchWPObject(constructor, siteId, objectId) {
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

  async fetchWPObjects(constructor, siteId, objectIds) {
    const promises = objectIds.map((objectId) => {
      return this.fetchWPObject(constructor, siteId, objectId);
    });
    const objects = await Promise.all(promises);
    return objects;
  }

  async fetchWPObjectBySlug(constructor, siteId, slug) {
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
    const objects = await this.findObjects(constructor, [ siteId ], { slug });
    return objects[0];
  }
}

export {
  Wordpress,
  WordpressCategory,
  WordpressMedia,
  WordpressObject,
  WordpressPage,
  WordpressPost,
  WordpressSite,
  WordpressTag,
  WordpressUser,
};
