module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/exports.js',
      'src/modules/Util.js',
      'src/modules/KeyData.js',
      'src/modules/Key.js',
      'src/modules/Keycoder.js',
      'test/**/*Spec.js'
    ],
    preprocessors: {
      'src/**/*.js': 'coverage'
    },
    reporters: ['progress', 'coverage'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};