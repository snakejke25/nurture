'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findUp = require('find-up');

var _findUp2 = _interopRequireDefault(_findUp);

var _multipipe = require('multipipe');

var _multipipe2 = _interopRequireDefault(_multipipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const getConfig = (() => {
  var _ref = _asyncToGenerator(function* () {
    const configFile = yield (0, _findUp2.default)('.nurture.js');
    if (!configFile) {
      return {};
    }
    const config = require(configFile); // eslint-disable-line

    Object.keys(config).map(function (phase) {
      return config[phase];
    }).forEach(function (phase) {
      if (phase.stdout && phase.stdout.length > 1) {
        const pipes = phase.stdout;
        phase.stdout = function () {
          return (0, _multipipe2.default)(...pipes.map(function (f) {
            return f();
          }));
        }; // eslint-disable-line
      } else if (phase.stdout && phase.stdout.length === 1) {
        phase.stdout = phase.stdout[0]; // eslint-disable-line
      }
      if (phase.stderr && phase.stderr.length > 1) {
        const pipes = phase.stderr;
        phase.stderr = function () {
          return (0, _multipipe2.default)(...pipes.map(function (f) {
            return f();
          }));
        }; // eslint-disable-line
      } else if (phase.stderr && phase.stderr.length === 1) {
        phase.stderr = phase.stderr[0]; // eslint-disable-line
      }
    });
    return config;
  });

  return function getConfig() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = getConfig;
//# sourceMappingURL=config.js.map