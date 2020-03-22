import { expect } from 'chai';

import {
  Resource,
} from '../index.mjs';

describe('Resource', function() {
  describe('#matchURL()', function() {
    it('should return true when specified URL matches the image\'s source URL', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const result = image.matchURL('http://localhost/something.jpg');
      expect(result).to.be.true;
    })
    it('should return true when specified URL matches the image\'s import URL', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const result = image.matchURL('/media/images/6ba6046c0e2a904d4f50dc841110b38b/');
      expect(result).to.be.true;
    })
    it('should return true when given the URL of a derived image', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const derived = image.transform({
        width: 50,
        height: 50,
        server: 'http://somewhere',
      });
      const result = image.matchURL(derived.url);
      expect(result).to.be.true;
    })
    it('should return false when specified URL does not match either', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const result = image.matchURL('http://localhost/something_else.jpg');
      expect(result).to.be.false;
    })
  })
  describe('#transform()', function() {
    it('should return the same image when there is no change', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ width: undefined, height: undefined });
      expect(newImage).to.equal(image);
    })
    it('should rotate image', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ rotate: 90 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/ro90');
      expect(newImage.width).to.equal(100);
      expect(newImage.height).to.equal(200);
    })
    it('should resize image to specified width', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ width: 100 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/re100_50');
      expect(newImage.width).to.equal(100);
      expect(newImage.height).to.equal(50);
    })
    it('should resize image to specified height', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ height: 20 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/re40_20');
      expect(newImage.width).to.equal(40);
      expect(newImage.height).to.equal(20);
    })
    it('should not enlarge image by default', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ height: 200 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/');
      expect(newImage.width).to.equal(400);
      expect(newImage.height).to.equal(200);
      expect(newImage.naturalWidth).to.equal(200);
      expect(newImage.naturalHeight).to.equal(100);
    })
    it('should permit enlarging image when specified', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ height: 200, enlarge: true });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/re400_200');
      expect(newImage.width).to.equal(400);
      expect(newImage.height).to.equal(200);
      expect(newImage.naturalWidth).to.equal(400);
      expect(newImage.naturalHeight).to.equal(200);
    })
    it('should resize image to specified width and height', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ width: 190, height: 90, crop: false });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/re190_90');
      expect(newImage.width).to.equal(190);
      expect(newImage.height).to.equal(90);
    })
    it('should crop image vertically', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ width: 200, height: 50 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/cr0_25_200_50');
      expect(newImage.width).to.equal(200);
      expect(newImage.height).to.equal(50);
    })
    it('should crop image horizontally', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ width: 100, height: 100 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/cr50_0_100_100');
      expect(newImage.width).to.equal(100);
      expect(newImage.height).to.equal(100);
    })
    it('should crop and resize image', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ width: 50, height: 50 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/cr50_0_100_100-re50_50');
      expect(newImage.width).to.equal(50);
      expect(newImage.height).to.equal(50);
    })
    it('should take pixel ratio into consideration', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ width: 50, height: 50, ratio: 2 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/cr50_0_100_100');
      expect(newImage.width).to.equal(50);
      expect(newImage.height).to.equal(50);
      expect(newImage.naturalWidth).to.equal(100);
      expect(newImage.naturalHeight).to.equal(100);
    })
    it('should add file extension', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ width: 50, height: 50, format: 'png' });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/cr50_0_100_100-re50_50.png');
      expect(newImage.width).to.equal(50);
      expect(newImage.height).to.equal(50);
    })
    it('should apply blur', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ blur: 0.5 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/bl5');
    })
    it('should apply sharpening', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ sharpen: true });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/sh');
    })
    it('should set quality', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ blur: true, quality: 50 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/bl3-q50');
    })
    it('should attach server to URL', function() {
      const image = new Resource({
        type: 'image',
        src: 'http://localhost/something.jpg',
        url: '/media/images/6ba6046c0e2a904d4f50dc841110b38b/',
        width: 200,
        height: 100,
      });
      const newImage = image.transform({ server: 'http://hello.no' });
      expect(newImage.url).to.equal('http://hello.no/media/images/6ba6046c0e2a904d4f50dc841110b38b/');
    })
  })
})
