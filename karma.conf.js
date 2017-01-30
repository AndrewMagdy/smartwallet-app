var webpackConfig = require('./webpack.config.test.js')

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: true, //just run once by default
    frameworks: [ 'mocha', 'sinon-chai' ], //use the mocha test framework
    files: [
      'test/index.js' //just load this file
    ],
    preprocessors: {
      'test/index.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  })
}
