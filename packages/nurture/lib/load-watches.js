'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let loadWatches = (() => {
  var _ref = _asyncToGenerator(function* () {
    const watchFiles = yield (0, _findFiles2.default)('.watch', process.cwd(), ['**/node_modules', '.git']);
    const files = yield Promise.all(watchFiles.map((() => {
      var _ref2 = _asyncToGenerator(function* (file) {
        try {
          const data = yield fs.readFile(file);
          return { wd: _path2.default.dirname(file), data: JSON.parse(data) };
        } catch (err) {
          console.error(`Failed to read ${ file }`);
          throw err;
        }
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })()));
    if (files.length === 0) {
      throw new Error('found no .watch files');
    }
    return files;
  });

  return function loadWatches() {
    return _ref.apply(this, arguments);
  };
})();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _findFiles = require('./utils/find-files');

var _findFiles2 = _interopRequireDefault(_findFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-console */


const fs = (0, _pify2.default)(_fs2.default);

exports.default = loadWatches;
//# sourceMappingURL=load-watches.js.map