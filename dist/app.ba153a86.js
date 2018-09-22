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
})({"app.js":[function(require,module,exports) {
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

var delta = canvas.width / 2 - 100;
var rad = 250;
var count = 30;
var lineW = 40;
var outsideCircle = [];
var insideCircle = [];

function Line(from, posTo, style) {
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

for (var i = -3; i <= count + 3; i++) {
  // draw outside (main) circle
  var newX = Math.cos(i * Math.PI / count) * rad;
  var newY = Math.sin(i * Math.PI / count) * rad;
  var outsideLine = new Line({
    x: newX + delta,
    y: (newY - delta) * -1
  }, {
    x: newX - 40 * Math.cos(i * Math.PI / count) + delta,
    y: (newY - 40 * Math.sin(i * Math.PI / count) - delta) * -1
  }, {
    color: '#3E2F5B',
    width: 5
  });
  outsideCircle.push(outsideLine);

  // draw inside circle
  newX = Math.cos(i * Math.PI / count) * (rad - 70);
  newY = Math.sin(i * Math.PI / count) * (rad - 70);
  var insideLine = new Line({
    x: newX + delta,
    y: (newY - delta) * -1
  }, {
    x: newX - 10 * Math.cos(i * Math.PI / count) + delta,
    y: (newY - 10 * Math.sin(i * Math.PI / count) - delta) * -1
  }, {
    color: '#7E8287',
    width: 5
  });
  insideCircle.push(insideLine);
}

// initial
ctx.fillStyle = '#261132';
ctx.fillRect(0, 0, canvas.width, canvas.height);
outsideCircle.forEach(function (el) {
  el.update();
});
insideCircle.forEach(function (el) {
  el.update();
});

function animate(grad) {
  window.requestAnimationFrame(function () {});
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#261132';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var fl = false;
  var targetLines = outsideCircle.filter(function (el) {
    el.style = {
      color: '#3E2F5B',
      width: 5
    };
    var fi = Math.acos((el.posTo.x - delta) / distance(el.posTo.x, el.posTo.y, delta, delta));
    if (el.posTo.x - delta > 0 && el.posTo.y - delta > 0) {
      fi = -fi;
    } else if (el.posTo.x - delta < 0 && el.posTo.y - delta > 0) {
      fi = 2 * Math.PI - fi;
    }
    if (el.updated) {
      el.updated = false;
      el.posFrom.x -= 20 * Math.cos(fi);
      el.posFrom.y += 20 * Math.sin(fi);
    }
    if (fi > grad) {
      el.style = {
        color: '#ccc',
        width: 5
      };
      if (!fl) {
        fl = true;
        el.style = {
          color: '#ff5050',
          width: 5
        };
        el.updated = true;
        el.posFrom.x += 20 * Math.cos(fi);
        el.posFrom.y -= 20 * Math.sin(fi);
      }
      el.update();
      return true;
    } else {
      el.update();
      return false;
    }
  });
  console.log(outsideCircle);
  // const indexOfFist = outsideCircle.findIndex((el) => {
  //   return el == targetLines[0]
  // })

  // outsideCircle[indexOfFist].style = {
  //   color: '#ff5050',
  //   width: 5
  // }
  // outsideCircle[indexOfFist].posFrom = {
  //   x:
  // }
  // outsideCircle[indexOfFist].update()
  // console.log(outsideCircle[indexOfFist])
  // console.log(targetLines)
  insideCircle.forEach(function (el) {
    el.update();
  });
}

function mousemoveHandler(e) {
  if (e.touches) {
    e.preventDefault();
    e.x = e.touches[0].clientX;
    e.y = e.touches[0].clientY;
  }

  if (distance(e.x, e.y, delta, delta) < rad + 100 && distance(e.x, e.y, delta, delta) > rad - lineW - 50) {
    var grad = Math.acos((e.x - delta) / distance(e.x, e.y, delta, delta));
    if (e.x - delta > 0 && e.y - delta > 0) {
      grad = -grad;
    } else if (e.x - delta < 0 && e.y - delta > 0) {
      grad = 2 * Math.PI - grad;
    }
    animate(grad);
  }
}

canvas.addEventListener('touchstart', function () {
  canvas.addEventListener('touchmove', mousemoveHandler);
});

canvas.addEventListener('mousedown', function () {
  canvas.addEventListener('mousemove', mousemoveHandler);
});

canvas.addEventListener('mouseup', function () {
  canvas.removeEventListener('mousemove', mousemoveHandler);
});

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// ctx.beginPath()
//   ctx.strokeStyle = 'white'
//   ctx.lineWidth = 50
//   ctx.arc(
//     delta,
//     delta,
//     225,
//     2 * Math.PI - (count + 3) * Math.PI / count,
//     3 * Math.PI / count
//   )
//   ctx.stroke()
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.ba153a86.map