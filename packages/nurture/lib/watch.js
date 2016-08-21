'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let exec = (() => {
  var _ref = _asyncToGenerator(function* (wd, command, files, appendFiles, config) {
    if (files.length === 0) {
      return;
    }

    let commandToRun;
    if (appendFiles) {
      commandToRun = `${ command } ${ files.join(' ') }`;
    } else {
      commandToRun = command;
    }

    console.log(`\n> ${ _chalk2.default.green('Watch triggered at') }: ${ wd }\n> ${ commandToRun }`);
    const options = { shell: true, cwd: wd, env: process.env };
    yield (0, _exec2.default)(commandToRun, options, config);
  });

  return function exec(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
})();

var _sane = require('sane');

var _sane2 = _interopRequireDefault(_sane);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _async = require('async');

var _exec = require('./utils/exec');

var _exec2 = _interopRequireDefault(_exec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
/* eslint-disable no-console */


const check = bool => bool ? _chalk2.default.green('✓') : _chalk2.default.red('✗');

const printDefinition = (wd, {
  change,
  add,
  delete: del,
  command,
  patterns
}) => {
  let warning = '';
  if (change === false && del === false && add === false) {
    warning = `\n${ _chalk2.default.yellow('WARNING') }: not listening to any triggers`;
    return;
  }

  console.log(`
> Watching ${ wd }
> Patterns: ${ patterns.join(', ') }
> Command: '${ command }'
> Triggers: add ${ check(add) } change ${ check(change) } delete ${ check(del) } ${ warning }`);
};

exports.default = watchman => {
  const spinner = (0, _ora2.default)('Watching for changes');
  const startSpinner = () => {
    spinner.start();
  };

  const taskQueue = (0, _async.queue)((fn, cb) => {
    fn().then(cb).catch(err => {
      console.error('Task failed', err);
      cb();
    });
  }, 1);
  taskQueue.drain = startSpinner;

  const addDefinition = (wd, config = {}) => ({
    patterns,
    command,
    appendFiles = false,
    add = true,
    delete: del = false,
    change = true
  }) => {
    const watchDefinition = {
      patterns,
      command,
      appendFiles,
      add,
      delete: del,
      change
    };

    printDefinition(wd, watchDefinition);

    const watcher = (0, _sane2.default)(wd, { glob: patterns, watchman });
    const newChanges = new Set();

    const newChange = file => {
      newChanges.add(file);
      taskQueue.push(_asyncToGenerator(function* () {
        spinner.stop();
        const files = Array.from(newChanges);
        newChanges.clear();

        yield exec(wd, command, files, appendFiles, config);
      }));
    };

    if (change) {
      watcher.on('change', newChange);
    }
    if (add) {
      watcher.on('add', newChange);
    }
    if (del) {
      watcher.on('delete', newChange);
    }
  };

  return {
    add: addDefinition,
    start: startSpinner
  };
};
//# sourceMappingURL=watch.js.map