'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/**
 * @author flyerjay
 * @desc generate index.html & auto inject output file
 */

function readFile(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.resolve(process.cwd(), file), function (err, body) {
      if (!err) {
        resolve(Buffer.from(body).toString('utf-8'));
      } else {
        resolve('');
      }
    });
  });
}

var src = function src() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var file = options.template;
  var _template = "<!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n        <title>rollup-plugin-html</title>\n    </head>\n    <body>\n    </body>\n    </html>";
  return {
    name: 'rollup-plugin-html',
    onwrite: function () {
      var _onwrite = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(config) {
        var folder, template, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                folder = config.file.split('/')[0];
                _context.next = 3;
                return readFile(file);

              case 3:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 6;
                  break;
                }

                _context.t0 = _template;

              case 6:
                template = _context.t0;
                template = template.replace(/<body>([\s\S]*)<\/body>/, function (template, body) {
                  var src = path.relative(folder, config.file);

                  if (src.charAt(0) !== '.') {
                    src = './' + src;
                  }

                  return "<body>".concat(body, "<script src=\"").concat(src, "\"></script></body>");
                });
                data = new Uint8Array(Buffer.from(template));
                _context.next = 11;
                return new Promise(function (resolve, reject) {
                  fs.writeFile('dist/index.html', data, function (err) {
                    if (!err) {
                      resolve();
                    } else {
                      reject(err);
                    }
                  });
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onwrite(_x) {
        return _onwrite.apply(this, arguments);
      }

      return onwrite;
    }()
  };
};

module.exports = src;
//# sourceMappingURL=rollup-plugin-html.cjs.js.map
