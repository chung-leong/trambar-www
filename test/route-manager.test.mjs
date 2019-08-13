import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server from './server/server.mjs';

import {
    RouteManager,
    RouteManagerEvent,
    RouteManagerError,
} from '../index.mjs';

configure({ adapter: new Adapter });

describe('RouteManager', function() {
    it('should be correctly exported from external package', function() {
        expect(RouteManager).to.be.a('function');
        expect(RouteManagerEvent).to.be.a('function');
        expect(RouteManagerError).to.be.a('function');
    })
})
