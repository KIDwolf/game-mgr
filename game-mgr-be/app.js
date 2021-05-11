const koa1 = require('koa');
const koa2 = require('./none_modules/koa/lib/application.js');
console.log(koa1 === koa2);