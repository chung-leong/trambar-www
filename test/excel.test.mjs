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
} from '../index.mjs';

configure({ adapter: new Adapter });

const serverPort = 7711;
const serverAddress = `http://localhost:${serverPort}`;

describe('Excel', function() {
    before(() => {
        return Server.start(serverPort);
    })
    it ('should be able to retrieve test data', async function() {
        const data = await loadTestData('test-1');
        expect(data.name).to.eql('test-1');
        expect(data.title).to.eql('Test file title');
        expect(data.description).to.eql('This is a test');
        expect(data.keywords).to.eql([ 'keyword1', 'keyword2', 'keyword3' ]);
        expect(data.subject).to.eql('Test subject');
    })
    describe('ExcelFile', function() {
        it ('should include metadata from file', async function() {
            const data = await loadTestData('test-1');
            const file = await loadTestFile('test-1');
            expect(file.name).to.eql(data.name);
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
            it ('should accept a string', async function() {
                const file = await loadTestFile('test-1');
                const column = file.get('Sheet1.plain text');
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
        describe('#image()', function() {
            it ('should return an image element based on a derived URL', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 50,
                    imageWidth: 500,
                    imageServer: 'http://localhost',
                };
                const img = cell.richText(options);
                const src = img.props.src;
                const found = file.image(src);
                expect(found).to.equal(cell);
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
        describe('#filter()', function() {
            it ('should remove columns with non-matching language code', async function() {
                const file = await loadTestFile('test-1');
                const sheet2 = file.sheets[1];
                const filtered = sheet2.filter('pl-pl');
                expect(filtered.columns).to.have.lengthOf(2);
                const column1 = filtered.columns[0];
                const phrases = column1.plainText();
                expect(phrases).to.eql([
                    'Cześć',
                    'Przepraszam',
                    'Do widzenia',
                    'Witamy',
                    'Proszę',
                ]);
            })
            it ('should choose based on country code', async function() {
                const file = await loadTestFile('test-2');
                const sheet1 = file.sheets[0];
                const [ us ] = sheet1.filter('en-us').plainText();
                const [ uk ] = sheet1.filter('en-uk').plainText();
                const [ ie ] = sheet1.filter('en-ie').plainText();
                const [ ca ] = sheet1.filter('en-ca').plainText();
                expect(us).to.have.property('capital', 'Washington');
                expect(uk).to.have.property('capital', 'London');
                expect(ie).to.have.property('capital', 'Dublin');
                expect(ca).to.have.property('capital', 'Washington');
            })
        })
        describe('#plainText()', function() {
            it ('should return an array of objects', async function() {
                const file = await loadTestFile('test-1');
                const sheet2 = file.sheet('Sheet2');
                const objects = sheet2.plainText();
                expect(objects).to.be.an.instanceOf(Array);
                expect(objects[2]).to.have.property('phrase', 'Goodbye');

                const filteredPL = sheet2.filter('pl-pl');
                const objectsPL = filteredPL.plainText();
                expect(objectsPL).to.be.an.instanceOf(Array);
                expect(objectsPL[2]).to.have.property('phrase', 'Do widzenia');
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
        describe('#get()', function() {
            it ('should be able to find a cell', async function() {
                const file = await loadTestFile('test-1');
                const sheet1 = file.sheets[0];
                const [ row1 ] = sheet1.rows;
                const cell = row1.get('rich text');
                expect(cell).to.be.instanceOf(ExcelRichTextCell);
            })
        })
    })
    describe('ExcelPlainTextCell', function() {
        describe('#richText', function() {
            it ('should return plain text', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet1', 'plain text', 0 ]);
                expect(cell).to.be.an.instanceOf(ExcelPlainTextCell);
                const text1 = cell.plainText();
                const text2 = cell.richText();
                expect(text1).to.eql(text2);
            })
            it ('should call richTextAdjust with type set to undefined', async function() {
                let args;
                const richTextAdjust = (type, props, children) => {
                    args = { type, props, children };
                    return { type, props, children };
                };

                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet1', 'plain text', 0 ]);
                expect(cell).to.be.an.instanceOf(ExcelPlainTextCell);
                const text2 = cell.richText({ richTextAdjust });
                expect(args.type).to.be.undefined;
                expect(args.props).to.have.property('key', 0);
                expect(args.children).to.be.a('string');
            })
            it ('should yield an element when richTextAdjust provides a type', async function() {
                const richTextAdjust = (type, props, children) => {
                    return {
                        type: 'span',
                        props: { ...props, className: 'chicken' },
                        children
                    };
                };

                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet1', 'plain text', 0 ]);
                expect(cell).to.be.an.instanceOf(ExcelPlainTextCell);
                const element = cell.richText({ richTextAdjust });
                expect(element.type).to.eql('span');
                expect(element.props).to.have.property('className', 'chicken');
                expect(element.props.children).to.be.a('string');
            })
        })
    })
    describe('ExcelRichTextCell', function() {
        describe('#plainText', function() {
            it ('should return plain text', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet1', 'rich text', 0 ]);
                expect(cell).to.be.an.instanceOf(ExcelRichTextCell);
                const text = cell.plainText();
                expect(text).to.eql('This is another test');
            })
        })
        describe('#richText', function() {
            it ('should return element with bold text', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet1', 'rich text', 0 ]);
                expect(cell).to.be.an.instanceOf(ExcelRichTextCell);
                const container = cell.richText();
                const children = container.props.children;
                expect(children).to.be.an.instanceOf(Array);
                const bold = children.find((element) => {
                    if (element.props.style.fontWeight === 'bold') {
                        return true;
                    }
                });
                expect(bold).to.not.be.null;
            })
            it ('should return element with italic text', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet1', 'rich text', 0 ]);
                expect(cell).to.be.an.instanceOf(ExcelRichTextCell);
                const container = cell.richText();
                const children = container.props.children;
                expect(children).to.be.an.instanceOf(Array);
                const italic = children.find((element) => {
                    if (element.props.style.fontStyle === 'italic') {
                        return true;
                    }
                });
                expect(italic).to.not.be.null;
            })
            it ('should return element with underlined text', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.get([ 'Sheet1', 'rich text', 0 ]);
                expect(cell).to.be.an.instanceOf(ExcelRichTextCell);
                const container = cell.richText();
                const children = container.props.children;
                expect(children).to.be.an.instanceOf(Array);
                const underlined = children.find((element) => {
                    if (element.props.style.textDecoration === 'underline') {
                        return true;
                    }
                });
                expect(underlined).to.not.be.null;
            })
        })
    })
    describe('ExcelImageCell', function() {
        describe('#richText()', function() {
            it ('should return an image element', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                expect(cell).to.be.an.instanceOf(ExcelImageCell);
                const img = cell.richText();
                expect(img).to.have.property('type', 'img');
            })
            it ('should apply width limit', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageWidth: 100,
                };
                const img = cell.richText(options);
                const src = img.props.src;
                expect(src).to.contain('re100-50');
            })
            it ('should apply height limit', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 100,
                };
                const img = cell.richText(options);
                const src = img.props.src;
                expect(src).to.contain('re200-100');
            })
            it ('should crop image when both width and height are given', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 100,
                    imageWidth: 100,
                };
                const img = cell.richText(options);
                const src = img.props.src;
                // crop half of the image horizontally, 1000x500 -> 500x500,
                // centering, then resize to 100x100
                expect(src).to.contain('cr250-0-500-500+re100-100');
            })
            it ('should crop image when both width and height are given', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 50,
                    imageWidth: 500,
                };
                const img = cell.richText(options);
                const src = img.props.src;
                // crop image vertically, 1000x500 -> 1000x100,
                // centering, then resize to 500x50
                expect(src).to.contain('cr0-200-1000-100+re500-50');
            })
            it ('should request a larger image when pixel ratio is > 1', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 50,
                    imageWidth: 500,
                    devicePixelRatio: 1.5,
                };
                const img = cell.richText(options);
                const src = img.props.src;
                // crop image vertically, 1000x500 -> 1000x100,
                // centering, then resize to 750x75
                expect(src).to.contain('cr0-200-1000-100+re750-75');
            })
            it ('should set to set image dimension to pixel count', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 50,
                    imageWidth: 500,
                    devicePixelRatio: 1.5,
                };
                const img = cell.richText(options);
                expect(img.props.width).to.eql(750);
                expect(img.props.height).to.eql(75);
                expect(img.props.style.width).to.eql(500);
                expect(img.props.style.height).to.eql(50);
            })
            it ('should apply rounding in calculation with pixel ratio', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 50,
                    imageWidth: 500,
                    devicePixelRatio: 4 / 3,
                };
                const img = cell.richText(options);
                const src = img.props.src;
                // crop image vertically, 1000x500 -> 1000x100,
                // centering, then resize to 667x67
                expect(src).to.contain('cr0-200-1000-100+re667-67');
            })
            it ('should allow adjustment of quality', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 100,
                    imageFilters: {
                        quality: 50,
                    }
                };
                const img = cell.richText(options);
                const src = img.props.src;
                expect(src).to.contain('q50');
            })
            it ('should prepend URL with server address', async function() {
                const file = await loadTestFile('test-1');
                const cell = file.filter('en').get([ 'Sheet1', 'image', 0 ]);
                const options = {
                    imageHeight: 50,
                    imageWidth: 500,
                    imageServer: 'http://localhost',
                };
                const img = cell.richText(options);
                const src = img.props.src;
                expect(src).to.contain('http://localhost');
            })
        })
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
