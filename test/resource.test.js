import { expect } from 'chai';

import {
  Resource,
} from '../src/index.mjs';

describe('Resource', function() {
  describe('#transform()', function() {
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
      const newImage = image.transform({ height: 200 });
      expect(newImage.url).to.equal('/media/images/6ba6046c0e2a904d4f50dc841110b38b/re400_200');
      expect(newImage.width).to.equal(400);
      expect(newImage.height).to.equal(200);
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
  })
})
