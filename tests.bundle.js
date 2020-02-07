const requireTest = require.context('./test', true, /\.test\.mjs$/);
const files = requireTest.keys();
// run each of them
for (let file of files) {
  if (/wordpress/.exec(file)) {
    requireTest(file);
  }
}
