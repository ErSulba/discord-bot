const assert = require('assert');
const config = require('../src/config.json');

assert.ok(config.prefix, 'prefix should be defined');
assert.ok(config.permissions, 'permissions should be defined');
console.log('Tests passed');

