'use strict';

let k = 0;

let collection = {};

setInterval(() => {
  k++;
  const key = 'globalVariable' + k;
  collection[key] = new Array(1000).fill(key);
}, 5);

setInterval(() => {
  collection = {};
}, 15000);
