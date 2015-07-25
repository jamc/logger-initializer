var logger      = require('winston');
var moment      = require('moment');
var util        = require('util');
var appRoot     = require('app-root-path');
var packageJson = require(appRoot + '/package.json');

module.exports = function initLogger(logLevel) {
  if (!logger.initialized) {
    logger.level        = logLevel || 'warn';
    logger.initialized  = true;
    logger.remove(logger.transports.Console);
    logger.add(logger.transports.Console, {
      timestamp: function() {
        return moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      },
      formatter: function(options) {
        var timestamp = options.timestamp();
        var appName   = packageJson.name;
        var logLevel  = options.level.toUpperCase();
        var message   = ( undefined !== options.message ? options.message : '' );
        var meta      = (options.meta && Object.keys(options.meta).length ? ' - ' + util.inspect(options.meta) : '' );

        return '[' + timestamp + '] (' + appName + ') ' + logLevel + ' - ' + message + meta;
      }
    });
    logger.silly('Winston initialized');
  }
  return logger;
};