import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server, { fetchTestData } from './server/server.mjs';

import {
  GitlabWiki,
} from '../index.mjs';

configure({ adapter: new Adapter });

const serverPort = 7111;
const serverAddress = `http://localhost:${serverPort}`;

describe('Gitlab', function() {
  before(() => {
    return Server.start(serverPort);
  })
  it('should be able to retrieve test data', async function() {
    const data = await loadTestData('repo2', 'test-2');
    expect(data.slug).to.eql('test-2');
    expect(data.markdown).to.be.a('string');
    expect(data.resources).to.be.instanceOf(Array);
  })
  describe('GitlabWiki', function() {
    it('should include metadata from file', async function() {
      const data = await loadTestData('repo1', 'test-1');
      const page = await loadTestPage('repo1', 'test-1');
      expect(page.slug).to.eql(data.slug);
      expect(page.title).to.eql(data.title);
    })
    describe('#plainText', function() {
      it('should return plain text', async function() {
        const page = await loadTestPage('repo2', 'test-2');
        const text = page.plainText();
        const expected = `
Hello

World

This is a test and this is only a test.

Look at this picture: [internal image].

Look at this one too: [external image]

Internal link
Another internal link
External link
`;
        expect(text.trim()).to.equal(expected.trim());
      })
    })
    describe('#filter', function() {
      it('should filter out other languages', async function() {
        const page = await loadTestPage('repo1', 'test-1');
        const pageUK = page.filter('en-uk');
        const textUK = pageUK.plainText();
        expect(textUK).to.contain('Donuts');
        expect(textUK).to.not.contain('New York');
        expect(textUK).to.contain('London');
        expect(textUK).to.not.contain('Sydney');

        const pageEN = page.filter('en');
        const textEN = pageEN.plainText();
        expect(textEN).to.contain('Donuts');
        expect(textEN).to.contain('New York');
        expect(textEN).to.not.contain('London');
        expect(textEN).to.not.contain('Sydney');

        const pagePL = page.filter('pl-pl');
        const textPL = pagePL.plainText();
        expect(textPL).to.contain('Donuts');
        expect(textPL).to.contain('Krakow');
        expect(textPL).to.not.contain('London');
        expect(textPL).to.not.contain('Sydney');
      })
    })
    describe('#filter', function() {
      it('should extract JSON data embedded in Markdown text', async function() {
        const page = await loadTestPage('repo1', 'test-3');
        const data = page.json('Settings');
        expect(data).to.be.an.instanceOf(Object);
      })
      it('should return undefined if JSON is malformed', async function() {
        const page = await loadTestPage('repo1', 'test-3');
        const data = page.json('Broken');
        expect(data).to.be.undefined;
      })
      it('should return undefined if the heading cannot be found', async function() {
        const page = await loadTestPage('repo1', 'test-3');
        const data = page.json('Non-existing');
        expect(data).to.be.undefined;
      })
    });
  })
  after(() => {
    return Server.stop();
  });
})

let testData = {};

async function loadTestPage(identifier, slug) {
  const data = await loadTestData(identifier, slug);
  const file = new GitlabWiki([ identifier, slug ], data);
  return file;
}

async function loadTestData(identifier, slug) {
  const objectURL = GitlabWiki.getObjectURL([ identifier, slug ]);
  const fullURL = `${serverAddress}/data/${objectURL}`;
  return fetchTestData(fullURL);
}
