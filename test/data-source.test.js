import { expect } from 'chai';
import Server, { fetchTestData } from './server/server.js';

import {
  DataSource,
  Excel,
  Gitlab,

  ExcelFile,
  GitlabWiki,
  GitlabRepo,
} from '../src/index.mjs';

const serverPort = 7745;
const serverAddress = `http://localhost:${serverPort}`;

describe('DataSource', function() {
  before(function() {
    return Server.start(serverPort);
  })
  after(function() {
    return Server.stop();
  })
  it('should accept extensions', function() {
    const dataSource = new DataSource([ Excel, Gitlab ]);
    expect(dataSource.fetchExcelFile).to.be.a('function');
    expect(dataSource.fetchWikiPage).to.be.a('function');
  })
  describe('#fetchProjectMeta()', function() {
    it('should retrieve project info', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const meta = await dataSource.fetchProjectMeta();
      const metaEN = meta.getLanguageSpecific('en');
      expect(metaEN.id).to.eql('test');
      expect(metaEN.title + '').to.eql('Test');
      expect(metaEN.description.getPlainText()).to.eql('This is a test');
    })
  })
  describe('#fetchExcelFile()', function() {
    it('should retrieve an Excel file', async function() {
      const data = await fetchTestData(`${serverAddress}/data/excel/test-1`);
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const file = await dataSource.fetchExcelFile('test-1');
      expect(file).to.be.an.instanceOf(ExcelFile);
      expect(file.title).to.eql(data.title);
      expect(file.description).to.eql(data.description);
      expect(file.keywords).to.eql(data.keywords);
      expect(file.sheets).to.have.lengthOf(data.sheets.length);
    })
    it('should return the same object when queries are the same', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const file1 = await dataSource.fetchExcelFile('test-1');
      const file2 = await dataSource.fetchExcelFile('test-1');
      expect(file1).to.equal(file2);
    })
    it('should retrieve default Excel file', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const file = await dataSource.fetchExcelFile();
      expect(file).to.be.an.instanceOf(ExcelFile);
      expect(file.id).to.eql('test-1');
    })
  })
  describe('#findExcelFiles()', function() {
    it('should fetch multiple files', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const files = await dataSource.findExcelFiles();
      expect(files).to.have.lengthOf(3);
      for (let file of files) {
        expect(file).to.be.instanceOf(ExcelFile);
      }
    })
    it('should return the same object as fetchExcelFile()', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const file = await dataSource.fetchExcelFile('test-1');
      const files = await dataSource.findExcelFiles();
      expect(files[0]).to.equal(file);
    })
  })
  describe('#fetchWikiPage()', function() {
    it('should retrieve a wiki page', async function() {
      const data = await fetchTestData(`${serverAddress}/data/repo/repo1/wiki/test-1`);
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const page = await dataSource.fetchWikiPage('test-1', 'repo1');
      expect(page).to.be.an.instanceOf(GitlabWiki);
      expect(page.slug).to.eql(data.slug);
      expect(page.title).to.eql(data.title);
    })
    it('should return the same object when queries are the same', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const page1 = await dataSource.fetchWikiPage('test-3', 'repo1');
      const page2 = await dataSource.fetchWikiPage('test-3', 'repo1');
      expect(page1).to.equal(page2);
    })
  })
  describe('#findWikiPages()', function() {
    it('should fetch multiple pages', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const pages = await dataSource.findWikiPages({}, 'repo1');
      expect(pages).to.have.lengthOf(2);
      expect(pages[0]).to.be.instanceOf(GitlabWiki);
      expect(pages[1]).to.be.instanceOf(GitlabWiki);
    })
    it('should fetch pages from specified repo', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const pages = await dataSource.findWikiPages({}, 'repo2');
      expect(pages).to.have.lengthOf(1);
      expect(pages[0]).to.be.have.property('slug', 'test-2');
    })
    it('should return the same object as fetchWikiPage()', async function() {
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const page = await dataSource.fetchWikiPage('test-1', 'repo1');
      const pages = await dataSource.findWikiPages('repo1');
      expect(pages[0]).to.equal(page);
    })
  })
  describe('#fetchRepo()', function() {
    it('should retrieve information about a repo', async function() {
      const data = await fetchTestData(`${serverAddress}/data/repo/repo1/`);
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const repo = await dataSource.fetchRepo('repo1');
      expect(repo).to.be.an.instanceOf(GitlabRepo);
    })
  })
})
