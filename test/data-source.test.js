import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server, { fetchTestData } from './server/server.js';

import {
  DataSource,
  Excel,
  Gitlab,

  ExcelFile,
  GitlabWiki,
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
  beforeEach(function() {
    configure({ adapter: new Adapter });
  })
  it('should accept extensions', function() {
    const dataSource = new DataSource([ Excel, Gitlab ]);
    expect(dataSource.fetchExcelFile).to.be.a('function');
    expect(dataSource.fetchWikiPage).to.be.a('function');
  })
  describe('#fetchExcelFile', function() {
    it('should retrieve an Excel file', async function() {
      const data = await loadExcelData('test-1');
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const file = await dataSource.fetchExcelFile('test-1');
      expect(file).to.be.an.instanceOf(ExcelFile);
      expect(file.identifier).to.eql(data.identifier);
      expect(file.title).to.eql(data.title);
      expect(file.description).to.eql(data.description);
      expect(file.keywords).to.eql(data.keywords);
      expect(file.sheets).to.have.lengthOf(data.sheets.length);
    })
    it('should return the same object when queries are the same', async function() {
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const file1 = await dataSource.fetchExcelFile('test-1');
      const file2 = await dataSource.fetchExcelFile('test-1');
      expect(file1).to.equal(file2);
    })
  })
  describe('#fetchExcelFiles', function() {
    it('should fetch multiple files', async function() {
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const files = await dataSource.fetchExcelFiles();
      expect(files).to.have.lengthOf(2);
      expect(files[0]).to.be.instanceOf(ExcelFile);
      expect(files[1]).to.be.instanceOf(ExcelFile);
    })
    it('should return the same object as fetchExcelFile()', async function() {
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Excel ], options);
      dataSource.activate();
      const file = await dataSource.fetchExcelFile('test-1');
      const files = await dataSource.fetchExcelFiles();
      expect(files[0]).to.equal(file);
    })
  })
  describe('#fetchWikiPage', function() {
    it('should retrieve a wiki page', async function() {
      const data = await loadWikiData('repo1', 'test-1');
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const page = await dataSource.fetchWikiPage('repo1', 'test-1');
      expect(page).to.be.an.instanceOf(GitlabWiki);
      expect(page.slug).to.eql(data.slug);
      expect(page.title).to.eql(data.title);
    })
    it('should return the same object when queries are the same', async function() {
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const page1 = await dataSource.fetchWikiPage('repo1', 'test-3');
      const page2 = await dataSource.fetchWikiPage('repo1', 'test-3');
      expect(page1).to.equal(page2);
    })
  })
  describe('#fetchWikiPages', function() {
    it('should fetch multiple pages', async function() {
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const pages = await dataSource.fetchWikiPages();
      expect(pages).to.have.lengthOf(3);
      expect(pages[0]).to.be.instanceOf(GitlabWiki);
      expect(pages[1]).to.be.instanceOf(GitlabWiki);
      expect(pages[2]).to.be.instanceOf(GitlabWiki);
    })
    it('should fetch pages from specified repo', async function() {
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const pages = await dataSource.fetchWikiPages('repo2');
      expect(pages).to.have.lengthOf(1);
      expect(pages[0]).to.be.have.property('slug', 'test-2');
    })
    it('should return the same object as fetchWikiPage()', async function() {
      const options = {
        baseURL: serverAddress
      };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const page = await dataSource.fetchWikiPage('repo1', 'test-1');
      const pages = await dataSource.fetchWikiPages('repo1');
      expect(pages[0]).to.equal(page);
    })
  })
})

async function loadExcelData(identifier) {
  return fetchTestData(`${serverAddress}/data/excel/${identifier}`);
}

async function loadWikiData(identifier, slug) {
  return fetchTestData(`${serverAddress}/data/wiki/${identifier}/${slug}`);
}
