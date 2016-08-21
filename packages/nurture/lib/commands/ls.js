'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-console */


const ls = (() => {
  var _ref = _asyncToGenerator(function* () {
    console.log(`Uasage:
  nurture <target>...

Examples:
  nurture build
  nurture build test

  `);
    console.log(_chalk2.default.bold(_chalk2.default.yellow('Targets:')));
    const targets = yield (0, _.listTargets)();
    Object.keys(targets).forEach(function (target) {
      console.log(_chalk2.default.yellow(target));
      targets[target].forEach(function (defs) {
        console.log(`  ${ _chalk2.default.gray(defs.wd) }`);
        defs.data.forEach(function (d) {
          const appending = d.appendFiles ? _chalk2.default.magenta('appendFiles') : '';
          const patterns = _chalk2.default.dim(_chalk2.default.green(d.patterns.join(', ')));
          console.log(`    ${ patterns } ${ d.command } ${ appending }`);
        });
      });
    });
  });

  return function ls() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = ls;
//# sourceMappingURL=ls.js.map