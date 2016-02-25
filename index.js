/*jslint node: true */
'use strict';

var RedisStore = require('./lib/redisStore');

module.exports = function servicebusTrace (options) {

  options = options || {};
  options.throwOnError = options.throwOnError || false;

  if ( ! options.serviceName ) throw new Error('please specify a serviceName');
  if ( ! options.store ) throw new Error('please specify a tracing store (RedisStore)');

  return {
    handleIncoming: function (channel, message, opts, next) {
      options.store.trace(options.serviceName,
                          message.fields.routingKey,
                          message.properties.type || message.content.type || '',
                          message.properties.correlationId || message.content.cid,
                          'in',
                          function (err) {
                            if (err && options.throwOnError) throw err;
                            next(null, channel, message, opts);
                          });
    },
    handleOutgoing: function (queueName, message, opts, next) {
      options.store.trace(options.serviceName,
                          queueName,
                          opts.type || '',
                          opts.correlationId || message.cid,
                          'out',
                          function (err) {
                            if (err && options.throwOnError) throw err;
                            next(null, queueName, message, opts);
                          });
    }
  };
};

module.exports.RedisStore = RedisStore;