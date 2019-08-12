import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server from './server/server.mjs';

import {
    WordpressCategory,
    WordpressMedia,
    WordpressPage,
    WordpressPost,
    WordpressTag,
    WordpressText,
    WordpressUser,
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
    describe('WordpressPage', function() {
        it ('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/pages/141546');
            const page = await loadTestObject('et', 'wp/v2/pages/141546', WordpressPage);

            expect(page.id).to.eql(data.id);
            expect(page.slug).to.eql(data.slug);
            expect(page.status).to.eql(data.status);
            expect(page.type).to.eql(data.type);
            expect(page.link).to.eql(data.link);
            expect(page.author).to.eql(data.author);
            expect(page.featuredMedia).to.eql(data.featured_media);
            expect(page.menuOrder).to.eql(data.menu_order);
            expect(page.parent).to.eql(data.parent);
            expect(page.meta).to.eql(data.meta);
            expect(page.date).to.be.instanceOf(Date);
            expect(page.date.toISOString()).to.contain(data.date_gmt);
            expect(page.modified).to.be.instanceOf(Date);
            expect(page.modified.toISOString()).to.contain(data.modified_gmt);
            expect(page.title).to.be.instanceOf(WordpressText);
            expect(page.excerpt).to.be.instanceOf(WordpressText);
            expect(page.content).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressUser', function() {
        it ('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/users/762');
            const user = await loadTestObject('et', 'wp/v2/users/762', WordpressUser);

            expect(user.id).to.eql(data.id);
            expect(user.slug).to.eql(data.slug);
            expect(user.url).to.eql(data.url);
            expect(user.link).to.eql(data.link);
            expect(user.avatarURLs).to.eql(data.avatar_urls);
            expect(user.meta).to.eql(data.meta);
            expect(user.name).to.be.instanceOf(WordpressText);
            expect(user.description).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressTag', function() {
        it ('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/tags/148');
            const tag = await loadTestObject('et', 'wp/v2/tags/148', WordpressTag);

            expect(tag.id).to.eql(data.id);
            expect(tag.slug).to.eql(data.slug);
            expect(tag.count).to.eql(data.count);
            expect(tag.link).to.eql(data.link);
            expect(tag.meta).to.eql(data.meta);
            expect(tag.taxonomy).to.eql(data.taxonomy);
            expect(tag.name).to.be.instanceOf(WordpressText);
            expect(tag.description).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressCategory', function() {
        it ('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/categories/8');
            const category = await loadTestObject('et', 'wp/v2/categories/8', WordpressCategory);

            expect(category.id).to.eql(data.id);
            expect(category.slug).to.eql(data.slug);
            expect(category.count).to.eql(data.count);
            expect(category.link).to.eql(data.link);
            expect(category.meta).to.eql(data.meta);
            expect(category.taxonomy).to.eql(data.taxonomy);
            expect(category.parent).to.eql(data.parent);
            expect(category.name).to.be.instanceOf(WordpressText);
            expect(category.description).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressMedia', function() {
        it ('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/media/296377');
            const media = await loadTestObject('et', 'wp/v2/media/296377', WordpressMedia);

            expect(media.id).to.eql(data.id);
            expect(media.slug).to.eql(data.slug);
            expect(media.status).to.eql(data.status);
            expect(media.type).to.eql(data.type);
            expect(media.link).to.eql(data.link);
            expect(media.author).to.eql(data.author);
            expect(media.altText).to.eql(data.alt_text);
            expect(media.mediaType).to.eql(data.media_type);
            expect(media.mimeType).to.eql(data.mime_type);
            expect(media.mediaDetails).to.eql(data.media_details);
            expect(media.post).to.eql(data.post);
            expect(media.sourceURL).to.eql(data.source_url);
            expect(media.meta).to.eql(data.meta);
            expect(media.date).to.be.instanceOf(Date);
            expect(media.date.toISOString()).to.contain(data.date_gmt);
            expect(media.modified).to.be.instanceOf(Date);
            expect(media.modified.toISOString()).to.contain(data.modified_gmt);
            expect(media.title).to.be.instanceOf(WordpressText);
            expect(media.description).to.be.instanceOf(WordpressText);
            expect(media.caption).to.be.instanceOf(WordpressText);
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
