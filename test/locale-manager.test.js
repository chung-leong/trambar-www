import { renderToStaticMarkup } from 'react-dom/server';
import { expect } from 'chai';
import Server, { fetchTestData } from './server/server.js';
import { Parser, JSONRenderer } from 'mark-gor';

import {
  LocaleManager,
  ExcelFile,
  Text,
} from '../src/index.mjs';

const serverPort = 7721;
const serverAddress = `http://localhost:${serverPort}`;

describe('LocaleManager', function() {
  before(function() {
    return Server.start(serverPort);
  })
  after(function() {
    return Server.stop();
  })
  it('should use strings from an Excel file', async function() {
    const loadFunc = async (language) => {
      const identifiers = [ 'test-3' ];
      const objectURL = ExcelFile.getObjectURL(identifiers);
      const fullURL = `${serverAddress}/data/${objectURL}`;
      const data = await fetchTestData(fullURL);
      const file = new ExcelFile(identifiers, data);
      const fileLang = file.getLanguageSpecific(language);
      const dict = fileLang.getDictionary();
      return dict;
    };
    const options = { loadFunc };
    const localeManager = new LocaleManager(options);
    localeManager.activate();
    await localeManager.start('pl');
    const helloPL = localeManager.localize('hello');
    const worldPL = localeManager.localize('world');
    const macbethPL = localeManager.localize('macbeth');
    expect(helloPL).to.eql('Cześć');
    expect(worldPL).to.eql('Świat');
    expect(macbethPL).to.eql('Głośną, wrzaskliwą, a nic nie znaczącą.');

    await localeManager.set('en');
    const helloEN = localeManager.localize('hello');
    const worldEN = localeManager.localize('world');
    const macbethEN = localeManager.localize('macbeth');
    expect(helloEN).to.eql('Hello');
    expect(worldEN).to.eql('World');
    expect(macbethEN).to.eql('Full of sound and fury, signifying nothing.');
  })
  it('should use strings from HTML', async function() {
    const loadFunc = async (language) => {
      const html = `
<h1>(en)</h1>
  <h2>hello</h2>
  <p>Hello</p>
  <h2>world</h2>
  <p>World</p>

<h1>(pl)</h1>
  <h2>hello</h2>
  <p>Cześć</p>
  <h2>world</h2>
  <p>Świat</p>
      `;
      const parser = new Parser({ htmlOnly: true });
      const renderer = new JSONRenderer;
      const tokens = parser.parse(html);
      const json = renderer.render(tokens);
      const text = new Text({ json });
      const textLang = text.getLanguageSpecific(language);
      const dict = textLang.getDictionary();
      return dict;
    };
    const options = { loadFunc };
    const localeManager = new LocaleManager(options);
    localeManager.activate();
    await localeManager.start('pl');
    const helloPL = localeManager.localize('hello');
    const worldPL = localeManager.localize('world');
    expect(helloPL).to.eql('Cześć');
    expect(worldPL).to.eql('Świat');

    await localeManager.set('en');
    const helloEN = localeManager.localize('hello');
    const worldEN = localeManager.localize('world');
    expect(helloEN).to.eql('Hello');
    expect(worldEN).to.eql('World');
  })
  it('should use strings from Markdown', async function() {
    const loadFunc = async (language) => {
      const markdown = `
# (en)

## hello
Hello

## world
World

# (pl)

## hello
Cześć

## world
Świat
      `;
      const parser = new Parser;
      const renderer = new JSONRenderer;
      const tokens = parser.parse(markdown);
      const json = renderer.render(tokens);
      const text = new Text({ json });
      const textLang = text.getLanguageSpecific(language);
      const dict = textLang.getDictionary();
      return dict;
    };
    const options = { loadFunc };
    const localeManager = new LocaleManager(options);
    localeManager.activate();
    await localeManager.start('pl');
    const helloPL = localeManager.localize('hello');
    const worldPL = localeManager.localize('world');
    expect(helloPL).to.eql('Cześć');
    expect(worldPL).to.eql('Świat');

    await localeManager.set('en');
    const helloEN = localeManager.localize('hello');
    const worldEN = localeManager.localize('world');
    expect(helloEN).to.eql('Hello');
    expect(worldEN).to.eql('World');
  })
  it('should handle date as input', async function() {
    const localeManager = new LocaleManager;
    localeManager.activate();
    await localeManager.start('pl');
    const date = new Date('2001-04-05 18:00:00.000Z');
    const datePL = localeManager.localize(date);
    const dateFullPL = localeManager.localize(date, { dateStyle: 'full' });
    expect(datePL).to.eql('5.04.2001, 20:00:00');
    expect(dateFullPL).to.eql('czwartek, 5 kwietnia 2001');

    await localeManager.set('en');
    const dateEN = localeManager.localize(date);
    const dateFullEN = localeManager.localize(date, { dateStyle: 'full' });
    expect(dateEN).to.eql('4/5/2001, 8:00:00 PM');
    expect(dateFullEN).to.eql('Thursday, April 5, 2001');
  })
})
