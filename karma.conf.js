module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'dist/keycoder.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'dist/keycoder.js': 'coverage'
    },
    reporters: ['progress', 'coverage'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};