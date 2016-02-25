#!/usr/bin/env node

/*jslint node: true */
'use strict';

const colors = require('colors/safe');
const Table = require('cli-table2');
const trace = require('../');
const util = require('util');

const store = new trace.RedisStore({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

const fmt = '%s\t\t%s\t\t%s\t\t%s\t\t%s';

store.list(0, -1, function (err, result) {

  store.close();

  var table = new Table({
    head: [
      colors.white('#'),
      colors.green('correlationId / cid'),
      colors.green('service name'),
      colors.green('queue / routingKey'),
      colors.green('type'),
      colors.green('direction'),
      colors.green('date')
    ],
    colWidths: [5, 35, 30, 30, 30, 11, 42]
  });

  let i = 0;

  result.reverse().forEach((r) => {

    i++;

    let tokens = r.split(':');
    let date = new Date(tokens[0] * 1000);
    let cid = tokens[1];
    let serviceName = tokens[2];
    let queueName = tokens[3];
    let type = tokens[4];
    let direction = tokens[5];

    var map = {
      in: 'inbound',
      out: 'outbound'
    };

    table.push([
      i,
      cid,
      serviceName,
      queueName,
      type,
      map[direction],
      date.toString()
    ]);

  });

  console.log(table.toString());

});