module.exports = function(config) {
  config.set({
    // Test files
    basePath: '../',
    files: ['resizeend.js', 'test/test.js'],

    // Test settings
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
    frameworks: ['jasmine'],
    singleRun: true,

    // Test output
    logLevel: config.LOG_WARN
  });
};
