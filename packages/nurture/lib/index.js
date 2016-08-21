'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTargets = undefined;

var _watch = require('./watch');

var _watch2 = _interopRequireDefault(_watch);

var _loadWatches = require('./load-watches');

var _loadWatches2 = _interopRequireDefault(_loadWatches);

var _hasWatchman = require('./utils/has-watchman');

var _hasWatchman2 = _interopRequireDefault(_hasWatchman);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
/* eslint-disable no-console */


const setupPhaseWatch = (definitions, watcher, config) => phase => {
  definitions.forEach(({ wd, data: phaseData }) => {
    if (!phaseData[phase]) {
      return;
    }
    const phaseWatches = phaseData[phase];
    phaseWatches.forEach(watcher.add(wd, config[phase]));
  });
};

const setupWatches = (() => {
  var _ref = _asyncToGenerator(function* (phase) {
    let phases;
    if (typeof phase === 'string') {
      phases = [phase];
    } else {
      phases = phase;
    }
    const [definitions, watchman, config] = yield Promise.all([(0, _loadWatches2.default)(), (0, _hasWatchman2.default)(), (0, _config2.default)()]);
    const watcher = (0, _watch2.default)(watchman, config);
    const setup = setupPhaseWatch(definitions, watcher, config);

    phases.forEach(setup);

    watcher.start();
  });

  return function setupWatches(_x) {
    return _ref.apply(this, arguments);
  };
})();

const listTargets = exports.listTargets = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    const definitions = yield (0, _loadWatches2.default)();
    const targets = {};
    definitions.forEach(function (def) {
      Object.keys(def.data).forEach(function (target) {
        targets[target] = targets[target] || [];
        targets[target].push({ wd: def.wd, data: def.data[target] });
      });
    });
    return targets;
  });

  return function listTargets() {
    return _ref2.apply(this, arguments);
  };
})();

exports.default = setupWatches;
//# sourceMappingURL=index.js.map