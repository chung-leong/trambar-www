import { renderToStaticMarkup } from 'react-dom/server';
import { expect } from 'chai';
import Server, { fetchTestData } from './server/server.js';

import {
  GitlabWiki,
} from '../src/index.mjs';

const serverPort = 7111;
const serverAddress = `http://localhost:${serverPort}`;

describe('Gitlab', function() {
  before(function() {
    return Server.start(serverPort);
  })
  after(function() {
    return Server.stop();
  })
  it('should be able to retrieve test data', async function() {
    const data = await loadTestData([ 'repo2', 'test-2' ]);
    expect(data.slug).to.equal('test-2');
    expect(data.title.json).to.be.instanceOf(Array);
    expect(data.content.json).to.be.instanceOf(Array);
    expect(data.content.resources).to.be.instanceOf(Array);
  })
  describe('GitlabWiki', function() {
    it('should include metadata from file', async function() {
      const page = await loadTestPage([ 'repo1', 'test-1' ]);
      expect(page.slug).to.equal('test-1');
      expect(page.title + '').to.equal('Test 1');
    })
    it('should have the right plain text content', async function() {
        const page = await loadTestPage([ 'repo2', 'test-2' ]);
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
      `.trim();
      expect(text).to.equal(expected);
    })
    it('should have the right HTML content', async function() {
      const page = await loadTestPage([ 'repo2', 'test-2' ]);
      const fragment = page.content.getRichText();
      const html = renderToStaticMarkup(fragment);
      const expected = `
<h1 id="hello">Hello</h1>
<h2 id="world">World</h2>
<p>This is a test and this is only a test.</p>
<p>Look at this picture: <img src="/srv/media/images/7762c77f10818cc748253f0aeeb883a5/" alt="internal image" width="550" height="540"/>.</p>
<p>Look at this one too: <img src="/srv/media/images/4245748bde70ff10dc497d1ef59f0a25/" alt="external image" width="500" height="520"/></p>
<ul>
  <li><a href="home">Internal link</a></li>
  <li>Another <a href="elsewhere">internal link</a></li>
  <li><a href="http://www.bbc.co.uk">External link</a></li>
</ul>
      `.trim().replace(/>\s+</g, '><');
      expect(html).to.equal(expected);
    })
    it('should handle text in multiple languages', async function() {
      const page = await loadTestPage([ 'repo1', 'test-1' ]);
      const pageGB = page.getLanguageSpecific('en-gb');
      const textGB = pageGB.content.getPlainText();
      expect(textGB).to.contain('Donuts');
      expect(textGB).to.not.contain('New York');
      expect(textGB).to.contain('London');
      expect(textGB).to.not.contain('Sydney');

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
      const page = await loadTestPage([ 'repo1', 'test-1' ]);
      const codes = page.getAvailableLanguages();
      expect(codes).to.eql([ 'pl', 'en-us', 'en-gb', 'en-au' ]);
    });
    it('should yield JSON data embedded in Markdown text', async function() {
      const page = await loadTestPage([ 'repo1', 'test-3' ]);
      const data = page.content.getJSON('Settings');
      expect(data).to.be.an.instanceOf(Object);
    })
    it('should return undefined if JSON is malformed', async function() {
      const page = await loadTestPage([ 'repo1', 'test-3' ]);
      const data = page.content.getJSON('Broken');
      expect(data).to.be.undefined;
    })
    it('should return undefined if the heading cannot be found', async function() {
      const page = await loadTestPage([ 'repo1', 'test-3' ]);
      const data = page.content.getJSON('Non-existing');
      expect(data).to.be.undefined;
    })
  })
})

async function loadTestPage(identifiers) {
  const data = await loadTestData(identifiers);
  const file = new GitlabWiki(identifiers, data);
  return file;
}

async function loadTestData(identifiers) {
  const objectURL = GitlabWiki.getObjectURL(identifiers);
  const fullURL = `${serverAddress}/data/${objectURL}`;
  return fetchTestData(fullURL);
}
