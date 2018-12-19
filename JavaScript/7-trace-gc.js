'use strict';

let k = 0;

const collection = {};

setInterval(() => {
  k++;
  const key = 'globalVariable' + k;
  collection[key] = new Array(1000).fill(key);
}, 5);
