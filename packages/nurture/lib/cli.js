#!/usr/bin/env node
'use strict';

require('loud-rejection/register');

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _ls = require('./commands/ls');

var _ls2 = _interopRequireDefault(_ls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.argv.length > 2) {
  (0, _2.default)(process.argv.slice(2));
} else {
  (0, _ls2.default)();
}
/* eslint-disable global-require, import/newline-after-import */
//# sourceMappingURL=cli.js.map