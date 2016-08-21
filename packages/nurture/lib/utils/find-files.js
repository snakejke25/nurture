'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let findFiles = (() => {
  var _ref2 = _asyncToGenerator(function* (filename, workdir, ignore = []) {
    let walk = (() => {
      var _ref3 = _asyncToGenerator(function* (dir) {
        try {
          const stats = yield fs.stat(dir);
          if (stats.isFile() && _path2.default.basename(dir) === filename) {
            files.push(dir);
          } else if (stats.isDirectory()) {
            const visit = !(yield shouldSkip(dir));
            if (visit) {
              const dirs = yield fs.readdir(dir);
              yield Promise.all(dirs.map((() => {
                var _ref4 = _asyncToGenerator(function* (child) {
                  return yield walk(_path2.default.join(dir, child));
                });

                return function (_x6) {
                  return _ref4.apply(this, arguments);
                };
              })()));
            }
          }
        } catch (e) {
          return;
        }
      });

      return function walk(_x5) {
        return _ref3.apply(this, arguments);
      };
    })();

    const files = [];
    const shouldSkip = isIgnored(workdir, ignore);

    yield walk(workdir);
    return files;
  });

  return function findFiles(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const fs = (0, _pify2.default)(_fs2.default);

const isIgnored = (workdir, patterns) => {
  const re = new RegExp(`^${ (0, _escapeStringRegexp2.default)(workdir) }`);
  return (() => {
    var _ref = _asyncToGenerator(function* (file) {
      return (yield patterns).some(function (pattern) {
        return (0, _minimatch2.default)(file.replace(re, ''), pattern);
      });
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })();
};

exports.default = findFiles;
//# sourceMappingURL=find-files.js.map