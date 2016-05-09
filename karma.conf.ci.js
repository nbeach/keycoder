var configMaker = require('./karma.conf.maker');

module.exports = configMaker({
  reportToCoveralls: true
});