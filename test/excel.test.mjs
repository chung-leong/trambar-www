import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server from './server/server.mjs';

import {
    ExcelFile,
    ExcelSheet,
    ExcelColumn,
    ExcelRow,
    ExcelCell,
    ExcelPlainTextCell,
    ExcelRichTextCell,
    ExcelImageCell,
} from '../src/index.mjs';

configure({ adapter: new Adapter });

const serverPort = 7711;
const serverAddress = `http://localhost:${serverPort}`;

describe('Excel', function() {
    before(() => {
        return Server.start(serverPort);
    })
    describe('ExcelFile', function() {
        it ('should be able to retrieve test data', async function() {
            const data = await loadTestData('test-1');
            expect(data.name).to.eql('test-1');
            expect(data.title).to.eql('Test file title');
            expect(data.description).to.eql('This is a test');
            expect(data.keywords).to.eql([ 'keyword1', 'keyword2', 'keyword3' ]);
            expect(data.subject).to.eql('Test subject');
        })
        it ('should include metadata from file', async function() {
            const data = await loadTestData('test-1');
            const file = await loadTestFile('test-1');
            expect(data.name).to.eql(data.name);
            expect(file.title).to.eql(data.title);
            expect(file.description).to.eql(data.description);
            expect(file.keywords).to.eql(data.keywords);
            expect(file.keywords).to.eql(data.keywords);
        })
        it ('should have the right number of sheets', async function() {
            const file = await loadTestFile('test-1');
            expect(file.sheets).to.have.lengthOf(5);
        })
        describe('#sheet', function() {
            it ('should return sheet with matching name', async function() {
                const file = await loadTestFile('test-1');
                const sheet1 = file.sheet('Sheet1');
                expect(sheet1).to.have.property('name', 'Sheet1');
            })
            it ('should return the first sheet when there are multiple sheet with the same name', async function() {
                const file = await loadTestFile('test-1');
                const sheet3 = file.sheet('Names');
                expect(sheet3).to.have.property('name', 'Names');
                expect(sheet3).to.have.property('flags').that.eql([ 'en' ]);
            })
        })
        describe('#filter()', function() {
            it ('should remove sheets with non-matching language code', async function() {
                const file = await loadTestFile('test-1');
                const filtered = file.filter('pl');
                expect(filtered.sheets).to.have.lengthOf(3);
                const sheet3 = filtered.sheets[2];
                expect(sheet3).to.have.property('flags').that.eql([ 'pl' ]);
            })
            it ('should yield sheets with non-matching columns removed', async function() {
                const file = await loadTestFile('test-1');
                const filtered = file.filter('pl');
                const sheet2 = filtered.sheets[1];
                expect(sheet2.columns).to.have.lengthOf(2);
            })
        })
        describe('#get()', function() {
            it ('should be able to find a column', async function() {
                const file = await loadTestFile('test-1');
                const column = file.get([ 'Sheet1', 'plain text' ]);
                expect(column).to.be.instanceOf(ExcelColumn);
            })
            it ('should be able to find a cell', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet1', 'plain text', 0 ]);
                expect(cell).to.be.instanceOf(ExcelCell);
                expect(cell.plainText()).to.eql('This is a test');
            })
        })
        describe('#includes()', function() {
            it ('should notice that a cell is not in the sheet', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet2', 'phrase', 1 ]);
                expect(cell).to.be.instanceOf(ExcelCell);
                expect(cell.plainText()).to.eql('Sorry');
                const filteredPL = file.filter('pl');
                const presentPL = filteredPL.includes(cell);
                expect(presentPL).to.be.false;
                const filteredEN = file.filter('en');
                const presentEN = filteredEN.includes(cell);
                expect(presentEN).to.be.true;
            })
        })
        describe('#plainText()', function() {
            it ('should return an objects with array properties', async function() {
                const file = await loadTestFile('test-1');
                const object = file.plainText();
                expect(object).to.have.property('Sheet1').that.is.instanceOf(Array);
                expect(object).to.have.property('Sheet2').that.is.instanceOf(Array);
                expect(object).to.have.property('Names').that.is.instanceOf(Array)
                expect(object.Sheet1[0]).to.have.property('rich text', 'This is another test');
                expect(object.Sheet1[0]).to.have.property('image').that.matches(/\bmedia\b/);
                expect(object.Names[0]).to.eql({ Name: 'Alice' });
            })
        })
        describe('#richText()', function() {
            it ('should return an objects with array properties', async function() {
                const file = await loadTestFile('test-1');
                const object = file.richText();
                expect(object).to.have.property('Sheet1').that.is.instanceOf(Array);
                expect(object).to.have.property('Sheet2').that.is.instanceOf(Array);
                expect(object).to.have.property('Names').that.is.instanceOf(Array)
                expect(object.Sheet1[0]).to.have.property('plain text').that.is.a('string');
                expect(object.Sheet1[0]).to.have.property('rich text').that.is.an('object');
                expect(object.Sheet1[0]).to.have.property('image').that.is.an('object');
            })
        })
    })
    describe('ExcelSheet', function() {
        it ('should have the right number of rows and columns', async function() {
            const file = await loadTestFile('test-1');
            const [ sheet1, sheet2 ] = file.sheets;
            expect(sheet1.columns).to.have.lengthOf(3);
            expect(sheet1.rows).to.have.lengthOf(1);
            expect(sheet2.columns).to.have.lengthOf(6);
            expect(sheet2.rows).to.have.lengthOf(5);
        })
        it ('should have flags extracted from name', async function() {
            const file = await loadTestFile('test-1');
            const [ ,, sheet3, sheet4, sheet5 ] = file.sheets;
            expect(sheet3.flags).to.eql([ 'en' ]);
            expect(sheet4.flags).to.eql([ 'pl' ]);
            expect(sheet5.flags).to.eql([ 'ua' ]);
            expect(sheet3.name).to.eql('Names');
            expect(sheet4.name).to.eql('Names');
            expect(sheet5.name).to.eql('Names');
        })
        describe('#column', function() {
            it ('should return column with matching name', async function() {
                const file = await loadTestFile('test-1');
                const sheet1 = file.sheet('Sheet1');
                const column1 = sheet1.column('plain text')
                expect(column1).to.have.property('name', 'plain text');
            })
            it ('should return the first column when there are multiple columns with the same name', async function() {
                const file = await loadTestFile('test-1');
                const sheet2 = file.sheet('Sheet2');
                const column2 = sheet2.column('picture')
                expect(column2).to.have.property('name', 'picture');
                expect(column2).to.have.property('flags').that.eql([ 'en', 'import' ]);
            })
        })
    })
    describe('ExcelColumn', function() {
        it ('should have the right number of cells', async function() {
            const file = await loadTestFile('test-1');
            const sheet2 = file.sheets[1];
            const [ column1 ] = sheet2.columns;
            expect(column1.cells).to.have.lengthOf(5);
        })
        it ('should have flags extracted from text', async function() {
            const file = await loadTestFile('test-1');
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
    describe('ExcelRow', function() {
        it ('should have the right number of cells', async function() {
            const file = await loadTestFile('test-1');
            const sheet1 = file.sheets[0];
            const [ row1 ] = sheet1.rows;
            expect(row1.cells).to.have.lengthOf(3);
        })
    })
    describe('ExcelPlainTextCell', function() {

    })
    describe('ExcelRichTextCell', function() {

    })
    describe('ExcelImageCell', function() {

    })
    after(() => {
        return Server.stop();
    });
})

let testData = {};

async function loadTestFile(name) {
    const data = await loadTestData(name);
    const file = ExcelFile.create(data);
    return file;
}

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
