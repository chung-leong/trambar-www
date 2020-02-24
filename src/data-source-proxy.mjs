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

  fetchWikiPage(repoId, slug) {
    return this.dataSource.fetchWikiPage(repoId, slug);
  }

  findWikiPages(repoId, criteria) {
    return this.dataSource.findWikiPages(repoId, criteria);
  }

  fetchWPCategory(siteId, categoryId) {
    return this.dataSource.fetchWPCategory(siteId, categoryId);
  }

  fetchWPCategories(siteId, categoryIds) {
    return this.dataSource.fetchWPCategories(siteId, categoryIds);
  }

  fetchWPMedia(siteId, mediaId) {
    return this.dataSource.fetchWPMedia(siteId, mediaId);
  }

  fetchWPMedias(siteId, mediaIds) {
    return this.dataSource.fetchWPMedias(siteId, mediaIds);
  }

  fetchWPPage(siteId, pageId) {
    return this.dataSource.fetchWPPage(siteId, pageId);
  }

  fetchWPPages(siteId, pageIds) {
    return this.dataSource.fetchWPPages(siteId, pageIds);
  }

  fetchWPPost(siteId, postId) {
    return this.dataSource.fetchWPPost(siteId, postId);
  }

  fetchWPPosts(siteId, postIds) {
    return this.dataSource.fetchWPPosts(siteId, postIds);
  }

  findWPPosts(siteId, criteria) {
    return this.dataSource.findWPPosts(siteId, criteria);
  }

  fetchWPTag(siteId, tagId) {
    return this.dataSource.fetchWPTag(siteId, tagId);
  }

  fetchWPTags(siteId, tagIds) {
    return this.dataSource.fetchWPTags(siteId, tagIds);
  }

  fetchWPUser(siteId, userId) {
    return this.dataSource.fetchWPUser(siteId, userId);
  }

  fetchWPUsers(siteId, userIds) {
    return this.dataSource.fetchWPUsers(siteId, userIds);
  }

  findWPUsers(siteId, criteria) {
    return this.dataSource.findWPUsers(siteId, criteria);
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
