var sourceFiles = require('./source-files');

var configMaker = function(settings) {

  var config = {
    frameworks: [],
    preprocessors: {},
    reporters: [],
    browsers: []
  };

  config.basePath = '';
  config.singleRun = true;
  config.colors = true;
  config.autoWatch = false;
  config.files = sourceFiles;
  config.files.push('test/**/*Spec.js');

  //Frameworks
  config.frameworks.push('mocha');
  config.frameworks.push('chai-spies');
  config.frameworks.push('chai');

  //Reporters
  config.reporters.push('progress');
  config.reporters.push('coverage');
  if(settings.reportToCoveralls) {
    config.reporters.push('coveralls');
    config.coverageReporter = {
      type: 'lcov'
    };
  }

  //Pre-processors
  config.preprocessors['src/**/*.js'] = 'coverage';

  //Browsers
  config.browsers.push('PhantomJS');

  return function(karmaConfig) {
    config.logLevel = karmaConfig.LOG_ERROR;
    karmaConfig.set(config);
  };

};

module.exports = configMaker;