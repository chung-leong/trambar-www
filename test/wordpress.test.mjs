import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server from './server/server.mjs';

import {
    WordpressPost,
    WordpressText,
} from '../index.mjs';

configure({ adapter: new Adapter });

const serverPort = 8711;
const serverAddress = `http://localhost:${serverPort}`;

describe('Wordpress', function() {
    before(() => {
        return Server.start(serverPort);
    })
    it ('should be able to retrieve test post', async function() {
        const data = await loadTestData('et', 'wp/v2/posts/296375');
        expect(data.link).to.eql('https://www.extremetech.com/extreme/296375-curiosity-spots-unexpectedly-complex-martian-rock');
        expect(data.title).to.eql({
            rendered: 'Curiosity Spots Unexpectedly Complex Martian Rock'
        });
    })
    it ('should be able to retrieve test post list', async function() {
        const data = await loadTestData('et', 'wp/v2/posts');
        expect(data).to.eql([
            296375,
            296399,
            296424,
            296453,
        ]);
    })
    describe('WordpressPost', function() {
        it ('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/posts/296375');
            const post = await loadTestObject('et', 'wp/v2/posts/296375', WordpressPost);

            expect(post.slug).to.eql(data.slug);
            expect(post.status).to.eql(data.status);
            expect(post.type).to.eql(data.type);
            expect(post.link).to.eql(data.link);
            expect(post.author).to.eql(data.author);
            expect(post.featuredMedia).to.eql(data.featured_media);
            expect(post.sticky).to.eql(data.sticky);
            expect(post.format).to.eql(data.format);
            expect(post.meta).to.eql(data.meta);
            expect(post.categories).to.eql(data.categories);
            expect(post.tags).to.eql(data.tags);
            expect(post.date).to.be.instanceOf(Date);
            expect(post.date.toISOString()).to.contain(data.date_gmt);
            expect(post.modified).to.be.instanceOf(Date);
            expect(post.modified.toISOString()).to.contain(data.modified_gmt);
            expect(post.title).to.be.instanceOf(WordpressText);
            expect(post.excerpt).to.be.instanceOf(WordpressText);
            expect(post.content).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressText', function() {
        describe('#plainText()', function() {
            it ('should strip off tags and decode HTML entities', async function() {
                const post = await loadTestObject('et', 'wp/v2/posts/296453', WordpressPost);
                const text = post.excerpt.plainText();
                expect(text).to.eql('AMD is on the cusp of its second golden age. It’s about time. ')
            })
        })
    })
    after(() => {
        return Server.stop();
    })
});

let testData = {};

async function loadTestObject(name, path, ObjectClass) {
    const data = await loadTestData(name, path);
    const file = ObjectClass.create(data);
    return file;
}

async function loadTestData(name, path) {
    let data = testData[`${name}/${path}`];
    if (!data) {
        const res = await fetch(`${serverAddress}/rest/${name}/${path}`);
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        data = testData[`${name}/${path}`] = await res.json();
    }
    return data;
}
