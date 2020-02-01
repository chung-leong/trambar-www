import React, { ReactElement } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server, { fetchTestData } from './server/server.mjs';

import {
  ExcelFile,
  ExcelSheet,
  ExcelColumn,
  ExcelRow,
  ExcelCell,
} from '../index.mjs';

configure({ adapter: new Adapter });

const serverPort = 7711;
const serverAddress = `http://localhost:${serverPort}`;

describe('Excel', function() {
  before(() => {
    return Server.start(serverPort);
  })
  it('should be able to retrieve test data', async function() {
    const data = await loadTestData('test-1');
    expect(data.title).to.eql('Test file title');
    expect(data.description).to.eql('This is a test');
    expect(data.keywords).to.eql([ 'keyword1', 'keyword2', 'keyword3' ]);
    expect(data.subject).to.eql('Test subject');
  })
  describe('ExcelFile', function() {
    it('should include metadata from file', async function() {
      const data = await loadTestData('test-1');
      const file = await loadTestFile('test-1');
      expect(file.fileId).to.eql('test-1');
      expect(file.title).to.eql(data.title);
      expect(file.description).to.eql(data.description);
      expect(file.keywords).to.eql(data.keywords);
      expect(file.keywords).to.eql(data.keywords);
    })
    it('should have the right number of sheets', async function() {
      const file = await loadTestFile('test-1');
      expect(file.sheets).to.have.lengthOf(5);
    })
    describe('#getSheet()', function() {
      it('should return sheet with matching name', async function() {
        const file = await loadTestFile('test-1');
        const sheet1 = file.getSheet('Sheet1');
        expect(sheet1).to.have.property('name', 'Sheet1');
      })
      it('should return the first sheet when there are multiple sheet with the same name', async function() {
        const file = await loadTestFile('test-1');
        const sheet3 = file.getSheet('Names');
        expect(sheet3).to.have.property('name', 'Names');
        expect(sheet3).to.have.property('flags').that.eql([ 'en' ]);
      })
    })
    describe('#getAvailableLanguages()', function() {
      it('should return a list of available languages', async function() {
        const file = await loadTestFile('test-1');
        const languages = file.getAvailableLanguages();
        expect(languages).to.eql([ 'en', 'pl', 'ua' ]);
      })
      it('should return a list of available languages from columns', async function() {
        const file = await loadTestFile('test-2');
        const languages = file.getAvailableLanguages();
        expect(languages).to.eql([ 'en-us', 'en-gb', 'en-au', 'en-ie' ]);
      })
    })
    /*
    describe('#image()', function() {
      it('should return an image element based on a derived URL', async function() {
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
    */
  })
  describe('ExcelSheet', function() {
    it('should have the right number of rows and columns', async function() {
      const file = await loadTestFile('test-1');
      const [ sheet1, sheet2 ] = file.sheets;
      expect(sheet1.columns).to.have.lengthOf(3);
      expect(sheet1.rows).to.have.lengthOf(1);
      expect(sheet2.columns).to.have.lengthOf(6);
      expect(sheet2.rows).to.have.lengthOf(5);
    })
    it('should have flags extracted from name', async function() {
      const file = await loadTestFile('test-1');
      const [ ,, sheet3, sheet4, sheet5 ] = file.sheets;
      expect(sheet3.flags).to.eql([ 'en' ]);
      expect(sheet4.flags).to.eql([ 'pl' ]);
      expect(sheet5.flags).to.eql([ 'ua' ]);
      expect(sheet3.name).to.eql('Names');
      expect(sheet4.name).to.eql('Names');
      expect(sheet5.name).to.eql('Names');
    })
    describe('#getColumn()', function() {
      it('should return column with matching name', async function() {
        const file = await loadTestFile('test-1');
        const sheet1 = file.getSheet('Sheet1');
        const column1 = sheet1.getColumn('plain text')
        expect(column1).to.have.property('name', 'plain text');
      })
      it('should return the first column when there are multiple columns with the same name', async function() {
        const file = await loadTestFile('test-1');
        const sheet2 = file.getSheet('Sheet2');
        const column2 = sheet2.getColumn('picture')
        expect(column2).to.have.property('name', 'picture');
        expect(column2).to.have.property('flags').that.eql([ 'en', 'import' ]);
      })
    })
  })
  describe('ExcelColumn', function() {
    it('should have the right number of cells', async function() {
      const file = await loadTestFile('test-1');
      const sheet2 = file.sheets[1];
      const [ column1 ] = sheet2.columns;
      expect(column1.cells).to.have.lengthOf(5);
    })
    it('should have flags extracted from text', async function() {
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
    it('should have the right number of cells', async function() {
      const file = await loadTestFile('test-1');
      const sheet1 = file.sheets[0];
      const [ row1 ] = sheet1.rows;
      expect(row1.cells).to.have.lengthOf(3);
    })
    describe('#getColumn()', function() {
      it('should be able to find a cell', async function() {
        const file = await loadTestFile('test-1');
        const sheet1 = file.sheets[0];
        const [ row1 ] = sheet1.rows;
        const cell = row1.getColumn('rich text');
        expect(cell).to.be.instanceOf(ExcelCell);
      })
    })
  })
  describe('ExcelCell', function() {
    it('should handle cell with plain text', async function() {
      const file = await loadTestFile('test-1');
      const sheet = file.getSheet('Sheet1');
      const row = sheet.getRow(0);
      const cell = row.getColumn('plain text');
      expect(cell.type).to.eql('plain');
      expect(cell.content.getPlainText()).to.eql('This is a test');
    })
    it('should handle cell with rich text', async function() {
      const file = await loadTestFile('test-1');
      const sheet = file.getSheet('Sheet1');
      const row = sheet.getRow(0);
      const cell = row.getColumn('rich text');
      expect(cell.type).to.eql('rich');
      const fragment = cell.content.getRichText();
      const wrapper = mount(<div>{fragment}</div>);
      const html = wrapper.html();
      expect(html).to.eql('<div><span>This is </span><span style="font-weight: bold;">another</span><span> </span><span style="font-style: italic; text-decoration: underline;">test</span></div>');
    })
    it('should handle cell pointing to an image', async function() {
      const file = await loadTestFile('test-1');
      const sheet = file.getSheet('Sheet1');
      const row = sheet.getRow(0);
      const cell = row.getColumn('image');
      expect(cell.type).to.eql('image');
      const fragment = cell.content.getRichText();
      const wrapper = mount(<div>{fragment}</div>);
      const html = wrapper.html();
      expect(html).to.eql('<div><img src="http://localhost/srv/media/image/69b1510906ccacbb9363690cbb4bd257" width="1000" height="500"></div>');
    })
  })
  after(() => {
    return Server.stop();
  });
})

async function loadTestFile(identifier) {
  const data = await loadTestData(identifier);
  const file = new ExcelFile([ identifier ], data);
  return file;
}

async function loadTestData(identifier) {
  const objectURL = ExcelFile.getObjectURL([ identifier ]);
  const fullURL = `${serverAddress}/data/${objectURL}`;
  return fetchTestData(fullURL);
}
