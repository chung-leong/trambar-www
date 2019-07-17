import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server from './server/server.mjs';

import { ExcelFile } from '../src/excel-file.mjs';

configure({ adapter: new Adapter });

const serverPort = 7711;
const serverAddress = `http://localhost:${serverPort}`;

describe('ExcelFile', function() {
    before(() => {
        return Server.start(serverPort);
    })
    it ('should be able to retrieve test data', async function() {
        const data = await loadTestFile();
        expect(data.name).to.eql('test');
        expect(data.title).to.eql('Test file title');
        expect(data.description).to.eql('This is a test');
        expect(data.keywords).to.eql([ 'keyword1', 'keyword2', 'keyword3' ]);
        expect(data.subject).to.eql('Test subject');
    })
    it ('should include metadata from file', async function() {
        const data = await loadTestFile();
        const file = ExcelFile.create(data);
        expect(data.name).to.eql(data.name);
        expect(file.title).to.eql(data.title);
        expect(file.description).to.eql(data.description);
        expect(file.keywords).to.eql(data.keywords);
        expect(file.keywords).to.eql(data.keywords);
    })
    after(() => {
        return Server.stop();
    });
})

let testData;

async function loadTestFile() {
    if (!testData) {
        const res = await fetch(`${serverAddress}/excel/test`);
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        testData = await res.json();
    }
    return testData;
}
