import Server from 'karma-server-side';

const serverProxy = {
  start: function(port) {
    return Server.run(port, function(port) {
      var TestServer = serverRequire('./test/server/server-node');
      return TestServer.start(port);
    });
  },
  stop: function() {
    return Server.run(function() {
      var TestServer = serverRequire('./test/server/server-node');
      return TestServer.stop();
    });
  },
};

const testData = {};

async function fetchTestData(url) {
  let data = testData[url];
  if (!data) {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    data = testData[url] = await res.json();
  }
  return data;
}

export {
  serverProxy as default,
  fetchTestData,
};
