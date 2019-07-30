import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server from './server/server.mjs';

import {
    DataSource,
    Excel,
    Gitlab,

    ExcelFile,
} from '../index.mjs';

configure({ adapter: new Adapter });

const serverPort = 7745;
const serverAddress = `http://localhost:${serverPort}`;

describe('DataSource', function() {
    before(() => {
        return Server.start(serverPort);
    })
    it ('should accept extensions', function() {
        const dataSource = new DataSource([ Excel, Gitlab ]);
        expect(dataSource.fetchExcelFile).to.be.a('function');
        expect(dataSource.fetchWikiPage).to.be.a('function');
    })
    describe('#fetchExcelFile', function() {
        it ('should retrieve an Excel file', async function() {
            const data = await loadTestData('test-1');
            const options = {
                baseURL: serverAddress
            };
            const dataSource = new DataSource([ Excel ], options);
            dataSource.activate();
            const file = await dataSource.fetchExcelFile('test-1');
            expect(file).to.be.an.instanceOf(ExcelFile);
            expect(file.name).to.eql(data.name);
            expect(file.title).to.eql(data.title);
            expect(file.description).to.eql(data.description);
            expect(file.keywords).to.eql(data.keywords);
            expect(file.keywords).to.eql(data.keywords);
            expect(file.sheets).to.have.lengthOf(data.sheets.length);
        })
        it ('should return the same object when queries are the same', async function() {
            const options = {
                baseURL: serverAddress
            };
            const dataSource = new DataSource([ Excel ], options);
            dataSource.activate();
            const file1 = await dataSource.fetchExcelFile('test-1');
            const file2 = await dataSource.fetchExcelFile('test-1');
            expect(file1).to.equal(file2);
        })
    })
    describe('#fetchExcelFiles', function() {
        it ('should fetch multiple files', async function() {
            const options = {
                baseURL: serverAddress
            };
            const dataSource = new DataSource([ Excel ], options);
            dataSource.activate();
            const files = await dataSource.fetchExcelFiles();
            expect(files).to.have.lengthOf(2);
            expect(files[0]).to.be.instanceOf(ExcelFile);
            expect(files[1]).to.be.instanceOf(ExcelFile);
        })
    })
    after(() => {
        return Server.stop();
    })
})

const testData = {};

async function loadTestData(name) {
    let data = testData[name];
    if (!data) {
        const res = await fetch(`${serverAddress}/excel/${name}`);
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        data = testData[name] = await res.json();
    }
    return data;
}
