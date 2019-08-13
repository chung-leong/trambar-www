import React from 'react';
import { expect } from 'chai';

import {
    parseHTML,
    generateRichTextFromNodes,
    generatePlainTextFromNodes,
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
        it('should omit inline handler', function() {
            const html = `<p onmouseover="alert('Hi!')">This is a test</p>`;
            const nodes = parseHTML(html);
            const fragment = generateRichTextFromNodes(nodes, {});
            const element = fragment.props.children[0];
            expect(element.props).to.not.have.property('onmouseover');
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
    describe('#generatePlainTextFromNodes()', function() {
        it('should normalize whitespaces', function() {
            const html = `<p>This is a test\n\nand this is only a test</p>`;
            const nodes = parseHTML(html);
            const text = generatePlainTextFromNodes(nodes, {});
            expect(text).to.eql('This is a test and this is only a test');
        })
        it ('should trim leading and trailing whitespaces', function() {
            const html = `
                <p>
                    This is a test and this is only a test
                </p>
            `;
            const nodes = parseHTML(html);
            const text = generatePlainTextFromNodes(nodes, {});
            expect(text).to.eql('This is a test and this is only a test');
        })
        it ('should separate block elements with linefeeds', function() {
            const html = `
                <div>This is a test</div>
                <div>and this is only a test</div>
            `;
            const nodes = parseHTML(html);
            const text = generatePlainTextFromNodes(nodes, {});
            expect(text).to.eql('This is a test\nand this is only a test');
        })
        it ('should add extra linefeed between p elements', function() {
            const html = `
                <p>This is a test</p>
                <p>and this is only a test</p>
            `;
            const nodes = parseHTML(html);
            const text = generatePlainTextFromNodes(nodes, {});
            expect(text).to.eql('This is a test\n\nand this is only a test');
        })
        it ('should add asterisk to list items', function() {
            const html = `
                <ul>
                    <li>Item 1
                    <li>Item 2
                    <li>Item 3
                </ul>
            `;
            const nodes = parseHTML(html);
            const text = generatePlainTextFromNodes(nodes, {});
            expect(text).to.eql('* Item 1\n* Item 2\n* Item 3');
        })
        it ('should prefix items in ordered list with number', function() {
            const html = `
                <ol>
                    <li>Item 1
                    <li>Item 2
                    <li>Item 3
                </ol>
            `;
            const nodes = parseHTML(html);
            const text = generatePlainTextFromNodes(nodes, {});
            expect(text).to.eql('1. Item 1\n2. Item 2\n3. Item 3');
        })
    })
})
