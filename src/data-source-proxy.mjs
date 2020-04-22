class DataSourceProxy {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  fetchProjectMeta() {
    return this.dataSource.fetchProjectMeta();
  }

  fetchExcelFile(fileId) {
    return this.dataSource.fetchExcelFile(fileId);
  }

  findExcelFiles(criteria) {
    return this.dataSource.findExcelFiles(criteria);
  }

  fetchWikiPage(slug, repoId) {
    return this.dataSource.fetchWikiPage(repoId, slug);
  }

  findWikiPages(criteria, repoId) {
    return this.dataSource.findWikiPages(repoId, criteria);
  }

  fetchWPCategory(categoryId, siteId) {
    return this.dataSource.fetchWPCategory(categoryId, siteId);
  }

  fetchWPCategories(categoryIds, siteId) {
    return this.dataSource.fetchWPCategories(categoryIds, siteId);
  }

  fetchWPMedia(mediaId, siteId) {
    return this.dataSource.fetchWPMedia(mediaId, siteId);
  }

  fetchWPMedias(mediaIds, siteId) {
    return this.dataSource.fetchWPMedias(mediaIds, siteId);
  }

  fetchWPPage(pageId, siteId) {
    return this.dataSource.fetchWPPage(pageId, siteId);
  }

  fetchWPPages(pageIds, siteId) {
    return this.dataSource.fetchWPPages(pageIds, siteId);
  }

  fetchWPPost(postId, siteId) {
    return this.dataSource.fetchWPPost(postId, siteId);
  }

  fetchWPPosts(postIds, siteId) {
    return this.dataSource.fetchWPPosts(postIds, siteId);
  }

  findWPPosts(criteria, siteId) {
    return this.dataSource.findWPPosts(criteria, siteId);
  }

  fetchWPTag(tagId, siteId) {
    return this.dataSource.fetchWPTag(tagId, siteId);
  }

  fetchWPTags(tagIds, siteId) {
    return this.dataSource.fetchWPTags(tagIds, siteId);
  }

  fetchWPUser(userId, siteId) {
    return this.dataSource.fetchWPUser(userId, siteId);
  }

  fetchWPUsers(userIds, siteId) {
    return this.dataSource.fetchWPUsers(userIds, siteId);
  }

  findWPUsers(criteria, siteId) {
    return this.dataSource.findWPUsers(criteria, siteId);
  }

  fetchWPSite(siteId) {
    return this.dataSource.fetchWPSite(siteId);
  }

  findWPSites() {
    return this.dataSource.findWPSites();
  }
}

export {
  DataSourceProxy,
};
