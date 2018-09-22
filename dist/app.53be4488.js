// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/components.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Line;
function Line(ctx, from, posTo, style) {
  var _this = this;

  this.posFrom = from;
  this.posTo = posTo;
  this.style = style;
  this.updated = false;

  this.update = function () {
    _this.draw();
  };

  this.draw = function () {
    ctx.beginPath();
    ctx.moveTo(_this.posFrom.x, _this.posFrom.y);
    ctx.lineTo(_this.posTo.x, _this.posTo.y);
    ctx.strokeStyle = _this.style.color;
    ctx.lineWidth = _this.style.width;
    ctx.stroke();
    ctx.closePath();
  };
}
},{}],"js/setup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var delta = 250; // distance between the (0, 0) of canvas and (x, y) of the arc center
var rad = 200; // radius of arc
var count = 30; // number of lines
var lineW = 40; // width of line

exports.delta = delta;
exports.rad = rad;
exports.count = count;
exports.lineW = lineW;
},{}],"js/createObjects.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx) {
  var outsideCircle = [];
  var insideCircle = [];
  // Loop for creating lines and add them to array
  for (var i = -3; i <= _setup.count + 3; i++) {
    // Create line for outside-circle
    // newX – X-coordinate for begining of line (same newY)
    // (newX + delta) or (newY - delta) * -1 means that we need to fix coordinates
    //const ... =  new Line(ctx, start coord of line, finish coord of line, style of line)
    var newX = Math.cos(i * Math.PI / _setup.count) * _setup.rad;
    var newY = Math.sin(i * Math.PI / _setup.count) * _setup.rad;
    var outsideLine = new _components2.default(ctx, {
      x: newX + _setup.delta,
      y: (newY - _setup.delta) * -1
    }, {
      x: newX - 40 * Math.cos(i * Math.PI / _setup.count) + _setup.delta,
      y: (newY - 40 * Math.sin(i * Math.PI / _setup.count) - _setup.delta) * -1
    }, {
      color: '#3E2F5B',
      width: 4
    });
    outsideCircle.push(outsideLine);

    // Create line for inside-circle    
    newX = Math.cos(i * Math.PI / _setup.count) * (_setup.rad - 60);
    newY = Math.sin(i * Math.PI / _setup.count) * (_setup.rad - 60);
    var insideLine = new _components2.default(ctx, {
      x: newX + _setup.delta,
      y: (newY - _setup.delta) * -1
    }, {
      x: newX - 10 * Math.cos(i * Math.PI / _setup.count) + _setup.delta,
      y: (newY - 10 * Math.sin(i * Math.PI / _setup.count) - _setup.delta) * -1
    }, {
      color: 'rgba(255, 255, 255, 0.2)',
      width: 3.5
    });
    insideCircle.push(insideLine);
  }

  return { outsideCircle: outsideCircle, insideCircle: insideCircle };
};

var _components = require('./components.js');

var _components2 = _interopRequireDefault(_components);

var _setup = require('./setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./components.js":"js/components.js","./setup":"js/setup.js"}],"js/extras.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distance = distance;
// Calculate distance between 2 points
function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
},{}],"js/colors.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// elements for obtaining vals
var val1El = '#ff3300'; // hot
var val2El = '#7597ff'; // cold
var stepsEl = 36;
console.log('here');

// process the value irrespective of representation type
function processValue(el) {
  return processHEX(el);
}

// return a workable RGB int array [r,g,b] from hex representation
function processHEX(val) {
  // does the hex contain extra char?
  var hex = val.length > 6 ? val.substr(1, val.length - 1) : val;
  // is it a six character hex?
  if (hex.length > 3) {
    // scrape out the numerics
    var r = hex.substr(0, 2);
    var g = hex.substr(2, 2);
    var b = hex.substr(4, 2);

    // if not six character hex,
    // then work as if its a three character hex
  } else {
    // just concat the pieces with themselves
    var r = hex.substr(0, 1) + hex.substr(0, 1);
    var g = hex.substr(1, 1) + hex.substr(1, 1);
    var b = hex.substr(2, 1) + hex.substr(2, 1);
  }
  // return our clean values
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}

