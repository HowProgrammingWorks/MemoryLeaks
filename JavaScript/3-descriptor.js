'use strict';

const fs = require('node:fs');

const memory = [];

const bytesToMb = (bytes) => Math.round(bytes / 1000, 2) / 1000;

let descriptor = 0;

const timer = setInterval(() => {
  const handler = (err, fd) => {
    descriptor = fd;
  };
  for (let i = 0; i < 3; i++) {
    fs.open('3-descriptor.js', handler);
  }
}, 5);

setInterval(() => {
  console.clear();
  const usage = process.memoryUsage();
  const row = {
    rss: bytesToMb(usage.rss),
    heapTotal: bytesToMb(usage.heapTotal),
    heapUsed: bytesToMb(usage.heapUsed),
    external: bytesToMb(usage.external),
    stack: bytesToMb(usage.rss - usage.heapTotal),
    descriptor,
  };
  memory.push(row);
  console.table(memory);
}, 1000);

setTimeout(() => {
  clearInterval(timer);
}, 10000);

setTimeout(() => {
  console.log(descriptor);
  process.exit(0);
}, 15000);
