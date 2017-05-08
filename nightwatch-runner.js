const config = require('config')

module.exports = config.get('nightwatch.local')
  ? require('./runners/local')
  : require('./runners/default')
