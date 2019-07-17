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
