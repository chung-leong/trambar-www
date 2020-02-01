const requireTest = require.context('./test', true, /\.test\.mjs$/);
const files = requireTest.keys();
// run each of them
for (let file of files) {
  if (/excel\.test\.mjs/.exec(file)) {
    requireTest(file);
  }
}
