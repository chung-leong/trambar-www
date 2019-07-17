import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server from './server/server.mjs';

import { ExcelFile } from '../src/excel-file.mjs';

configure({ adapter: new Adapter });

const serverPort = 7711;
const serverAddress = `http://localhost:${serverPort}`;

describe('Excel', function() {
    before(() => {
        return Server.start(serverPort);
    })
    describe('ExcelFile', function() {
        it ('should be able to retrieve test data', async function() {
            const data = await loadTestData();
            expect(data.name).to.eql('test');
            expect(data.title).to.eql('Test file title');
            expect(data.description).to.eql('This is a test');
            expect(data.keywords).to.eql([ 'keyword1', 'keyword2', 'keyword3' ]);
            expect(data.subject).to.eql('Test subject');
        })
        it ('should include metadata from file', async function() {
            const data = await loadTestData();
            const file = await loadTestFile();
            expect(data.name).to.eql(data.name);
            expect(file.title).to.eql(data.title);
            expect(file.description).to.eql(data.description);
            expect(file.keywords).to.eql(data.keywords);
            expect(file.keywords).to.eql(data.keywords);
        })
        it ('should have the right number of sheets', async function() {
            const file = await loadTestFile();
            expect(file.sheets).to.have.lengthOf(5);
        })
    })
    describe('ExcelSheet', function() {
        it ('should have flags extracted from name', async function() {
            const file = await loadTestFile();
            const [ ,, sheet3, sheet4, sheet5 ] = file.sheets;
            expect(sheet3.flags).to.eql([ 'en' ]);
            expect(sheet4.flags).to.eql([ 'pl' ]);
            expect(sheet5.flags).to.eql([ 'ua' ]);
            expect(sheet3.name).to.eql('Names');
            expect(sheet4.name).to.eql('Names');
            expect(sheet5.name).to.eql('Names');
        })
    })
    describe('ExcelColumn', function() {
        it ('should have the right number of cells', async function() {
            const file = await loadTestFile();
            const sheet2 = file.sheets[1];
            const [ column1 ] = sheet2.columns;
            expect(column1.cells).to.have.lengthOf(5);
        })
        it ('should have flags extracted from text', async function() {
            const file = await loadTestFile();
            const sheet2 = file.sheets[1];
            const [ column1, column2, column3, column4, column5, column6 ] = sheet2.columns;
            expect(column1.flags).to.eql([ 'en' ]);
            expect(column2.flags).to.eql([ 'pl' ]);
            expect(column3.flags).to.eql([ 'ua' ]);
            expect(column4.flags).to.eql([ 'en', 'import' ]);
            expect(column5.flags).to.eql([ 'pl', 'import' ]);
            expect(column6.flags).to.eql([ 'ua', 'import' ]);
            expect(column1.name).to.eql('phrase');
            expect(column2.name).to.eql('phrase');
            expect(column3.name).to.eql('phrase');
            expect(column4.name).to.eql('picture');
            expect(column5.name).to.eql('picture');
            expect(column6.name).to.eql('picture');
        })
    })
    after(() => {
        return Server.stop();
    });
})

let testData;

async function loadTestFile() {
    const data = await loadTestData();
    const file = ExcelFile.create(data);
    return file;
}

async function loadTestData() {
    if (!testData) {
        const res = await fetch(`${serverAddress}/excel/test`);
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        testData = await res.json();
    }
    return testData;
}
