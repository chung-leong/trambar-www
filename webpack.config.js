const _ = require('lodash');
const Path = require('path');
const FS = require('fs');
const Webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: Path.resolve('./src/index.mjs'),
    output: {
        path: Path.resolve('./dist'),
        filename: 'index.js',
    },
    resolve: {
        extensions: [ '.js', '.mjs' ],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                type: 'javascript/auto',
                query: {
                    presets: [
                        [ 'env', { modules: false } ],
                        'react',
                        'stage-0',
                    ],
                    plugins: [
                        'syntax-async-functions',
                        'syntax-class-properties',
                        'transform-regenerator',
                        'transform-runtime',
                    ],
                }
            },
        ]
    },
    devtool: 'source-map',
};
