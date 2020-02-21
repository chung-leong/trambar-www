import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Parser, JSONRenderer } from 'mark-gor';

import {
  Text,
} from '../src/index.mjs';

function parseHTML(html) {
  const parser = new Parser({ htmlOnly: true });
  const renderer = new JSONRenderer;
  const tokens = parser.parse(html);
  const json = renderer.render(tokens);
  return json;
}

describe('Text', function() {
  beforeEach(function() {
    configure({ adapter: new Adapter });
  })
  describe('getPlainText()', function() {
    it ('should correct handle inline elements', function() {
      const html = `
Hello, <b>world</b>!
      `.trim();
      const correct = `
Hello, world!
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const text = object.getPlainText();
      expect(text).to.equal(correct);
    })
    it ('should separate paragraphs with two newlines', function() {
      const html = `
<p>Hello</p><p>World</p>
      `.trim();
      const correct = `
Hello

World
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const text = object.getPlainText();
      expect(text).to.equal(correct);
    })
    it ('should place additional newline behind heading', function() {
      const html = `
<h1>Hello</h1><p>World</p>
      `.trim();
      const correct = `
Hello

World
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const text = object.getPlainText();
      expect(text).to.equal(correct);
    })
    it ('should correctly format unordered list', function() {
      const html = `
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
      `.trim();
      const correct = `
* Item 1
* Item 2
* Item 3
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const text = object.getPlainText();
      expect(text).to.equal(correct);
    })
    it ('should correctly format ordered list', function() {
      const html = `
<ol>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ol>
      `.trim();
      const correct = `
1. Item 1
2. Item 2
3. Item 3
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const text = object.getPlainText();
      expect(text).to.equal(correct);
    })
    it ('should correctly format ordered list (with start)', function() {
      const html = `
<ol start="4">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ol>
      `.trim();
      const correct = `
4. Item 1
5. Item 2
6. Item 3
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const text = object.getPlainText();
      expect(text).to.equal(correct);
    })
    it ('should separate lists with extra linefeed', function() {
      const html = `
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<ol>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ol>
      `.trim();
      const correct = `
* Item 1
* Item 2
* Item 3

1. Item 1
2. Item 2
3. Item 3
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const text = object.getPlainText();
      expect(text).to.equal(correct);
    })
  })
  describe('getRichText()', function() {
    it ('should correct handle inline elements', function() {
      const html = `
<div>Hello, <span style="font-family: Arial;">world</span>!</div>
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const element = object.getRichText();
      const wrapper = mount(element);
      expect(wrapper.html()).to.equal(html);
    })
  });
})
