'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PulsyUnderlay = (function (_React$Component) {
  _inherits(PulsyUnderlay, _React$Component);

  function PulsyUnderlay() {
    _classCallCheck(this, PulsyUnderlay);

    _get(Object.getPrototypeOf(PulsyUnderlay.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PulsyUnderlay, [{
    key: 'render',
    value: function render() {
      var style = {
        background: 'rgba(76,147,234,0.5)',
        zIndex: '9998',
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh'
      };
      var underlay = this.props.pulsyObj.showUnderlay ? style : null;
      return React.createElement('div', { style: underlay, onClick: this.props.toggleTooltip });
    }
  }]);

  return PulsyUnderlay;
})(React.Component);

var PulsyTooltip = (function (_React$Component2) {
  _inherits(PulsyTooltip, _React$Component2);

  function PulsyTooltip() {
    _classCallCheck(this, PulsyTooltip);

    _get(Object.getPrototypeOf(PulsyTooltip.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PulsyTooltip, [{
    key: 'render',
    value: function render() {
      var po = this.props.pulsyObj;
      var coor = po.coordinates;
      var ptv = po.tooltip.positionTop;
      var pth = po.tooltip.positionLeft;
      var positionFixed = po.positionFixed;
      var style = {
        pulsyTooltip: {
          minWidth: '200px',
          minHeight: '35px',
          background: '#eee',
          position: 'absolute',
          top: positionFixed ? (coor.top + coor.bottom) / 2 + ptv : (coor.top + coor.bottom) / 2 + window.scrollY + ptv,
          left: positionFixed ? (coor.left + coor.right) / 2 + pth : (coor.left + coor.right) / 2 + window.scrollX + pth,
          transform: 'translate(-50%,0)',
          padding: po.tooltip.padding,
          textAlign: 'left',
          borderRadius: '2px',
          zIndex: '9999',
          ':hover': {
            background: '#ddd'
          }
        },
        closeTooltip: {
          color: '#333',
          transform: 'translate(-50%, -5%) rotate(-45deg)',
          position: 'absolute',
          top: '0',
          right: '0',
          fontSize: '20px',
          fontFamily: 'sans-serif',
          fontWeight: '300',
          cursor: 'pointer'
        }
      };
      return React.createElement(
        'div',
        { style: style.pulsyTooltip },
        React.createElement(
          'div',
          null,
          po.tooltip.tooltipNote
        ),
        React.createElement(
          'div',
          null,
          po.tooltip.tooltipCustom
        ),
        React.createElement(
          'div',
          { style: style.closeTooltip, onClick: this.props.toggleUnderlay },
          ' + '
        )
      );
    }
  }]);

  return PulsyTooltip;
})(React.Component);

var PulsyDot = (function (_React$Component3) {
  _inherits(PulsyDot, _React$Component3);

  function PulsyDot(props) {
    _classCallCheck(this, PulsyDot);

    _get(Object.getPrototypeOf(PulsyDot.prototype), 'constructor', this).call(this, props);
    this.state = {
      showTooltip: false,
      dotClicked: this.props.pulsyObj.dotClicked || localStorage.getItem("dotClicked" + this.props.pulsyObj.dotId)
    };
  }

  _createClass(PulsyDot, [{
    key: 'dotClick',
    value: function dotClick() {
      this.setState({
        showTooltip: !this.state.showTooltip,
        dotClicked: !this.state.dotClicked
      });
      this.props.pulsyObj.dotClicked = !this.state.dotClicked;
      localStorage.setItem("dotClicked" + this.props.pulsyObj.dotId, true);
      this.props.toggleUnderlay;
    }
  }, {
    key: 'toggleTooltip',
    value: function toggleTooltip() {
      this.setState({
        showTooltip: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var po = this.props.pulsyObj;
      var coordinates = po.coordinates;
      var pdv = po.dot.positionTop;
      var pdh = po.dot.positionLeft;
      var style = {
        pulsyDot: {
          top: po.positionFixed ? (coordinates.top + coordinates.bottom) / 2 : (coordinates.top + coordinates.bottom) / 2 + pdv + window.scrollY,
          left: po.positionFixed ? (coordinates.left + coordinates.right) / 2 : (coordinates.left + coordinates.right) / 2 + pdh + window.scrollX,
          position: 'absolute',
          display: 'inline-block',
          width: po.dot.dotSize,
          height: po.dot.dotSize,
          transform: 'translate(-50%,-50%)',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '100%',
          cursor: 'pointer',
          zIndex: '9997',
          position: po.positionFixed ? 'fixed' : 'absolute'
        },
        pulsyFront: {
          position: 'absolute',
          display: 'inline-block',
          width: '50px',
          height: '50px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '100%',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          cursor: 'pointer',
          zIndex: '9999',
          position: this.props.positionFixed ? 'fixed' : 'absolute'
        }
      };
      var pulseName = "pulse-" + this.props.dotId;
      var dot = !this.state.dotClicked ? React.createElement(
        'div',
        { style: style.pulsyDot, onClick: this.dotClick.bind(this), className: pulseName },
        React.createElement('div', { style: style.pulsyFront, className: 'spinner' })
      ) : null;
      var tooltip = this.state.showTooltip ? React.createElement(
        'div',
        null,
        React.createElement(PulsyTooltip, { pulsyObj: this.props.pulsyObj, toggleUnderlay: this.toggleTooltip.bind(this) }),
        React.createElement(PulsyUnderlay, { toggleTooltip: this.toggleTooltip.bind(this), pulsyObj: this.props.pulsyObj })
      ) : null;
      return React.createElement(
        'div',
        null,
        dot,
        tooltip
      );
    }
  }]);

  return PulsyDot;
})(React.Component);

var PulsyTour = (function (_React$Component4) {
  _inherits(PulsyTour, _React$Component4);

  function PulsyTour(props) {
    _classCallCheck(this, PulsyTour);

    _get(Object.getPrototypeOf(PulsyTour.prototype), 'constructor', this).call(this, props);
    this.state = {
      showTooltip: false
    };
  }

  // CREATE ARRAY OF PULSY ANCHORS

  _createClass(PulsyTour, [{
    key: 'resetStorage',
    value: function resetStorage() {
      localStorage.clear();
    }
  }, {
    key: 'toggleUnderlay',
    value: function toggleUnderlay() {
      this.setState({
        showUnderlay: !this.state.showUnderlay
      });
    }
  }, {
    key: 'closeTooltip',
    value: function closeTooltip() {
      this.setState({
        showTooltip: !this.state.showTooltip
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        zIndex: '9999',
        position: 'absolute',
        resetButton: {
          width: '150px',
          height: '50px',
          borderRadius: '2px',
          background: '#555',
          left: '100px',
          top: '65vh',
          position: 'absolute',
          border: 'none',
          cursor: 'pointer',
          outline: 'none'
        }
      };
      var pulsyLength = pulsyAnchors.length;
      var dots = [];
      for (var i = 0; i < pulsyLength; i++) {
        dots.push(React.createElement(PulsyDot, {
          showTooltip: this.state.showTooltip,
          pulsyObj: this.props.pulsyUtilities[i]
        }));
      }
      return React.createElement(
        'div',
        { style: style },
        dots,
        React.createElement(
          'button',
          { style: style.resetButton, onClick: this.resetStorage.bind(this) },
          'Reset Storage'
        )
      );
    }
  }]);

  return PulsyTour;
})(React.Component);

var pulsyAnchors = document.getElementsByClassName('anchor');
var pulsyUtilities = [];
function findAnchors() {
  for (var i = 0; i < pulsyAnchors.length; i++) {
    var anchorStyles = window.getComputedStyle(pulsyAnchors[i], null);
    pulsyUtilities[i] = {
      dotId: i,
      dotClicked: false,
      coordinates: pulsyAnchors[i].getBoundingClientRect(),
      showUnderlay: true,
      positionFixed: anchorStyles.getPropertyValue('position') === "fixed",
      tooltip: {
        tooltipHeader: 'Default header',
        tooltipNote: 'Default note',
        tooltipCustom: 'Add your custom HTML here.',
        positionLeft: 0,
        positionTop: 0,
        transition: false,
        padding: 15
      },
      dot: {
        positionLeft: 0,
        positionTop: 0,
        transition: false,
        dotSize: 30
      }
    };
  }
}

findAnchors();
var pulsyTour = React.createElement(PulsyTour, { pulsyUtilities: pulsyUtilities });

// RENDER ROOT COMPONENT
React.render(pulsyTour, document.getElementById('pulsy-tour'));

window.onresize = function renderResize() {
  findAnchors();
  React.render(pulsyTour, document.getElementById('pulsy-tour'));
};

window.onscroll = function renderScroll() {
  findAnchors();
  React.render(pulsyTour, document.getElementById('pulsy-tour'));
};
/*
 RequireJS 2.1.20 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
"use strict";

var requirejs, require, define;
(function (ba) {
  function G(b) {
    return "[object Function]" === K.call(b);
  }function H(b) {
    return "[object Array]" === K.call(b);
  }function v(b, c) {
    if (b) {
      var d;for (d = 0; d < b.length && (!b[d] || !c(b[d], d, b)); d += 1);
    }
  }function T(b, c) {
    if (b) {
      var d;for (d = b.length - 1; -1 < d && (!b[d] || !c(b[d], d, b)); d -= 1);
    }
  }function t(b, c) {
    return fa.call(b, c);
  }function n(b, c) {
    return t(b, c) && b[c];
  }function A(b, c) {
    for (var d in b) if (t(b, d) && c(b[d], d)) break;
  }function U(b, c, d, e) {
    c && A(c, function (c, i) {
      if (d || !t(b, i)) e && "object" === typeof c && c && !H(c) && !G(c) && !(c instanceof RegExp) ? (b[i] || (b[i] = {}), U(b[i], c, d, e)) : b[i] = c;
    });return b;
  }function u(b, c) {
    return function () {
      return c.apply(b, arguments);
    };
  }function ca(b) {
    throw b;
  }function da(b) {
    if (!b) return b;var c = ba;v(b.split("."), function (b) {
      c = c[b];
    });return c;
  }function B(b, c, d, e) {
    c = Error(c + "\nhttp://requirejs.org/docs/errors.html#" + b);c.requireType = b;c.requireModules = e;d && (c.originalError = d);return c;
  }function ga(b) {
    function c(a, j, b) {
      var f,
          l,
          c,
          d,
          h,
          e,
          g,
          i,
          j = j && j.split("/"),
          p = k.map,
          m = p && p["*"];if (a) {
        a = a.split("/");l = a.length - 1;k.nodeIdCompat && Q.test(a[l]) && (a[l] = a[l].replace(Q, ""));"." === a[0].charAt(0) && j && (l = j.slice(0, j.length - 1), a = l.concat(a));l = a;for (c = 0; c < l.length; c++) if ((d = l[c], "." === d)) l.splice(c, 1), c -= 1;else if (".." === d && !(0 === c || 1 === c && ".." === l[2] || ".." === l[c - 1]) && 0 < c) l.splice(c - 1, 2), c -= 2;a = a.join("/");
      }if (b && p && (j || m)) {
        l = a.split("/");c = l.length;a: for (; 0 < c; c -= 1) {
          h = l.slice(0, c).join("/");if (j) for (d = j.length; 0 < d; d -= 1) if (b = n(p, j.slice(0, d).join("/"))) if (b = n(b, h)) {
            f = b;e = c;break a;
          }!g && (m && n(m, h)) && (g = n(m, h), i = c);
        }!f && g && (f = g, e = i);f && (l.splice(0, e, f), a = l.join("/"));
      }return (f = n(k.pkgs, a)) ? f : a;
    }function d(a) {
      z && v(document.getElementsByTagName("script"), function (j) {
        if (j.getAttribute("data-requiremodule") === a && j.getAttribute("data-requirecontext") === h.contextName) return (j.parentNode.removeChild(j), !0);
      });
    }function p(a) {
      var j = n(k.paths, a);if (j && H(j) && 1 < j.length) return (j.shift(), h.require.undef(a), h.makeRequire(null, { skipMap: !0 })([a]), !0);
    }function g(a) {
      var j,
          c = a ? a.indexOf("!") : -1;-1 < c && (j = a.substring(0, c), a = a.substring(c + 1, a.length));return [j, a];
    }function i(a, j, b, f) {
      var l,
          d,
          e = null,
          i = j ? j.name : null,
          k = a,
          p = !0,
          m = "";a || (p = !1, a = "_@r" + (K += 1));a = g(a);e = a[0];a = a[1];e && (e = c(e, i, f), d = n(q, e));a && (e ? m = d && d.normalize ? d.normalize(a, function (a) {
        return c(a, i, f);
      }) : -1 === a.indexOf("!") ? c(a, i, f) : a : (m = c(a, i, f), a = g(m), e = a[0], m = a[1], b = !0, l = h.nameToUrl(m)));b = e && !d && !b ? "_unnormalized" + (O += 1) : "";return { prefix: e, name: m, parentMap: j, unnormalized: !!b, url: l, originalName: k, isDefine: p, id: (e ? e + "!" + m : m) + b };
    }function r(a) {
      var j = a.id,
          b = n(m, j);b || (b = m[j] = new h.Module(a));return b;
    }function s(a, j, b) {
      var f = a.id,
          c = n(m, f);if (t(q, f) && (!c || c.defineEmitComplete)) "defined" === j && b(q[f]);else if ((c = r(a), c.error && "error" === j)) b(c.error);else c.on(j, b);
    }function w(a, b) {
      var c = a.requireModules,
          f = !1;if (b) b(a);else if ((v(c, function (b) {
        if (b = n(m, b)) b.error = a, b.events.error && (f = !0, b.emit("error", a));
      }), !f)) e.onError(a);
    }function x() {
      R.length && (v(R, function (a) {
        var b = a[0];"string" === typeof b && (h.defQueueMap[b] = !0);C.push(a);
      }), R = []);
    }function y(a) {
      delete m[a];delete V[a];
    }function F(a, b, c) {
      var f = a.map.id;a.error ? a.emit("error", a.error) : (b[f] = !0, v(a.depMaps, function (f, d) {
        var e = f.id,
            h = n(m, e);h && (!a.depMatched[d] && !c[e]) && (n(b, e) ? (a.defineDep(d, q[e]), a.check()) : F(h, b, c));
      }), c[f] = !0);
    }function D() {
      var a,
          b,
          c = (a = 1E3 * k.waitSeconds) && h.startTime + a < new Date().getTime(),
          f = [],
          l = [],
          e = !1,
          i = !0;if (!W) {
        W = !0;A(V, function (a) {
          var h = a.map,
              g = h.id;if (a.enabled && (h.isDefine || l.push(a), !a.error)) if (!a.inited && c) p(g) ? e = b = !0 : (f.push(g), d(g));else if (!a.inited && (a.fetched && h.isDefine) && (e = !0, !h.prefix)) return i = !1;
        });if (c && f.length) return (a = B("timeout", "Load timeout for modules: " + f, null, f), a.contextName = h.contextName, w(a));i && v(l, function (a) {
          F(a, {}, {});
        });if ((!c || b) && e) if ((z || ea) && !X) X = setTimeout(function () {
          X = 0;D();
        }, 50);W = !1;
      }
    }function E(a) {
      t(q, a[0]) || r(i(a[0], null, !0)).init(a[1], a[2]);
    }function I(a) {
      var a = a.currentTarget || a.srcElement,
          b = h.onScriptLoad;a.detachEvent && !Y ? a.detachEvent("onreadystatechange", b) : a.removeEventListener("load", b, !1);b = h.onScriptError;(!a.detachEvent || Y) && a.removeEventListener("error", b, !1);return { node: a, id: a && a.getAttribute("data-requiremodule") };
    }
    function J() {
      var a;for (x(); C.length;) {
        a = C.shift();if (null === a[0]) return w(B("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));E(a);
      }h.defQueueMap = {};
    }var W,
        Z,
        h,
        L,
        X,
        k = { waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} },
        m = {},
        V = {},
        $ = {},
        C = [],
        q = {},
        S = {},
        aa = {},
        K = 1,
        O = 1;L = { require: function require(a) {
        return a.require ? a.require : a.require = h.makeRequire(a.map);
      }, exports: function exports(a) {
        a.usingExports = !0;if (a.map.isDefine) return a.exports ? q[a.map.id] = a.exports : a.exports = q[a.map.id] = {};
      },
      module: function module(a) {
        return a.module ? a.module : a.module = { id: a.map.id, uri: a.map.url, config: function config() {
            return n(k.config, a.map.id) || {};
          }, exports: a.exports || (a.exports = {}) };
      } };Z = function (a) {
      this.events = n($, a.id) || {};this.map = a;this.shim = n(k.shim, a.id);this.depExports = [];this.depMaps = [];this.depMatched = [];this.pluginMaps = {};this.depCount = 0;
    };Z.prototype = { init: function init(a, b, c, f) {
        f = f || {};if (!this.inited) {
          this.factory = b;if (c) this.on("error", c);else this.events.error && (c = u(this, function (a) {
            this.emit("error", a);
          }));
          this.depMaps = a && a.slice(0);this.errback = c;this.inited = !0;this.ignore = f.ignore;f.enabled || this.enabled ? this.enable() : this.check();
        }
      }, defineDep: function defineDep(a, b) {
        this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b);
      }, fetch: function fetch() {
        if (!this.fetched) {
          this.fetched = !0;h.startTime = new Date().getTime();var a = this.map;if (this.shim) h.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], u(this, function () {
            return a.prefix ? this.callPlugin() : this.load();
          }));else return a.prefix ? this.callPlugin() : this.load();
        }
      }, load: function load() {
        var a = this.map.url;S[a] || (S[a] = !0, h.load(this.map.id, a));
      }, check: function check() {
        if (this.enabled && !this.enabling) {
          var a,
              b,
              c = this.map.id;b = this.depExports;var f = this.exports,
              l = this.factory;if (this.inited) if (this.error) this.emit("error", this.error);else {
            if (!this.defining) {
              this.defining = !0;if (1 > this.depCount && !this.defined) {
                if (G(l)) {
                  if (this.events.error && this.map.isDefine || e.onError !== ca) try {
                    f = h.execCb(c, l, b, f);
                  } catch (d) {
                    a = d;
                  } else f = h.execCb(c, l, b, f);this.map.isDefine && void 0 === f && ((b = this.module) ? f = b.exports : this.usingExports && (f = this.exports));if (a) return (a.requireMap = this.map, a.requireModules = this.map.isDefine ? [this.map.id] : null, a.requireType = this.map.isDefine ? "define" : "require", w(this.error = a));
                } else f = l;this.exports = f;if (this.map.isDefine && !this.ignore && (q[c] = f, e.onResourceLoad)) e.onResourceLoad(h, this.map, this.depMaps);y(c);this.defined = !0;
              }this.defining = !1;this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0);
            }
          } else t(h.defQueueMap, c) || this.fetch();
        }
      }, callPlugin: function callPlugin() {
        var a = this.map,
            b = a.id,
            d = i(a.prefix);this.depMaps.push(d);s(d, "defined", u(this, function (f) {
          var l, d;d = n(aa, this.map.id);var g = this.map.name,
              P = this.map.parentMap ? this.map.parentMap.name : null,
              p = h.makeRequire(a.parentMap, { enableBuildCallback: !0 });if (this.map.unnormalized) {
            if ((f.normalize && (g = f.normalize(g, function (a) {
              return c(a, P, !0);
            }) || ""), f = i(a.prefix + "!" + g, this.map.parentMap), s(f, "defined", u(this, function (a) {
              this.init([], function () {
                return a;
              }, null, { enabled: !0, ignore: !0 });
            })), d = n(m, f.id))) {
              this.depMaps.push(f);if (this.events.error) d.on("error", u(this, function (a) {
                this.emit("error", a);
              }));d.enable();
            }
          } else d ? (this.map.url = h.nameToUrl(d), this.load()) : (l = u(this, function (a) {
            this.init([], function () {
              return a;
            }, null, { enabled: !0 });
          }), l.error = u(this, function (a) {
            this.inited = !0;this.error = a;a.requireModules = [b];A(m, function (a) {
              0 === a.map.id.indexOf(b + "_unnormalized") && y(a.map.id);
            });w(a);
          }), l.fromText = u(this, function (f, c) {
            var d = a.name,
                g = i(d),
                P = M;c && (f = c);P && (M = !1);r(g);t(k.config, b) && (k.config[d] = k.config[b]);try {
              e.exec(f);
            } catch (m) {
              return w(B("fromtexteval", "fromText eval for " + b + " failed: " + m, m, [b]));
            }P && (M = !0);this.depMaps.push(g);h.completeLoad(d);p([d], l);
          }), f.load(a.name, p, l, k));
        }));h.enable(d, this);this.pluginMaps[d.id] = d;
      }, enable: function enable() {
        V[this.map.id] = this;this.enabling = this.enabled = !0;v(this.depMaps, u(this, function (a, b) {
          var c, f;if ("string" === typeof a) {
            a = i(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap);this.depMaps[b] = a;if (c = n(L, a.id)) {
              this.depExports[b] = c(this);return;
            }this.depCount += 1;s(a, "defined", u(this, function (a) {
              this.undefed || (this.defineDep(b, a), this.check());
            }));this.errback ? s(a, "error", u(this, this.errback)) : this.events.error && s(a, "error", u(this, function (a) {
              this.emit("error", a);
            }));
          }c = a.id;f = m[c];!t(L, c) && (f && !f.enabled) && h.enable(a, this);
        }));A(this.pluginMaps, u(this, function (a) {
          var b = n(m, a.id);b && !b.enabled && h.enable(a, this);
        }));this.enabling = !1;this.check();
      }, on: function on(a, b) {
        var c = this.events[a];c || (c = this.events[a] = []);c.push(b);
      }, emit: function emit(a, b) {
        v(this.events[a], function (a) {
          a(b);
        });"error" === a && delete this.events[a];
      } };h = { config: k, contextName: b, registry: m, defined: q, urlFetched: S, defQueue: C, defQueueMap: {}, Module: Z, makeModuleMap: i, nextTick: e.nextTick, onError: w, configure: function configure(a) {
        a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");var b = k.shim,
            c = { paths: !0, bundles: !0, config: !0, map: !0 };A(a, function (a, b) {
          c[b] ? (k[b] || (k[b] = {}), U(k[b], a, !0, !0)) : k[b] = a;
        });a.bundles && A(a.bundles, function (a, b) {
          v(a, function (a) {
            a !== b && (aa[a] = b);
          });
        });a.shim && (A(a.shim, function (a, c) {
          H(a) && (a = { deps: a });if ((a.exports || a.init) && !a.exportsFn) a.exportsFn = h.makeShimExports(a);b[c] = a;
        }), k.shim = b);a.packages && v(a.packages, function (a) {
          var b,
              a = "string" === typeof a ? { name: a } : a;b = a.name;a.location && (k.paths[b] = a.location);k.pkgs[b] = a.name + "/" + (a.main || "main").replace(ha, "").replace(Q, "");
        });A(m, function (a, b) {
          !a.inited && !a.map.unnormalized && (a.map = i(b, null, !0));
        });if (a.deps || a.callback) h.require(a.deps || [], a.callback);
      }, makeShimExports: function makeShimExports(a) {
        return function () {
          var b;
          a.init && (b = a.init.apply(ba, arguments));return b || a.exports && da(a.exports);
        };
      }, makeRequire: function makeRequire(a, j) {
        function g(c, d, p) {
          var k, n;j.enableBuildCallback && (d && G(d)) && (d.__requireJsBuild = !0);if ("string" === typeof c) {
            if (G(d)) return w(B("requireargs", "Invalid require call"), p);if (a && t(L, c)) return L[c](m[a.id]);if (e.get) return e.get(h, c, a, g);k = i(c, a, !1, !0);k = k.id;return !t(q, k) ? w(B("notloaded", 'Module name "' + k + '" has not been loaded yet for context: ' + b + (a ? "" : ". Use require([])"))) : q[k];
          }J();h.nextTick(function () {
            J();
            n = r(i(null, a));n.skipMap = j.skipMap;n.init(c, d, p, { enabled: !0 });D();
          });return g;
        }j = j || {};U(g, { isBrowser: z, toUrl: function toUrl(b) {
            var d,
                e = b.lastIndexOf("."),
                j = b.split("/")[0];if (-1 !== e && (!("." === j || ".." === j) || 1 < e)) d = b.substring(e, b.length), b = b.substring(0, e);return h.nameToUrl(c(b, a && a.id, !0), d, !0);
          }, defined: function defined(b) {
            return t(q, i(b, a, !1, !0).id);
          }, specified: function specified(b) {
            b = i(b, a, !1, !0).id;return t(q, b) || t(m, b);
          } });a || (g.undef = function (b) {
          x();var c = i(b, a, !0),
              e = n(m, b);e.undefed = !0;d(b);delete q[b];delete S[c.url];
          delete $[b];T(C, function (a, c) {
            a[0] === b && C.splice(c, 1);
          });delete h.defQueueMap[b];e && (e.events.defined && ($[b] = e.events), y(b));
        });return g;
      }, enable: function enable(a) {
        n(m, a.id) && r(a).enable();
      }, completeLoad: function completeLoad(a) {
        var b,
            c,
            d = n(k.shim, a) || {},
            e = d.exports;for (x(); C.length;) {
          c = C.shift();if (null === c[0]) {
            c[0] = a;if (b) break;b = !0;
          } else c[0] === a && (b = !0);E(c);
        }h.defQueueMap = {};c = n(m, a);if (!b && !t(q, a) && c && !c.inited) {
          if (k.enforceDefine && (!e || !da(e))) return p(a) ? void 0 : w(B("nodefine", "No define call for " + a, null, [a]));E([a, d.deps || [], d.exportsFn]);
        }D();
      }, nameToUrl: function nameToUrl(a, b, c) {
        var d, g, i;(d = n(k.pkgs, a)) && (a = d);if (d = n(aa, a)) return h.nameToUrl(d, b, c);if (e.jsExtRegExp.test(a)) d = a + (b || "");else {
          d = k.paths;a = a.split("/");for (g = a.length; 0 < g; g -= 1) if ((i = a.slice(0, g).join("/"), i = n(d, i))) {
            H(i) && (i = i[0]);a.splice(0, g, i);break;
          }d = a.join("/");d += b || (/^data\:|\?/.test(d) || c ? "" : ".js");d = ("/" === d.charAt(0) || d.match(/^[\w\+\.\-]+:/) ? "" : k.baseUrl) + d;
        }return k.urlArgs ? d + ((-1 === d.indexOf("?") ? "?" : "&") + k.urlArgs) : d;
      }, load: function load(a, b) {
        e.load(h, a, b);
      }, execCb: function execCb(a, b, c, d) {
        return b.apply(d, c);
      }, onScriptLoad: function onScriptLoad(a) {
        if ("load" === a.type || ia.test((a.currentTarget || a.srcElement).readyState)) N = null, a = I(a), h.completeLoad(a.id);
      }, onScriptError: function onScriptError(a) {
        var b = I(a);if (!p(b.id)) return w(B("scripterror", "Script error for: " + b.id, a, [b.id]));
      } };h.require = h.makeRequire();return h;
  }var e,
      x,
      y,
      D,
      I,
      E,
      N,
      J,
      r,
      O,
      ja = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
      ka = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
      Q = /\.js$/,
      ha = /^\.\//;x = Object.prototype;var K = x.toString,
      fa = x.hasOwnProperty,
      z = !!("undefined" !== typeof window && "undefined" !== typeof navigator && window.document),
      ea = !z && "undefined" !== typeof importScripts,
      ia = z && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
      Y = "undefined" !== typeof opera && "[object Opera]" === opera.toString(),
      F = {},
      s = {},
      R = [],
      M = !1;if ("undefined" === typeof define) {
    if ("undefined" !== typeof requirejs) {
      if (G(requirejs)) return;s = requirejs;requirejs = void 0;
    }"undefined" !== typeof require && !G(require) && (s = require, require = void 0);e = requirejs = function (b, c, d, p) {
      var g,
          i = "_";!H(b) && "string" !== typeof b && (g = b, H(c) ? (b = c, c = d, d = p) : b = []);g && g.context && (i = g.context);(p = n(F, i)) || (p = F[i] = e.s.newContext(i));g && p.configure(g);return p.require(b, c, d);
    };e.config = function (b) {
      return e(b);
    };e.nextTick = "undefined" !== typeof setTimeout ? function (b) {
      setTimeout(b, 4);
    } : function (b) {
      b();
    };require || (require = e);e.version = "2.1.20";e.jsExtRegExp = /^\/|:|\?|\.js$/;e.isBrowser = z;x = e.s = { contexts: F, newContext: ga };e({});v(["toUrl", "undef", "defined", "specified"], function (b) {
      e[b] = function () {
        var c = F._;return c.require[b].apply(c, arguments);
      };
    });if (z && (y = x.head = document.getElementsByTagName("head")[0], D = document.getElementsByTagName("base")[0])) y = x.head = D.parentNode;e.onError = ca;e.createNode = function (b) {
      var c = b.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");c.type = b.scriptType || "text/javascript";c.charset = "utf-8";c.async = !0;return c;
    };e.load = function (b, c, d) {
      var p = b && b.config || {},
          g;if (z) {
        g = e.createNode(p, c, d);if (p.onNodeCreated) p.onNodeCreated(g, p, c, d);g.setAttribute("data-requirecontext", b.contextName);g.setAttribute("data-requiremodule", c);g.attachEvent && !(g.attachEvent.toString && 0 > g.attachEvent.toString().indexOf("[native code")) && !Y ? (M = !0, g.attachEvent("onreadystatechange", b.onScriptLoad)) : (g.addEventListener("load", b.onScriptLoad, !1), g.addEventListener("error", b.onScriptError, !1));g.src = d;J = g;D ? y.insertBefore(g, D) : y.appendChild(g);J = null;return g;
      }if (ea) try {
        importScripts(d), b.completeLoad(c);
      } catch (i) {
        b.onError(B("importscripts", "importScripts failed for " + c + " at " + d, i, [c]));
      }
    };z && !s.skipDataMain && T(document.getElementsByTagName("script"), function (b) {
      y || (y = b.parentNode);if (I = b.getAttribute("data-main")) return (r = I, s.baseUrl || (E = r.split("/"), r = E.pop(), O = E.length ? E.join("/") + "/" : "./", s.baseUrl = O), r = r.replace(Q, ""), e.jsExtRegExp.test(r) && (r = I), s.deps = s.deps ? s.deps.concat(r) : [r], !0);
    });define = function (b, c, d) {
      var e, g;"string" !== typeof b && (d = c, c = b, b = null);H(c) || (d = c, c = null);!c && G(d) && (c = [], d.length && (d.toString().replace(ja, "").replace(ka, function (b, d) {
        c.push(d);
      }), c = (1 === d.length ? ["require"] : ["require", "exports", "module"]).concat(c)));if (M) {
        if (!(e = J)) N && "interactive" === N.readyState || T(document.getElementsByTagName("script"), function (b) {
          if ("interactive" === b.readyState) return N = b;
        }), e = N;e && (b || (b = e.getAttribute("data-requiremodule")), g = F[e.getAttribute("data-requirecontext")]);
      }g ? (g.defQueue.push([b, c, d]), g.defQueueMap[b] = !0) : R.push([b, c, d]);
    };define.amd = { jQuery: !0 };e.exec = function (b) {
      return eval(b);
    };e(s);
  }
})(undefined);
"use strict";