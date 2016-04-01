var sourceFiles = require('./source-files');

var files = sourceFiles;
files.push('test/**/*Spec.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: files,
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