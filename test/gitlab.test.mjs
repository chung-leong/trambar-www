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
    expect(data.json).to.be.instanceOf(Array);
    expect(data.resources).to.be.instanceOf(Array);
  })
  describe('GitlabWiki', function() {
    it('should include metadata from file', async function() {
      const data = await loadTestData('repo1', 'test-1');
      const page = await loadTestPage('repo1', 'test-1');
      expect(page.slug).to.eql(data.slug);
      expect(page.title).to.eql(data.title);
    })
    it('should have the right plain text content', async function() {
        const page = await loadTestPage('repo2', 'test-2');
        const text = page.content.getPlainText();
        const expected = `
Hello

World

This is a test and this is only a test.

Look at this picture: [internal image].

Look at this one too: [external image]

* Internal link
* Another internal link
* External link
      `;
      expect(text).to.equal(expected.trim());
    })
    it('should have the right HTML content', async function() {
      const page = await loadTestPage('repo2', 'test-2');
      const fragment = page.content.getRichText();
      const wrapper = mount(<div>{fragment}</div>);
      const html = wrapper.html();
      const expected = `
<div>
  <h1 id="hello">Hello</h1>
  <h2 id="world">World</h2>
  <p>This is a test and this is only a test.</p>
  <p>Look at this picture: <img src="/srv/media/1234567890" alt="internal image">.</p>
  <p>Look at this one too: <img src="https://via.placeholder.com/350x150" alt="external image"></p>
  <ul>
    <li><a href="home">Internal link</a></li>
    <li>Another <a href="elsewhere">internal link</a></li>
    <li><a href="http://www.bbc.co.uk">External link</a></li>
  </ul>
</div>
      `;
      expect(html).to.equal(expected.trim().replace(/>\s+</g, '><'));
    })
    it('should handle text in multiple languages', async function() {
      const page = await loadTestPage('repo1', 'test-1');
      const pageUK = page.getLanguageSpecific('en-uk');
      const textUK = pageUK.content.getPlainText();
      expect(textUK).to.contain('Donuts');
      expect(textUK).to.not.contain('New York');
      expect(textUK).to.contain('London');
      expect(textUK).to.not.contain('Sydney');

      const pageEN = page.getLanguageSpecific('en');
      const textEN = pageEN.content.getPlainText();
      expect(textEN).to.contain('Donuts');
      expect(textEN).to.contain('New York');
      expect(textEN).to.not.contain('London');
      expect(textEN).to.not.contain('Sydney');

      const pagePL = page.getLanguageSpecific('pl-pl');
      const textPL = pagePL.content.getPlainText();
      expect(textPL).to.contain('Donuts');
      expect(textPL).to.contain('Krakow');
      expect(textPL).to.not.contain('London');
      expect(textPL).to.not.contain('Sydney');
    })
    it('should return a list of available languages', async function() {
      const page = await loadTestPage('repo1', 'test-1');
      const codes = page.getAvailableLanguages();
      expect(codes).to.eql([ 'pl', 'en-us', 'en-uk', 'en-au' ]);
    });
    it('should yield JSON data embedded in Markdown text', async function() {
      const page = await loadTestPage('repo1', 'test-3');
      const data = page.content.getJSON('Settings');
      expect(data).to.be.an.instanceOf(Object);
    })
    it('should return undefined if JSON is malformed', async function() {
      const page = await loadTestPage('repo1', 'test-3');
      const data = page.content.getJSON('Broken');
      expect(data).to.be.undefined;
    })
    it('should return undefined if the heading cannot be found', async function() {
      const page = await loadTestPage('repo1', 'test-3');
      const data = page.content.getJSON('Non-existing');
      expect(data).to.be.undefined;
    })
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
