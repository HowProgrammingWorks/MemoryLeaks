'use strict';

const memory = [];
let k = 0;

const bytesToMb = bytes => Math.round(bytes / 1000, 2) / 1000;

setInterval(() => {
  k++;
  const key = 'globalVariable' + k;
  global[key] = new Array(1000).fill(key);
}, 10);

setInterval(() => {
  console.clear();
  const usage = process.memoryUsage();
  const row = {
    rss: bytesToMb(usage.rss),
    heapTotal: bytesToMb(usage.heapTotal),
    heapUsed: bytesToMb(usage.heapUsed),
    external: usage.external
  };
  memory.push(row);
  console.table(memory);
}, 1000);

setTimeout(() => {
  process.exit(0);
}, 10000);