function updateSpitter() {
  // attach start value
  var hasSpun = 0;
  // val1El.dataType = getType(val1El.value)
  // val2El.dataType = getType(val2El.value)

  var val1RGB = processValue(val1El);
  var val2RGB = processValue(val2El);
  var colors = []
  // somewhere to dump gradient

  // the pre element where we spit array to user

  // the number of steps in the gradient
  ;var stepsInt = stepsEl;
  // the percentage representation of the step
  var stepsPerc = 100 / (stepsInt + 1);

  // diffs between two values
  var valClampRGB = [val2RGB[0] - val1RGB[0], val2RGB[1] - val1RGB[1], val2RGB[2] - val1RGB[2]];

  // build the color array out with color steps
  for (var i = 0; i < stepsInt; i++) {
    var clampedR = valClampRGB[0] > 0 ? pad(Math.round(valClampRGB[0] / 100 * (stepsPerc * (i + 1))).toString(16), 2) : pad(Math.round(val1RGB[0] + valClampRGB[0] / 100 * (stepsPerc * (i + 1))).toString(16), 2);

    var clampedG = valClampRGB[1] > 0 ? pad(Math.round(valClampRGB[1] / 100 * (stepsPerc * (i + 1))).toString(16), 2) : pad(Math.round(val1RGB[1] + valClampRGB[1] / 100 * (stepsPerc * (i + 1))).toString(16), 2);

    var clampedB = valClampRGB[2] > 0 ? pad(Math.round(valClampRGB[2] / 100 * (stepsPerc * (i + 1))).toString(16), 2) : pad(Math.round(val1RGB[2] + valClampRGB[2] / 100 * (stepsPerc * (i + 1))).toString(16), 2);
    colors[i] = ['#', clampedR, clampedG, clampedB].join('');
  }
  return colors;
  // update the pre element
}
/**
   * padding function:
   * cba to roll my own, thanks Pointy!
   * ==================================
   * source: http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
   */
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var arr = updateSpitter();

exports.default = arr;
},{}],"js/init.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (canvas) {
  var ctx = canvas.getContext('2d');
  // Arrays with lines (not drawed yet)

  var _createObjects = (0, _createObjects3.default)(ctx),
      outsideCircle = _createObjects.outsideCircle,
      insideCircle = _createObjects.insideCircle;
  // Background
  // ctx.fillStyle = '#261132'


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw outside-circle lines
  var fl = false;
  outsideCircle.forEach(function (el, i) {
    el.style = {
      color: '#3E2F5B',
      width: 4
    };

    var fi = Math.acos((el.posTo.x - _setup.delta) / (0, _extras.distance)(el.posTo.x, el.posTo.y, _setup.delta, _setup.delta));
    if (el.posTo.x - _setup.delta > 0 && el.posTo.y - _setup.delta > 0) {
      fi = -fi;
    } else if (el.posTo.x - _setup.delta < 0 && el.posTo.y - _setup.delta > 0) {
      fi = 2 * Math.PI - fi;
    }
    // This return updated line to begining size
    if (el.updated) {
      el.updated = false;
      el.posFrom.x -= 20 * Math.cos(fi);
      el.posFrom.y += 20 * Math.sin(fi);
    }
    // If the angle of line > angle of pointer then change the line
    if (fi > 1) {
      el.style = {
        color: _colors2.default[i],
        width: 4
        // Change the size of first line
      };if (!fl) {
        fl = true;
        el.style = {
          color: '#ff5050',
          width: 6
        };
        el.updated = true;
        el.posFrom.x += 20 * Math.cos(fi);
        el.posFrom.y -= 20 * Math.sin(fi);

        value.innerHTML = Math.round(-fi * valueOfAngle) + 40;
      }
    }
    // Actually redraw the line
    el.update();
  });
  // Draw inside-circle lines
  insideCircle.forEach(function (el) {
    el.update();
  });
};

var _createObjects2 = require('./createObjects');

var _createObjects3 = _interopRequireDefault(_createObjects2);

var _setup = require('./setup');

var _extras = require('./extras');

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var value = document.getElementsByClassName('center')[0];
var valueOfAngle = _setup.count / Math.PI;
},{"./createObjects":"js/createObjects.js","./setup":"js/setup.js","./extras":"js/extras.js","./colors":"js/colors.js"}],"js/animate.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animate;

var _extras = require('./extras');

var _setup = require('./setup');

var _createObjects2 = require('./createObjects');

var _createObjects3 = _interopRequireDefault(_createObjects2);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var value = document.getElementsByClassName('center')[0];
var valueOfAngle = _setup.count / Math.PI;

