import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server, { fetchTestData } from './server/server.js';

import {
  WordpressCategory,
  WordpressMedia,
  WordpressPage,
  WordpressPost,
  WordpressSite,
  WordpressTag,
  WordpressUser,
} from '../src/index.mjs';

const serverPort = 8711;
const serverAddress = `http://localhost:${serverPort}`;

describe('Wordpress', function() {
  before(function() {
    return Server.start(serverPort);
  })
  after(function() {
    return Server.stop();
  })
  beforeEach(function() {
    configure({ adapter: new Adapter });
  })
  it('should be able to retrieve site info', async function() {
    const data = await fetchTestData(`${serverAddress}/data/rest/et/`);
    expect(data.url).to.eql('https://www.extremetech.com');
    expect(data.name.json).to.eql([ 'ExtremeTech' ]);
  })
  it('should be able to retrieve test post', async function() {
    const data = await fetchTestData(`${serverAddress}/data/rest/et/wp/v2/posts/296375/`);
    expect(data.link).to.eql('https://www.extremetech.com/extreme/296375-curiosity-spots-unexpectedly-complex-martian-rock');
    expect(data.title.json).to.eql([ 'Curiosity Spots Unexpectedly Complex Martian Rock' ]);
  })
  it('should be able to retrieve test post list', async function() {
    const data = await fetchTestData(`${serverAddress}/data/rest/et/wp/v2/posts/`);
    expect(data).to.eql([
      296375,
      296399,
      296424,
      296453,
    ]);
  })
  describe('WordpressSite', function() {
    it('should have the right properties', async function() {
      const site = await loadTestObject([ 'et' ], WordpressSite);

      expect(site.siteId).to.eql('et');
      expect(site.url).to.eql('https://www.extremetech.com');
      expect(site.home).to.eql('https://www.extremetech.com');
      expect(site.gmtOffset).to.eql(-5);
      expect(site.timezone).to.eql('America/New_York');
      expect(site.name.getPlainText()).to.be.eq('ExtremeTech');
      expect(site.description.getPlainText()).to.be.eq(`
ExtremeTech is the Web's top destination for news and analysis of emerging science and technology trends, and important software, hardware, and gadgets.
      `.trim());
    })
  })
  describe('WordpressPost', function() {
    it('should have the right properties', async function() {
      const post = await loadTestObject([ 'et', 296375 ], WordpressPost);

      expect(post.id).to.eql(296375);
      expect(post.slug).to.eql('curiosity-spots-unexpectedly-complex-martian-rock');
      expect(post.status).to.eql('publish');
      expect(post.type).to.eql('post');
      expect(post.link).to.eql('https://www.extremetech.com/extreme/296375-curiosity-spots-unexpectedly-complex-martian-rock');
      expect(post.author).to.eql(784);
      expect(post.featuredMedia).to.eql(296377);
      expect(post.sticky).to.eql(false);
      expect(post.format).to.eql('standard');
      expect(post.meta).to.eql([]);
      expect(post.categories).to.eql([ 4 ]);
      expect(post.tags).to.eql([ 1658, 7852, 924, 20435, 210, 174, 184, 7678, 26179 ]);
      expect(post.date).to.be.instanceOf(Date);
      expect(post.date.toISOString()).to.eql('2019-08-09T14:00:34.000Z');
      expect(post.modified).to.be.instanceOf(Date);
      expect(post.modified.toISOString()).to.eql('2019-08-08T22:13:48.000Z');
      expect(post.title.getPlainText()).to.eql(`Curiosity Spots Unexpectedly Complex Martian Rock`);
      expect(post.excerpt.getPlainText()).to.eql(`The so-called “Strathdon” has dozens of sedimentary layers squished together, a geological quirk scientists didn’t expect to see on Mars. This points to a potentially complex and watery past in the region explored by Curiosity.`);
      expect(post.content.getPlainText()).to.eql(`
NASA’s Curiosity rover has seen a lot of rocks. In fact, that’s almost all it sees on the surface of Mars. Recently, the rover spotted a rock so strange that the team decided to move in for a closer look. The so-called “Strathdon” has dozens of sedimentary layers squished together, a geological quirk scientists didn’t expect to see on Mars. This points to a potentially complicated and watery past in the region explored by Curiosity.

Curiosity landed on Mars in 2012, setting up shop in Gale Crater. Its goal was to make its way to nearby Mount Sharp and roll up the slope, examining the geology on the way. It reached the base of the mountain in 2014. The team has made numerous pit stops along the way to the summit in order to take a closer look at interesting regions. Currently, the rover is puttering around in an area called the “clay-bearing unit.” In the distant past, it was most likely home to streams and lakes, the only remnants of which are clay mineral deposits.

While exploring the clay-bearing unit, Curiosity happened upon a strange boulder partially buried in the ground — the Strathdon. The rock formed from many layers of compressed sediment that had hardened into a brittle, wavy mass. It’s a stark contrast from the flat layers of lake sediment Curiosity has seen elsewhere on Mars.

Strathdon as seen from 4 inches away.

Curiosity approached the Strathdon, taking a close-up mosaic image for scientists back on Earth to examine. The team speculates that the structure of this boulder means the clay-bearing unit has a much more complex and dynamic geological history than anyone expected. A combination of flowing water and wind could be responsible for the existence of this formation. This region might have been quite hospitable to life many eons ago, but Curiosity can’t say for certain — that’s for the next rover to find out.

NASA’s Mars 2020 rover is being assembled at JPL as we speak. It has a robotic arm, wheels, and some of its many, many cameras. The still-unnamed rover uses the same chassis as Curiosity, but it will carry instruments that are better able to search for signs of ancient life on the red planet. The launch is scheduled for next summer when Earth and Mars are lined up for an easy journey. Mars 2020 will join Curiosity on the surface in February 2021.

Now Read:

* Scientists Simulate Marsquakes With Data From InSight Lander
* NASA Tests Mars 2020 Robotic Arm With ‘Biceps Curls’
* Curiosity Rover Detects Abnormally High Methane Levels on Mars
      `.trim());
    })
  })
  describe('WordpressPage', function() {
    it('should have the right properties', async function() {
      const page = await loadTestObject([ 'et', 141546 ], WordpressPage);

      expect(page.id).to.eql(141546);
      expect(page.slug).to.eql('this-is-my-rig');
      expect(page.status).to.eql('publish');
      expect(page.type).to.eql('page');
      expect(page.link).to.eql('https://www.extremetech.com/this-is-my-rig');
      expect(page.author).to.eql(762);
      expect(page.featuredMedia).to.eql(120021);
      expect(page.menuOrder).to.eql(0);
      expect(page.parent).to.eql(0);
      expect(page.meta).to.eql([]);
      expect(page.date).to.be.instanceOf(Date);
      expect(page.date.toISOString()).to.contain('2012-11-28T21:09:15.000Z');
      expect(page.modified).to.be.instanceOf(Date);
      expect(page.modified.toISOString()).to.contain('2014-06-27T16:38:17.000Z');
      expect(page.title.getPlainText()).to.be.eql(`This is my rig: Writing guide`);
      expect(page.excerpt.getPlainText()).to.be.eql(`Let’s face it: computer building is not what it used to be. Not too long ago, if you wanted a great computer it needed to be a desktop and you had to build it yourself. That’s not the case any more, but there are still some very compelling reasons to piece together a custom PC.Desktop…`);
      expect(page.content.getPlainText()).to.be.eql(`
[CPU Cooler]

Let’s face it: computer building is not what it used to be. Not too long ago, if you wanted a great computer it needed to be a desktop and you had to build it yourself. That’s not the case any more, but there are still some very compelling reasons to piece together a custom PC.\n\nDesktop computing has been commoditized but doesn’t mean we all need to use commodity computers. This is my rig (TiMR) is a celebration of the DIY spirit, problem solving, and the not-quite-lost art of cable routing.

The goal of TiMR is to be a series of articles on ExtremeTech.com where people talk about their latest computer build. Each article will walk readers through a particular build, while offering a brief explanation as to why particular choices were made. These choices don’t have to be justified or fought for, they simply reflect the research, restrictions, and goals of the PC builder.\n\nExamples\n\n* This is my rig: Bill Howard’s million-photo $10,000 digital photography workstation\n* This is my rig: 3D designer Rich Ackermann
* This is my rig: ExtremeTech’s Sebastian Anthony
* This is my rig: ExtremeTech’s Sal Cangeloso
* This is my rig: ExtremeTech reporter Ray Walters

Rough outline

* Introduction
* CPU (and CPU cooling)
* Motherboard
* Graphics
* Storage
* Memory
* Power Supply
* Case
* Misc (optical drives, fan controllers, etc., optional)
* Operating system (optional)
* Conclusion
* Byline (optional)

Length

There is no minimum or maximum length, but please take enough time to explain the parts (don’t suppose every reader knows the specs of every case and power supply) and why you chose it. If your reasoning was based on price or something similarly simple, don’t feel like you need to say too much.

Images

Please provide as many images as possible. We’ll accept images from the manufacturer or shots you took yourself. JPG format is best.

Formatting

You can include the document in-line in an email, attached as plain text, or in an easily accessible method (like Google Docs). You can use basic HTML or things like hyperlinks if you’d like, but we’ll handle the page formatting.

Byline

If you’d like to to link to your website, Twitter handle, or day job, this is the chance. A one to two line bio can be included as well.

Process

Interested in writing about your new rig? Email sal@extremetech.com with the proposal.

— — — — — — — — — — — — — — — —
Last update: 6/27/14 12:35, Sebastian Anthony
 Previous updates: —
Modified: 9/28/12 Sal Cangeloso
Created: 9/27/12, Sal Cangeloso
      `.trim());
    })
  })
  describe('WordpressUser', function() {
    it('should have the right properties', async function() {
      const user = await loadTestObject([ 'et', 762 ], WordpressUser);

      expect(user.id).to.eql(762);
      expect(user.slug).to.eql('scangeloso');
      expect(user.url).to.eql('http://www.extremetech.com');
      expect(user.link).to.eql('https://www.extremetech.com/author/scangeloso');
      expect(user.avatarURLs).to.eql({
        '24': 'https://secure.gravatar.com/avatar/6b450f3475e831b7b2bc9bc901d593ea?s=24&d=mm&r=g',
        '48': 'https://secure.gravatar.com/avatar/6b450f3475e831b7b2bc9bc901d593ea?s=48&d=mm&r=g',
        '96': 'https://secure.gravatar.com/avatar/6b450f3475e831b7b2bc9bc901d593ea?s=96&d=mm&r=g'
      });
      expect(user.meta).to.eql([]);
      expect(user.name.getPlainText()).to.eql('Sal Cangeloso');
      expect(user.description.getPlainText()).to.be.eql(`
Sal Cangeloso is the Managing Editor at ExtremeTech.com and Geek.com, and the author of LED Lighting: A Primer to Lighting the Future. He lives on Earth, a small but biologically diverse terrestrial planet.

 Links...
 Twitter
 Google +
      `.trim());
    })
  })
  describe('WordpressTag', function() {
    it('should have the right properties', async function() {
      const tag = await loadTestObject([ 'et', 148 ], WordpressTag);

      expect(tag.id).to.eql(148);
      expect(tag.slug).to.eql('amd');
      expect(tag.count).to.eql(1263);
      expect(tag.link).to.eql('https://www.extremetech.com/tag/amd');
      expect(tag.meta).to.eql([]);
      expect(tag.taxonomy).to.eql('post_tag');
      expect(tag.name.getPlainText()).to.eql('amd');
      expect(tag.description.getPlainText()).to.eql('');
    })
  })
  describe('WordpressCategory', function() {
    it('should have the right properties', async function() {
      const category = await loadTestObject([ 'et', 8 ], WordpressCategory);

      expect(category.id).to.eql(8);
      expect(category.slug).to.eql('computing');
      expect(category.count).to.eql(9754);
      expect(category.link).to.eql('https://www.extremetech.com/category/computing');
      expect(category.meta).to.eql([]);
      expect(category.taxonomy).to.eql('category');
      expect(category.parent).to.eql(0);
      expect(category.name.getPlainText()).to.eql('Computing');
      expect(category.description.getPlainText()).to.eql('Computer Hardware & Software News');
    })
  })
  describe('WordpressMedia', function() {
    it('should have the right properties', async function() {
      const media = await loadTestObject([ 'et', 296377 ], WordpressMedia);

      expect(media.id).to.eql(296377);
      expect(media.slug).to.eql('707_mastcam_views__strathdon_');
      expect(media.status).to.eql('inherit');
      expect(media.type).to.eql('attachment');
      expect(media.link).to.eql('https://www.extremetech.com/extreme/296375-curiosity-spots-unexpectedly-complex-martian-rock/attachment/707_mastcam_views__strathdon_');
      expect(media.author).to.eql(784);
      expect(media.altText).to.eql('');
      expect(media.mediaType).to.eql('image');
      expect(media.mimeType).to.eql('image/jpeg');
      expect(media.mediaDetails.sizes.thumbnail).to.eql({
        file: '707_Mastcam_Views__Strathdon_-150x150.jpg',
        width: 150,
        height: 150,
        mime_type: 'image/jpeg',
        source_url: 'https://www.extremetech.com/wp-content/uploads/2019/08/707_Mastcam_Views__Strathdon_-150x150.jpg'
      });
      expect(media.post).to.eql(296375);
      expect(media.sourceURL).to.eql('https://www.extremetech.com/wp-content/uploads/2019/08/707_Mastcam_Views__Strathdon_.jpg');
      expect(media.meta).to.eql([]);
      expect(media.date).to.be.instanceOf(Date);
      expect(media.date.toISOString()).to.eql('2019-08-08T16:13:12.000Z');
      expect(media.modified).to.be.instanceOf(Date);
      expect(media.modified.toISOString()).to.eql('2019-08-08T16:13:12.000Z');
      expect(media.title.getPlainText()).to.eql('707_Mastcam_Views__Strathdon_');
      expect(media.description.getPlainText()).to.eql('');
      expect(media.caption.getPlainText()).to.be.eql('');
    })
  })
});

let testData = {};

async function loadTestObject(identifiers, constructor) {
  const data = await loadTestData(identifiers, constructor);
  const file = new constructor(identifiers, data);
  return file;
}

async function loadTestData(identifiers, constructor) {
  const objectURL = constructor.getObjectURL(identifiers);
  const fullURL = `${serverAddress}/data/${objectURL}`;
  return fetchTestData(fullURL);
}
