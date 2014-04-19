module.exports = function(config) {
  var customLaunchers = {
    SL_IE_11: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    SL_IE_10: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 8',
      version: '10'
    },
    SL_IE_9: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 7',
      version: '9'
    }
  };

  config.set({
    // Test files
    basePath: '../',
    files: ['resizeend.js', 'test/test.js'],

    // Test settings
    sauceLabs: {
      testName: 'resizeend.js tests'
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers).concat('PhantomJS'),
    frameworks: ['jasmine'],
    singleRun: true,

    // Test output
    logLevel: config.LOG_INFO,
    reporters: ['dots', 'saucelabs']
  });
};
