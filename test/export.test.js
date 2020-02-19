import { expect } from 'chai';

import {
  RouteManager,
  RouteManagerEvent,
  RouteManagerError,

  harvest,
  plant,
  useProgress,
} from '../src/index.mjs';

describe('exports', function() {
  describe('RouteManager', function() {
    it('should be correctly exported from external package', function() {
      expect(RouteManager).to.be.a('function');
      expect(RouteManagerEvent).to.be.a('function');
      expect(RouteManagerError).to.be.a('function');
    })
  })
  describe('harvest', function() {
    it('should be correctly exported from external package', function() {
      expect(harvest).to.be.a('function');
    })
  })
  describe('plant', function() {
    it('should be correctly exported from external package', function() {
      expect(plant).to.be.a('function');
    })
  })
  describe('useProgress', function() {
    it('should be correctly exported from external package', function() {
      expect(useProgress).to.be.a('function');
    })
  })
})
