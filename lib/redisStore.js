var debug = require('debug')('servicebus:retry:RedisStore');
var get = require('lodash.get');
var redis = require('redis');
var util = require('util');

function RedisStore (options) {

  options = options || {};

  if ( ! options.host) throw new Error('a host is required to instantiate a redis store');
  if ( ! options.port) throw new Error('a port is required to instantiate a redis store');

  debug('creating RedisStore with arguments %j', options);

  this.client = redis.createClient(options.port, options.host);

  this.key = 'servicebus-trace';
  this.keyFormat = options.keyFormat || '%s:%s:%s:%s:%s:%s';
  // this.keyExpireTTL = options.keyExpireTTL || options.ttl;
}

RedisStore.prototype.close = function () {
  this.client.end();
};

RedisStore.prototype.clear = function clear (cb) {
  this.client.del('servicebus-trace', cb);
};

RedisStore.prototype.list = function list (start, stop, cb) {
  this.client.lrange('servicebus-trace', start, stop, cb);
};

RedisStore.prototype.trace = function trace (serviceName, queueName, type, cid, direction, cb) {
  const token = util.format(this.keyFormat, new Date().getTime(), cid, serviceName, queueName, type, direction);
  debug('rpushing %s', token);
  var param = {
    'servicebus-trace': token
  }
  this.client.rpush('servicebus-trace', token, cb);
};

module.exports = RedisStore;