'use strict';

const { EventEmitter } = require('events');

const memory = [];

const bytesToMb = bytes => Math.round(bytes / 1000, 2) / 1000;

const ee = new EventEmitter();

const timer = setInterval(() => {
  ee.on('eventName', () => {});
}, 5);

setInterval(() => {
  console.clear();
  const usage = process.memoryUsage();
  const row = {
    rss: bytesToMb(usage.rss),
    heapTotal: bytesToMb(usage.heapTotal),
    heapUsed: bytesToMb(usage.heapUsed),
    external: bytesToMb(usage.external),
    listeners: ee.listeners('eventName').length
  };
  memory.push(row);
  console.table(memory);
}, 1000);

setTimeout(() => {
  clearInterval(timer);
}, 10000);

setTimeout(() => {
  process.exit(0);
}, 15000);

process.on('warning', warning => {
  console.dir(warning);
  process.exit(0);
});
