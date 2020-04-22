import { DataSource } from '../data-source.mjs';
import { WordpressCategory } from './wordpress-category.mjs';
import { WordpressMedia } from './wordpress-media.mjs';
import { WordpressPage } from './wordpress-page.mjs';
import { WordpressPost } from './wordpress-post.mjs';
import { WordpressSite } from './wordpress-site.mjs';
import { WordpressTag } from './wordpress-tag.mjs';
import { WordpressUser } from './wordpress-user.mjs';

class Wordpress extends DataSource {
  /**
   * Fetch a category
   *
   * @param  {number|string} categoryId
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressCategory>}
   */
  fetchWPCategory(categoryId, siteId) {
    return this.fetchWPObject(WordpressCategory, categoryId, siteId);
  }

  /**
   * Fetch multiple categories
   *
   * @param  {number[]|string[]} categoryIds
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressCategory[]>}
   */
  fetchWPCategories(categoryIds, siteId) {
    return this.fetchWPObjects(WordpressCategory, categoryIds, siteId);
  }

  /**
   * Fetch metadata of an image
   *
   * @param  {number} mediaId
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressMedia>}
   */
  fetchWPMedia(mediaId, siteId) {
    return this.fetchWPObject(WordpressMedia, mediaId, siteId);
  }

  /**
   * Fetch metadata of multiple images
   *
   * @param  {number[]|string[]} mediaIds
   * @param  {string} siteId
   *
   * @return {Promise<WordpressMedia[]>}
   */
  fetchWPMedias(mediaIds, siteId) {
    return this.fetchWPObjects(WordpressMedia, mediaIds, siteId);
  }

  /**
   * Fetch a page
   *
   * @param  {number|string} pageId
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressPage>}
   */
  fetchWPPage(pageId, siteId) {
    return this.fetchWPObject(WordpressPage, pageId, siteId);
  }

  /**
   * Fetch multiple pages
   *
   * @param  {number[]|string[]} pageIds
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressPage[]>}
   */
  fetchWPPages(pageIds, siteId) {
    return this.fetchWPObjects(WordpressPage, siteId, pageIds);
  }

  /**
   * Fetch a a post
   *
   * @param  {number|string} postId
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressPost>}
   */
  fetchWPPost(postId, siteId) {
    return this.fetchWPObject(WordpressPost, postId, siteId);
  }

  /**
   * Fetch multiple posts
   *
   * @param  {number[]|string[]} postIds
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressPost[]>}
   */
  fetchWPPosts(postIds, siteId) {
    return this.fetchWPObjects(WordpressPost, postIds, siteId);
  }

  /**
   * Find posts matching criteria
   *
   * @param  {Object} criteria
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressPost[]>}
   */
  findWPPosts(criteria, siteId) {
    return this.findWPObjects(WordpressPost, criteria, siteId);
  }

  /**
   * Fetch a tag
   *
   * @param  {number|string} tagId
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressTag>}
   */
  fetchWPTag(tagId, siteId) {
    return this.fetchWPObject(WordpressTag, tagId, siteId);
  }

  /**
   * Fetch multiple tags
   *
   * @param  {number[]|string[]} tagIds
   * @param  {string} siteId
   *
   * @return {Promise<WordpressTag[]>}
   */
  fetchWPTags(tagIds, siteId) {
    return this.fetchWPObjects(WordpressTag, tagIds, siteId);
  }

  /**
   * Fetch a user record
   *
   * @param  {number|string} userId
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressUser>}
   */
  fetchWPUser(userId, siteId) {
    return this.fetchWPObject(WordpressUser, siteId, userId);
  }

  /**
   * Fetch multiple user records
   *
   * @param  {number[]|string[]} userIds
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressUser[]>}
   */
  fetchWPUsers(userIds, siteId) {
    return this.fetchWPObjects(WordpressUser, userIds, siteId);
  }

  /**
   * Find user record matching criteria
   *
   * @param  {Object} criteria
   * @param  {string} [siteId]
   *
   * @return {Promise<WordpressUser[]>}
   */
  findWPUsers(criteria, siteId) {
    return this.findWPObjects(WordpressUser, criteria, siteId);
  }

  /**
   * Fetch information about a Wordpress site
   *
   * @param  {string} siteId
   *
   * @return {Promise<WordpressSite>}
   */
  fetchWPSite(siteId) {
    return this.fetchObject(WordpressSite, [ siteId ]);
  }

  fetchWPObject(constructor, objectId, siteId) {
    if (typeof(objectId) === 'string') {
      const number = parseInt(objectId);
      if (!isNaN(number)) {
        objectId = number;
      } else {
        return this.fetchWPObjectBySlug(constructor, objectId, siteId);
      }
    }
    return this.fetchObject(constructor, [ siteId, objectId ]);
  }

  fetchWPObjects(constructor, siteId, objectIds) {
    const promises = objectIds.map((objectId) => {
      return this.fetchWPObject(constructor, objectId, siteId);
    });
    return Promise.all(promises).then((objects) => {
      return objects;
    });
  }

  findWPObjects(constructor, criteria, siteId) {
    const identifiers = (siteId) ? [ siteId ] : [];
    return this.findObjects(WordpressPost, identifiers, criteria);
  }

  fetchWPObjectBySlug(constructor, slug, siteId) {
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
