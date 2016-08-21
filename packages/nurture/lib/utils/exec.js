'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-console */


exports.default = exec;

var _child_process = require('child_process');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exec(command, options, config) {
  return new Promise((resolve, reject) => {
    const stdio = ['inherit', config.stdout ? 'pipe' : 'inherit', config.stderr ? 'pipe' : 'inherit'];
    const child = (0, _child_process.spawn)(command, _extends({}, options, { stdio }));
    let stdout;
    if (config.stdout) {
      stdout = config.stdout();
      child.stdout.pipe(stdout).pipe(process.stdout);
    }
    let stderr;
    if (config.stderr) {
      stderr = config.stderr();
      child.stderr.pipe(stderr).pipe(process.stderr);
    }
    child.on('exit', code => {
      if (code !== 0) {
        console.log(`
> ${ _chalk2.default.red('ERROR') } [${ options.cwd }]
> '${ command }': exited with code ${ code }
`);
      }
      if (stdout) {
        stdout.unpipe();
      }
      if (stderr) {
        stderr.unpipe();
      }
      resolve();
    });
    child.on('error', reject);
  });
}
//# sourceMappingURL=exec.js.map