import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server, { fetchTestData } from './server/server.mjs';

import {
    WordpressCategory,
    WordpressMedia,
    WordpressPage,
    WordpressPost,
    WordpressSite,
    WordpressTag,
    WordpressText,
    WordpressUser,
} from '../index.mjs';

import {
    WordPressCategory,
    WordPressMedia,
    WordPressPage,
    WordPressPost,
    WordPressSite,
    WordPressTag,
    WordPressText,
    WordPressUser,
} from '../index.mjs';

configure({ adapter: new Adapter });

const serverPort = 8711;
const serverAddress = `http://localhost:${serverPort}`;

describe('Wordpress', function() {
    before(() => {
        return Server.start(serverPort);
    })
    it('should export classes under name variants', function() {
        expect(WordPressCategory).to.be.a('function');
        expect(WordPressMedia).to.be.a('function');
        expect(WordPressPage).to.be.a('function');
        expect(WordPressPost).to.be.a('function');
        expect(WordPressSite).to.be.a('function');
        expect(WordPressTag).to.be.a('function');
        expect(WordPressText).to.be.a('function');
        expect(WordPressUser).to.be.a('function');
    })
    it('should be able to retrieve site info', async function() {
        const data = await loadTestData('et', '');
        expect(data.rest.url).to.eql('https://www.extremetech.com');
        expect(data.rest.name).to.eql('ExtremeTech');
    })
    it('should be able to retrieve test post', async function() {
        const data = await loadTestData('et', 'wp/v2/posts/296375');
        expect(data.rest.link).to.eql('https://www.extremetech.com/extreme/296375-curiosity-spots-unexpectedly-complex-martian-rock');
        expect(data.rest.title).to.eql({
            rendered: 'Curiosity Spots Unexpectedly Complex Martian Rock'
        });
    })
    it('should be able to retrieve test post list', async function() {
        const data = await loadTestData('et', 'wp/v2/posts');
        expect(data).to.eql([
            296375,
            296399,
            296424,
            296453,
        ]);
    })
    describe('WordpressSite', function() {
        it('should have the right properties', async function() {
            const data = await loadTestData('et', '');
            const category = await loadTestObject('et', '', WordpressSite);

            expect(category.identifier).to.eql('et');
            expect(category.url).to.eql(data.rest.url);
            expect(category.home).to.eql(data.rest.home);
            expect(category.gmtOffset).to.eql(data.rest.gmt_offset);
            expect(category.timezone).to.eql(data.rest.timezone_string);
            expect(category.name).to.be.instanceOf(WordpressText);
            expect(category.description).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressPost', function() {
        it('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/posts/296375');
            const post = await loadTestObject('et', 'wp/v2/posts/296375', WordpressPost);

            expect(post.slug).to.eql(data.rest.slug);
            expect(post.status).to.eql(data.rest.status);
            expect(post.type).to.eql(data.rest.type);
            expect(post.link).to.eql(data.rest.link);
            expect(post.author).to.eql(data.rest.author);
            expect(post.featuredMedia).to.eql(data.rest.featured_media);
            expect(post.sticky).to.eql(data.rest.sticky);
            expect(post.format).to.eql(data.rest.format);
            expect(post.meta).to.eql(data.rest.meta);
            expect(post.categories).to.eql(data.rest.categories);
            expect(post.tags).to.eql(data.rest.tags);
            expect(post.date).to.be.instanceOf(Date);
            expect(post.date.toISOString()).to.contain(data.rest.date_gmt);
            expect(post.modified).to.be.instanceOf(Date);
            expect(post.modified.toISOString()).to.contain(data.rest.modified_gmt);
            expect(post.title).to.be.instanceOf(WordpressText);
            expect(post.excerpt).to.be.instanceOf(WordpressText);
            expect(post.content).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressPage', function() {
        it('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/pages/141546');
            const page = await loadTestObject('et', 'wp/v2/pages/141546', WordpressPage);

            expect(page.id).to.eql(data.rest.id);
            expect(page.slug).to.eql(data.rest.slug);
            expect(page.status).to.eql(data.rest.status);
            expect(page.type).to.eql(data.rest.type);
            expect(page.link).to.eql(data.rest.link);
            expect(page.author).to.eql(data.rest.author);
            expect(page.featuredMedia).to.eql(data.rest.featured_media);
            expect(page.menuOrder).to.eql(data.rest.menu_order);
            expect(page.parent).to.eql(data.rest.parent);
            expect(page.meta).to.eql(data.rest.meta);
            expect(page.date).to.be.instanceOf(Date);
            expect(page.date.toISOString()).to.contain(data.rest.date_gmt);
            expect(page.modified).to.be.instanceOf(Date);
            expect(page.modified.toISOString()).to.contain(data.rest.modified_gmt);
            expect(page.title).to.be.instanceOf(WordpressText);
            expect(page.excerpt).to.be.instanceOf(WordpressText);
            expect(page.content).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressUser', function() {
        it('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/users/762');
            const user = await loadTestObject('et', 'wp/v2/users/762', WordpressUser);

            expect(user.id).to.eql(data.rest.id);
            expect(user.slug).to.eql(data.rest.slug);
            expect(user.url).to.eql(data.rest.url);
            expect(user.link).to.eql(data.rest.link);
            expect(user.avatarURLs).to.eql(data.rest.avatar_urls);
            expect(user.meta).to.eql(data.rest.meta);
            expect(user.name).to.be.instanceOf(WordpressText);
            expect(user.description).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressTag', function() {
        it('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/tags/148');
            const tag = await loadTestObject('et', 'wp/v2/tags/148', WordpressTag);

            expect(tag.id).to.eql(data.rest.id);
            expect(tag.slug).to.eql(data.rest.slug);
            expect(tag.count).to.eql(data.rest.count);
            expect(tag.link).to.eql(data.rest.link);
            expect(tag.meta).to.eql(data.rest.meta);
            expect(tag.taxonomy).to.eql(data.rest.taxonomy);
            expect(tag.name).to.be.instanceOf(WordpressText);
            expect(tag.description).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressCategory', function() {
        it('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/categories/8');
            const category = await loadTestObject('et', 'wp/v2/categories/8', WordpressCategory);

            expect(category.id).to.eql(data.rest.id);
            expect(category.slug).to.eql(data.rest.slug);
            expect(category.count).to.eql(data.rest.count);
            expect(category.link).to.eql(data.rest.link);
            expect(category.meta).to.eql(data.rest.meta);
            expect(category.taxonomy).to.eql(data.rest.taxonomy);
            expect(category.parent).to.eql(data.rest.parent);
            expect(category.name).to.be.instanceOf(WordpressText);
            expect(category.description).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressMedia', function() {
        it('should have the right properties', async function() {
            const data = await loadTestData('et', 'wp/v2/media/296377');
            const media = await loadTestObject('et', 'wp/v2/media/296377', WordpressMedia);

            expect(media.id).to.eql(data.rest.id);
            expect(media.slug).to.eql(data.rest.slug);
            expect(media.status).to.eql(data.rest.status);
            expect(media.type).to.eql(data.rest.type);
            expect(media.link).to.eql(data.rest.link);
            expect(media.author).to.eql(data.rest.author);
            expect(media.altText).to.eql(data.rest.alt_text);
            expect(media.mediaType).to.eql(data.rest.media_type);
            expect(media.mimeType).to.eql(data.rest.mime_type);
            expect(media.mediaDetails).to.eql(data.rest.media_details);
            expect(media.post).to.eql(data.rest.post);
            expect(media.sourceURL).to.eql(data.rest.source_url);
            expect(media.meta).to.eql(data.rest.meta);
            expect(media.date).to.be.instanceOf(Date);
            expect(media.date.toISOString()).to.contain(data.rest.date_gmt);
            expect(media.modified).to.be.instanceOf(Date);
            expect(media.modified.toISOString()).to.contain(data.rest.modified_gmt);
            expect(media.title).to.be.instanceOf(WordpressText);
            expect(media.description).to.be.instanceOf(WordpressText);
            expect(media.caption).to.be.instanceOf(WordpressText);
        })
    })
    describe('WordpressText', function() {
        describe('#plainText()', function() {
            it('should strip off tags and decode HTML entities', async function() {
                const post = await loadTestObject('et', 'wp/v2/posts/296453', WordpressPost);
                const text = post.excerpt.plainText();
                expect(text).to.eql('AMD is on the cusp of its second golden age. It’s about time.')
            })
        })
    })
    after(() => {
        return Server.stop();
    })
});

let testData = {};

async function loadTestObject(identifier, path, ObjectClass) {
    const data = await loadTestData(identifier, path);
    const file = ObjectClass.create(data);
    return file;
}

async function loadTestData(identifier, path) {
    let url = `${serverAddress}/data/rest/${identifier}`;
    if (path) {
        url += `/${path}`;
    }
    return fetchTestData(url);
}
