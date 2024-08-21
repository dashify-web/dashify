'use strict';

const providers = require('..');
const assert = require('assert').strict;

assert.strictEqual(providers(), 'Hello from providers');
console.info('providers tests passed');
