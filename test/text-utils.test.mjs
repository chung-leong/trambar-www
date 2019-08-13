import React from 'react';
import { expect } from 'chai';

import {
    parseHTML,
    generateRichTextFromNodes,
} from '../src/utils/text-utils.mjs';

describe('Text utils', function() {
    describe('#parseHTML()', function() {
        it('should parse a basic HTML string', function() {
            const html = `<p>This is a test</p>`;
            const nodes = parseHTML(html);
            expect(nodes).to.be.an('array');
            const node = nodes[0];
            expect(node).to.have.property('type', 'tag');
            expect(node).to.have.property('name', 'p');
            const textNode = node.children[0];
            expect(textNode).to.have.property('type', 'text');
            expect(textNode).to.have.property('data', 'This is a test');
        })
        it('should decode HTML entities', function() {
            const html = `<p>&amp; &gt; &#33;</p>`;
            const [ node ] = parseHTML(html);
            const textNode = node.children[0];
            expect(textNode).to.have.property('data', '& > !');
        })
        it('should handle boolean attributes', function() {
            const html = `<input disabled readonly />`;
            const [ node ] = parseHTML(html);
            expect(node.attribs).to.have.property('disabled', '');
            expect(node.attribs).to.have.property('readonly', '');
        })
    })
    describe('#generateRichTextFromNodes()', function() {
        it('should return a React fragment', function() {
            const html = `<p>This is a test</p>`;
            const nodes = parseHTML(html);
            const fragment = generateRichTextFromNodes(nodes, {});
            expect(fragment.type).to.equal(React.Fragment);
        })
        it('should generate proper name for class, tabindex, and readonly attribute', function() {
            const html = `<p class="test" readonly tabindex="5">This is a test</p>`;
            const nodes = parseHTML(html);
            const fragment = generateRichTextFromNodes(nodes, {});
            const element = fragment.props.children[0];
            expect(element.type).to.equal('p');
            expect(element.props).to.have.property('className', 'test');
            expect(element.props).to.have.property('readOnly', true);
            expect(element.props).to.have.property('tabIndex', 5);
        })
        it('should handle inline style', function() {
            const html = `<p style="font-family: Arial ; FONT-SIZE:16pt">This is a test</p>`;
            const nodes = parseHTML(html);
            const fragment = generateRichTextFromNodes(nodes, {});
            const element = fragment.props.children[0];
            expect(element.props.style).to.have.property('fontFamily', 'Arial');
            expect(element.props.style).to.have.property('fontSize', '16pt');
        })
        it('should correctly handle vendor prefixes', function() {
            const style = `
                -webkit-animation-name: slidein;
                -ms-animation-name: slidein;
                -moz-animation-name: slidein;
            `;
            const html = `<p style="${style}">This is a test</p>`;
            const nodes = parseHTML(html);
            const fragment = generateRichTextFromNodes(nodes, {});
            const element = fragment.props.children[0];
            expect(element.props.style).to.have.property('WebkitAnimationName', 'slidein');
            expect(element.props.style).to.have.property('MozAnimationName', 'slidein');
            expect(element.props.style).to.have.property('msAnimationName', 'slidein');
        })
    })
})
