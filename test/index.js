/*jslint node: true */
'use strict';

const should = require('should');

let trace = require('../');

describe('servicebus-trace', () => {

  it('should persist service name, cid (or otherwise specified field), and message arrival datetime to redis', (done) => {

    var store = new trace.RedisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    });

    let options = {
      serviceName: 'test-service',
      store: store
    };

    var bus = require('servicebus').bus();
    bus.use(trace(options));

    let queueName = 'my.queue';
    let message = {
      cid: 'unique-cid',
      data: {},
      datetime: new Date()
    };

    bus.listen('test.queue', function (msg) {

      require('../bin/trace');

      setTimeout(function () {
        store.clear();

        store.close();

        done();
      }, 500);
    });

    bus.send('test.queue', { my: 'data'}, { type: 'bla', correlationId: bus.correlationId() });

  });

});