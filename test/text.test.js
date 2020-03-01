import { renderToStaticMarkup } from 'react-dom/server';
import { expect } from 'chai';
import { Parser, JSONRenderer } from 'mark-gor';

import {
  Text,
} from '../index.mjs';

function parseHTML(html) {
  const parser = new Parser({ htmlOnly: true });
  const renderer = new JSONRenderer;
  const tokens = parser.parse(html);
  const json = renderer.render(tokens);
  return json;
}

function parseMarkdown(markdown) {
  const parser = new Parser;
  const renderer = new JSONRenderer;
  const tokens = parser.parse(markdown);
  const json = renderer.render(tokens);
  return json;
}

describe('Text', function() {
  describe('#getPlainText()', function() {
    it('should correct handle inline elements', function() {
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
    it('should separate paragraphs with two newlines', function() {
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
    it('should place additional newline behind heading', function() {
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
    it('should not add newline when there is one already', function() {
      const html = `
<div><p>Hello</p></div><p>World</p>
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
    it('should correctly format unordered list', function() {
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
    it('should correctly format ordered list', function() {
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
    it('should correctly format ordered list (with start)', function() {
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
    it('should separate lists with extra linefeed', function() {
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
    it('should correctly handle code section', function() {
      const markdown = `
A standard-conforming "hello, world" program is:

\`\`\`C
#include <stdio.h>

int main(void)
{
    printf("hello, world\n");
}
\`\`\`

The first line of the program contains a preprocessing directive, indicated by \`#include\`. This causes the compiler to replace that line with the entire text of the *stdio.h* standard header, which contains declarations for standard input and output functions such as \`printf\` and \`scanf\`. The angle brackets surrounding *stdio.h* indicate that *stdio.h* is located using a search strategy that prefers headers provided with the compiler to other headers having the same name, as opposed to double quotes which typically include local or project-specific header files.
      `.trim();
      const json = parseMarkdown(markdown);
      const object = new Text({ json });
      const text = object.getPlainText();
      const expected = `
A standard-conforming "hello, world" program is:

#include <stdio.h>

int main(void)
{
    printf("hello, world\n");
}

The first line of the program contains a preprocessing directive, indicated by #include. This causes the compiler to replace that line with the entire text of the stdio.h standard header, which contains declarations for standard input and output functions such as printf and scanf. The angle brackets surrounding stdio.h indicate that stdio.h is located using a search strategy that prefers headers provided with the compiler to other headers having the same name, as opposed to double quotes which typically include local or project-specific header files.
      `.trim();
      expect(text).to.equal(expected);
    })
  })
  describe('#getRichText()', function() {
    it('should correctly handle inline elements', function() {
      const html = `
<div>Hello, <span style="font-family:Arial">world</span>!</div>
      `.trim();
      const json = parseHTML(html);
      const object = new Text({ json });
      const element = object.getRichText();
      const result = renderToStaticMarkup(element);
      expect(result).to.equal(html);
    })
    it('should apply image settings', function() {
      const html = `
<h1>Image</h1><p><img src="hello.png" alt="Hello"></p>
      `.trim();
      const json = parseHTML(html);
      const resources = [
        {
          type: 'image',
          src: 'hello.png',
          url: '/media/images/69b1510906ccacbb9363690cbb4bd257/',
          width: 500,
          height: 300,
        }
      ];
      const object = new Text({ json, resources });
      const options = {
        imageWidth: 50,
        imageHeight: 50,
        imageFormat: 'jpeg',
        imageFilters: { sharpen: true },
        devicePixelRatio: 2,
      };
      const element = object.getRichText(options);
      const result = renderToStaticMarkup(element);
      const expected = `
<h1>Image</h1><p><img src="/media/images/69b1510906ccacbb9363690cbb4bd257/cr100_0_300_300-re100_100-sh.jpg" alt="Hello" width="50" height="50"/></p>
      `.trim();
      expect(result).to.equal(expected);
    })
    it('should correctly handle code section', function() {
      const markdown = `
A standard-conforming "hello, world" program is:

\`\`\`C
#include <stdio.h>

int main(void)
{
    printf("hello, world\n");
}
\`\`\`

The first line of the program contains a preprocessing directive, indicated by \`#include\`. This causes the compiler to replace that line with the entire text of the *stdio.h* standard header, which contains declarations for standard input and output functions such as \`printf\` and \`scanf\`. The angle brackets surrounding *stdio.h* indicate that *stdio.h* is located using a search strategy that prefers headers provided with the compiler to other headers having the same name, as opposed to double quotes which typically include local or project-specific header files.
      `.trim();
      const json = parseMarkdown(markdown);
      const object = new Text({ json });
      const element = object.getRichText();
      const result = renderToStaticMarkup(element);
      const expected = `
<p>A standard-conforming &quot;hello, world&quot; program is:</p>
<pre><code class="language-C">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf(&quot;hello, world\n&quot;);\n}</code></pre>
<p>The first line of the program contains a preprocessing directive, indicated by <code>#include</code>. This causes the compiler to replace that line with the entire text of the <em>stdio.h</em> standard header, which contains declarations for standard input and output functions such as <code>printf</code> and <code>scanf</code>. The angle brackets surrounding <em>stdio.h</em> indicate that <em>stdio.h</em> is located using a search strategy that prefers headers provided with the compiler to other headers having the same name, as opposed to double quotes which typically include local or project-specific header files.</p>
      `.trim().replace(/>\s+</g, '><');
      expect(result).to.equal(expected);
    })
  })
  describe('#getDictionary()', function() {
    it('should return dictionary containing plain text by default', function() {
      const html = `
<p>Some text</p>
<h1>hello</h1>
<p>This is a <b>test</b></p>
<h1>world</h1>
<p>This is <u>another</u> test</p>
      `;
      const json = parseHTML(html);
      const object = new Text({ json });
      const dict = object.getDictionary();
      expect(dict).to.eql({
        hello: 'This is a test',
        world: 'This is another test'
      });
    })
    it('should return rich text when option is specified', function() {
      const html = `
<p>Some text</p>
<h1>hello</h1>
<p>This is a <b>test</b></p>
<h1>world</h1>
<p>This is <u>another</u> test</p>
      `;
      const json = parseHTML(html);
      const object = new Text({ json });
      const dict = object.getDictionary({ richText: true });
      const result1 = renderToStaticMarkup(dict.hello);
      const result2 = renderToStaticMarkup(dict.world);
      expect(result1).to.eql('This is a <b>test</b>');
      expect(result2).to.eql('This is <u>another</u> test');
    })
    it('should keep <p> container when section has multiple paragraphs', function() {
      const html = `
<p>Some text</p>
<h1>hello</h1>
<p>This is a <b>test</b></p>
<h1>world</h1>
<p>This is <u>another</u> test</p>
<p>More...</p>
      `;
      const json = parseHTML(html);
      const object = new Text({ json });
      const dict = object.getDictionary({ richText: true });
      const result1 = renderToStaticMarkup(dict.hello);
      const result2 = renderToStaticMarkup(dict.world);
      expect(result1).to.eql('This is a <b>test</b>');
      expect(result2).to.eql('<p>This is <u>another</u> test</p>\n<p>More...</p>');
    })
    it('should ignore blockquote by default', function() {
      const html = `
<p>Some text</p>
<h1>hello</h1>
<p>This is a <b>test</b></p>
<h1>world</h1>
<p>This is <u>another</u> test</p>
<blockquote>Some comments</blockquote>
      `;
      const json = parseHTML(html);
      const object = new Text({ json });
      const dict = object.getDictionary();
      expect(dict).to.eql({
        hello: 'This is a test',
        world: 'This is another test'
      });
    })
    it('should include text in blockquote when option is specified', function() {
      const html = `
<p>Some text</p>
<h1>hello</h1>
<p>This is a <b>test</b></p>
<h1>world</h1>
<p>This is <u>another</u> test</p>
<blockquote>Some comments</blockquote>
      `;
      const json = parseHTML(html);
      const object = new Text({ json });
      const dict = object.getDictionary({ blockQuote: true });
      expect(dict).to.eql({
        hello: 'This is a test',
        world: 'This is another test\n\nSome comments'
      });
    })
  })
  describe('#getImage()', function() {
    it('should return an resource object with the matching URL', function() {
      const html = `
<h1>Image</h1>
<p><img src="hello.png" alt="Hello"></p>
      `;
      const json = parseHTML(html);
      const resources = [
        {
          type: 'image',
          src: 'hello.png',
          url: '/media/images/69b1510906ccacbb9363690cbb4bd257/',
          width: 50,
          height: 30,
        }
      ];
      const object = new Text({ json, resources });
      const image = object.getImage('hello.png');
      expect(image).to.not.be.null;
    })
    it('should return undefined when there is no match for URL', function() {
      const html = `
<h1>Image</h1>
<p><img src="hello.png" alt="Hello"></p>
      `;
      const json = parseHTML(html);
      const resources = [
        {
          type: 'image',
          src: 'hello.png',
          url: '/media/images/69b1510906ccacbb9363690cbb4bd257/',
          width: 50,
          height: 30,
        }
      ];
      const object = new Text({ json, resources });
      const image = object.getImage('world.png');
      expect(image).to.be.undefined;
    })
  })
  describe('#getLanguageSpecificSections()', function() {
    it('should separate text by language, marking the ones matching the given language code', function() {
      const markdown = `
# My Dear Dingo Donuts

# (pl)

Odwiedź nas w naszym sklepie w Krakowie

# (en-US)

Visit our store in New York.

# (en-GB)

Visit our store in London.

# (zz)

Copyright
      `.trim();
      const json = parseMarkdown(markdown);
      const object = new Text({ json });
      const sections = object.getLanguageSpecificSections('en-us');
      expect(sections).to.have.length(5);
      expect(sections[0].languages).to.be.undefined;
      expect(sections[0].content.getPlainText()).to.equal('My Dear Dingo Donuts')
      expect(sections[2].languages).to.eql([ 'en-us' ]);
      expect(sections[2].content.getPlainText()).to.equal('Visit our store in New York.')
      expect(sections[0].match).to.be.true;
      expect(sections[1].match).to.be.false;
      expect(sections[2].match).to.be.true;
      expect(sections[3].match).to.be.false;
      expect(sections[4].match).to.be.true;
    })
  })
})
