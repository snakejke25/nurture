'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasWatchman;

var _child_process = require('child_process');

function hasWatchman() {
  try {
    (0, _child_process.execSync)('watchman version', { silent: true, stdio: [] });
    return true;
  } catch (err) {
    return false;
  }
}
//# sourceMappingURL=has-watchman.js.map