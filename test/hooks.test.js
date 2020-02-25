import { delay } from 'bluebird';
import React, { useMemo, useEffect } from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Server from './server/server.js';

import Relaks, {
  useEnv,
  useEnvMonitor,
  usePlainText,
  useRichText,
  useLanguage,
  useLanguageSpecific,
  useLocalized,

  useProgress,
  useEventTime,

  Env,
  DataSource,
  Gitlab,
  Excel,
  LocaleManager,
  LocaleManagerProxy,
} from '../src/index.mjs';

const serverPort = 8111;
const serverAddress = `http://localhost:${serverPort}`;

describe('Hooks', function() {
  before(function() {
    return Server.start(serverPort);
  })
  after(function() {
    return Server.stop();
  })
  beforeEach(function() {
    configure({ adapter: new Adapter });
  })
  describe('#useEnv()', function() {
    it('should return context object', async function() {
      const Test = (props) => {
        const env = useEnv();
        return <div>{env.test}</div>;
      };
      const wrapper = mount(
        <Env.Provider value={{ test: 'Hello' }}>
          <Test />
        </Env.Provider>
      );
      const text = wrapper.text();
      expect(text).to.equal('Hello');
    })
  })
  describe('#useEnvMonitor()', function() {
    it('should return object containing browser id', async function() {
      const Test = (props) => {
        const env = useEnv();
        return <div>{env.test} {env.browser}</div>;
      };
      const Container = (props) => {
        const env = useEnvMonitor({ test: 'Hello' });
        return (
          <Env.Provider value={env}>
            <Test />
          </Env.Provider>
        );
      };
      const wrapper = mount(<Container />);
      const text = wrapper.text();
      expect(text).to.equal('Hello chrome');
    })
  })
  describe('#usePlainText()', function() {
    it('should return a function that yields plain text from Text objects', async function() {
      const Test = Relaks.memo(async (props) => {
        const { db } = props;
        const [ show ] = useProgress();
        const pt = usePlainText();

        show(<div />)
        const page = await db.fetchWikiPage('repo2', 'test-2');
        show(<div>{pt(page.content)}</div>);
      });
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const wrapper = mount(<Test db={dataSource} />);
      await delay(25);
      wrapper.update();
      const text = wrapper.text();
      const expected = `
Hello

World

This is a test and this is only a test.

Look at this picture: [internal image].

Look at this one too: [external image]

* Internal link
* Another internal link
* External link
      `.trim();
      expect(text).to.equal(expected);
    })
    it('should return a function that can handle strings as input', async function() {
      const Test = Relaks.memo(async (props) => {
        const { db } = props;
        const [ show ] = useProgress();
        const pt = usePlainText();

        show(<div />)
        const page = await db.fetchWikiPage('repo2', 'test-2');
        show(<div>{pt(page.title)}</div>);
      });
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const wrapper = mount(<Test db={dataSource} />);
      await delay(25);
      wrapper.update();
      const text = wrapper.text();
      expect(text).to.equal('test 2');
    })
  })
  describe('#useRichText()', function() {
    it('should return a function that yields rich text from Text objects', async function() {
      const Test = Relaks.memo(async (props) => {
        const { db } = props;
        const [ show ] = useProgress();
        const rt = useRichText();

        show(<div />)
        const page = await db.fetchWikiPage('repo2', 'test-2');
        show(<div>{rt(page.content)}</div>);
      });
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const wrapper = mount(<Test db={dataSource} />);
      await delay(25);
      wrapper.update();
      const html = wrapper.html();
      const expected = `
<div>
  <h1 id="hello">Hello</h1>
  <h2 id="world">World</h2>
  <p>This is a test and this is only a test.</p>
  <p>Look at this picture: <img src="/srv/media/1234567890" alt="internal image">.</p>
  <p>Look at this one too: <img src="https://via.placeholder.com/350x150" alt="external image"></p>
  <ul>
    <li><a href="home">Internal link</a></li>
    <li>Another <a href="elsewhere">internal link</a></li>
    <li><a href="http://www.bbc.co.uk">External link</a></li>
  </ul>
</div>
      `.trim().replace(/>\s+</g, '><');
      expect(html).to.equal(expected);
    })
    it('should return a function that can handle strings as input', async function() {
      const Test = Relaks.memo(async (props) => {
        const { db } = props;
        const [ show ] = useProgress();
        const rt = useRichText();

        show(<div />)
        const page = await db.fetchWikiPage('repo2', 'test-2');
        show(<div>{rt(page.title)}</div>);
      });
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const wrapper = mount(<Test db={dataSource} />);
      await delay(25);
      wrapper.update();
      const html = wrapper.html();
      expect(html).to.equal('<div>test 2</div>');
    })
    it('should make use of renderFunc', async function() {
      const Test = Relaks.memo(async (props) => {
        const { db } = props;
        const [ show ] = useProgress();
        const renderFunc = (node, key) => {
          if (node.type === 'img') {
            return <span key={key}>[{node.props.alt}]</span>
          } else if (node.type === 'h2') {
            return null;
          }
        };
        const rt = useRichText({ renderFunc });

        show(<div />)
        const page = await db.fetchWikiPage('repo2', 'test-2');
        show(<div>{rt(page.content)}</div>);
      });
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const wrapper = mount(<Test db={dataSource} />);
      await delay(25);
      wrapper.update();
      const html = wrapper.html();
      const expected = `
<div>
  <h1 id="hello">Hello</h1>
  <p>This is a test and this is only a test.</p>
  <p>Look at this picture: <span>[internal image]</span>.</p>
  <p>Look at this one too: <span>[external image]</span></p>
  <ul>
    <li><a href="home">Internal link</a></li>
    <li>Another <a href="elsewhere">internal link</a></li>
    <li><a href="http://www.bbc.co.uk">External link</a></li>
  </ul>
</div>
      `.trim().replace(/>\s+</g, '><');
      expect(html).to.equal(expected);
    })
  })
  describe('#useLanguage()', function() {
    it('should return from locale object stored in context', async function() {
      const Test = (props) => {
        const lang = useLanguage();
        return <div>{lang}</div>;
      };
      const wrapper = mount(
        <Env.Provider value={{ locale: { language: 'en-us' }}}>
          <Test />
        </Env.Provider>
      );
      const text = wrapper.text();
      expect(text).to.equal('en-us');
    })
  })
  describe('#useLanguageSpecific()', function() {
    it('should return a function that yields language specific text', async function() {
      const Test = Relaks.memo(async (props) => {
        const { db } = props;
        const [ show ] = useProgress();
        const ls = useLanguageSpecific();
        const pt = usePlainText();

        show(<div />)
        const page = ls(await db.fetchWikiPage('repo1', 'test-1'));
        show(<div>{pt(page.content)}</div>);
      });
      const options = { baseURL: serverAddress };
      const dataSource = new DataSource([ Gitlab ], options);
      dataSource.activate();
      const wrapper = mount(
        <Env.Provider value={{ locale: { language: 'en-au' }}}>
          <Test db={dataSource} />
        </Env.Provider>
      );
      await delay(25);
      wrapper.update();
      const text = wrapper.text();
      const expected = `
My Dear Dingo Donuts

Visit our store in Sydney.

Copyright
      `.trim();
      expect(text).to.equal(expected);
    })
  })
  describe('#useLocalized()', function() {
    it('should use localize() of locale object in env context', async function() {
      const dataSourceOptions = { baseURL: serverAddress };
      const dataSource = new DataSource([ Excel ], dataSourceOptions);
      dataSource.activate();
      const loadFunc = async (lang) => {
        const file = await dataSource.fetchExcelFile('test-3');
        const fileLS = file.getLanguageSpecific(lang);
        const dict = fileLS.getDictionary({ richText: true });
        return dict;
      };
      const localeManagerOptions = { loadFunc };
      const localeManager = new LocaleManager(localeManagerOptions);
      localeManager.activate();
      await localeManager.start('en');
      const Test = (props) => {
        const t = useLocalized();
        return <div>{t('macbeth')}</div>
      };
      const Container = (props) => {
        const { localeManager } = props;
        const [ localeChanged, setLocaleChanged ] = useEventTime();
        const locale = useMemo(() => {
          return new LocaleManagerProxy(localeManager);
        }, [ localeManager, localeChanged ])
        const env = useEnvMonitor({ locale });

        useEffect(() => {
          localeManager.addEventListener('change', setLocaleChanged);
          return () => {
            localeManager.removeEventListener('change', setLocaleChanged);
          }
        }, [ localeManager ]);

        return (
          <Env.Provider value={env}>
            <Test db={dataSource} />
          </Env.Provider>
        );
      };

      const props = { localeManager };
      const wrapper = mount(<Container {...props} />);
      const html1 = wrapper.html();
      const expected1 = `<div><span>Full of sound and </span><span style="font-weight: bold;">fury</span><span>, signifying </span><span style="font-style: italic;">nothing</span><span>.</span></div>`;
      expect(html1).to.equal(expected1);

      await localeManager.set('pl');
      const html2 = wrapper.html();
      const expected2 = `<div><span>Głośną, </span><span style="font-weight: bold;">wrzaskliwą</span><span>, a </span><span style="font-style: italic;">nic</span><span> nie znaczącą.</span></div>`;
      expect(html2).to.equal(expected2);
    })
  })
})