const Babel = require('rollup-plugin-babel');
const Resolve = require('@rollup/plugin-node-resolve');
const CommonJS = require('@rollup/plugin-commonjs');

module.exports = [
  'index',
].map((name) => {
  return {
    input: `src/${name}.mjs`,
    output: {
      file: `./${name}.mjs`,
      format: 'esm'
    },
    plugins: [
      Babel({
        presets: [
          '@babel/env',
        ],
        plugins: [
        ]
      }),
      Resolve(),
      CommonJS(),
    ]
  };
});