function animate(canvas, grad) {
  window.requestAnimationFrame(function () {});
  var ctx = canvas.getContext('2d');
  // Not sure if it good every time create new lines
  // ???

  var _createObjects = (0, _createObjects3.default)(ctx),
      outsideCircle = _createObjects.outsideCircle,
      insideCircle = _createObjects.insideCircle;

  // Standard clearing of canvas
  // Fill background
  // ctx.fillStyle = '#261132'


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // We need flag to access the first line that will be changed
  var fl = false;
  // Every time we redraw all lines (outside & inside)
  outsideCircle.forEach(function (el, i) {
    el.style = {
      color: '#3E2F5B',
      width: 4
      // FI is the angle of line
    };var fi = Math.acos((el.posTo.x - _setup.delta) / (0, _extras.distance)(el.posTo.x, el.posTo.y, _setup.delta, _setup.delta));
    if (el.posTo.x - _setup.delta > 0 && el.posTo.y - _setup.delta > 0) {
      fi = -fi;
    } else if (el.posTo.x - _setup.delta < 0 && el.posTo.y - _setup.delta > 0) {
      fi = 2 * Math.PI - fi;
    }
    // This return updated line to begining size
    if (el.updated) {
      el.updated = false;
      el.posFrom.x -= 20 * Math.cos(fi);
      el.posFrom.y += 20 * Math.sin(fi);
    }
    // If the angle of line > angle of pointer then change the line
    if (fi > grad) {
      el.style = {
        color: '' + _colors2.default[i],
        width: 4
        // Change the size of first line
      };if (!fl) {
        fl = true;
        el.style = {
          color: '#ff5050',
          width: 6
        };
        el.updated = true;
        el.posFrom.x += 20 * Math.cos(fi);
        el.posFrom.y -= 20 * Math.sin(fi);

        value.innerHTML = Math.round(-fi * valueOfAngle) + 40;
      }
    }
    // Actually redraw the line
    el.update();
  });
  insideCircle.forEach(function (el) {
    el.update();
  });
}
},{"./extras":"js/extras.js","./setup":"js/setup.js","./createObjects":"js/createObjects.js","./colors":"js/colors.js"}],"js/eventHadler.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (canvas) {
  // Register addEventListeners on canvas
  // First for touchscreens, second and third are for desktop
  canvas.addEventListener('touchstart', function () {
    canvas.addEventListener('touchmove', mousemoveHandler);
  });

  canvas.addEventListener('mousedown', function () {
    canvas.addEventListener('mousemove', mousemoveHandler);
  });

  canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', mousemoveHandler);
  });

  function mousemoveHandler(e) {
    // Condition only for touchscreens
    if (e.touches) {
      e.preventDefault();
      e.x = e.touches[0].clientX;
      e.y = e.touches[0].clientY;
    }
    // Checking if the actual pointer inside the arc
    // Distance between the pointer and the center of arc
    if ((0, _extras.distance)(e.x, e.y, _setup.delta, _setup.delta) < _setup.rad + 100 && (0, _extras.distance)(e.x, e.y, _setup.delta, _setup.delta) > _setup.rad - _setup.lineW - 50) {
      // We need graduis for performing changes (e.g color of lines, size)
      var grad = Math.acos((e.x - _setup.delta) / (0, _extras.distance)(e.x, e.y, _setup.delta, _setup.delta));
      if (e.x - _setup.delta > 0 && e.y - _setup.delta > 0) {
        grad = -grad;
      } else if (e.x - _setup.delta < 0 && e.y - _setup.delta > 0) {
        grad = 2 * Math.PI - grad;
      }
      // Logic for performing changes
      (0, _animate2.default)(canvas, grad);
    }
  }
};

var _extras = require('./extras');

var _animate = require('./animate');

var _animate2 = _interopRequireDefault(_animate);

var _setup = require('./setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./extras":"js/extras.js","./animate":"js/animate.js","./setup":"js/setup.js"}],"js/app.js":[function(require,module,exports) {
'use strict';

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _eventHadler = require('./eventHadler');

var _eventHadler2 = _interopRequireDefault(_eventHadler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Canvas initiliaze
var canvas = document.querySelector('canvas');
var container = document.getElementsByClassName('container')[0];
var ctx = canvas.getContext('2d');
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

// This will handle all changes
(0, _eventHadler2.default)(canvas);

// This will draw initial picture
(0, _init2.default)(canvas);

// console.log(colorsArray)
},{"./init":"js/init.js","./eventHadler":"js/eventHadler.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63772' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.53be4488.map