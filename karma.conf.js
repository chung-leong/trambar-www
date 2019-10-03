var Path = require('path');

module.exports = function(config) {
    config.set({
        port: 9876,
        logLevel: config.LOG_WARNING,
        autoWatch: true,
        singleRun: false,
        browsers: [ 'Chrome' ],
        frameworks: [ 'chai', 'mocha', 'server-side' ],
        files: [
            'tests.bundle.js',
        ],
        client: {
            args: parseTestPattern(process.argv),
        },
        preprocessors: {
            'tests.bundle.js': [ 'webpack', 'sourcemap' ]
        },
        plugins: [
            'karma-chai',
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-server-side',
        ],
        reporters: [ 'progress' ],

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.(js|mjs)$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        type: 'javascript/auto',
                        query: {
                            presets: [
                                [ '@babel/env', { modules: false } ],
                                [ '@babel/react' ],
                            ],
                            plugins: [
                                '@babel/proposal-class-properties',
                                '@babel/proposal-export-default-from',
                                '@babel/proposal-export-namespace-from',
                                '@babel/proposal-json-strings',
                                '@babel/proposal-nullish-coalescing-operator',
                                '@babel/proposal-optional-chaining',
                                '@babel/proposal-throw-expressions',
                                '@babel/syntax-dynamic-import',
                                '@babel/syntax-import-meta',
                                '@babel/transform-regenerator',
                                '@babel/transform-runtime',
                            ],
                        }
                    },
                ]
            },
        },

        webpackMiddleware: {
            noInfo: true,
        },
    })
};

function parseTestPattern(argv) {
    var index = argv.indexOf('--');
    var patterns = (index !== -1) ? argv.slice(index + 1) : [];
    if (patterns.length > 0) {
        return [ '--grep' ].concat(patterns);
    } else {
        return [];
    }
}
