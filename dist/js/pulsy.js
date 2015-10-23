"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('./react');

var _react2 = _interopRequireDefault(_react);

var PulsyUnderlay = (function (_React$Component) {
  _inherits(PulsyUnderlay, _React$Component);

  function PulsyUnderlay() {
    _classCallCheck(this, PulsyUnderlay);

    _get(Object.getPrototypeOf(PulsyUnderlay.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(PulsyUnderlay, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement("div", {
        style: styles.underlay,
        onClick: this.props.toggleTooltip });
    }
  }]);

  return PulsyUnderlay;
})(_react2["default"].Component);

var PulsyTooltip = (function (_React$Component2) {
  _inherits(PulsyTooltip, _React$Component2);

  function PulsyTooltip() {
    _classCallCheck(this, PulsyTooltip);

    _get(Object.getPrototypeOf(PulsyTooltip.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(PulsyTooltip, [{
    key: "render",
    value: function render() {
      var po = this.props.pulsyObj,
          coordinates = po.dot.coordinates,
          offset = options.tooltip.offset,
          positionFixed = po.positionFixed;
      var style = {
        top: po.dot.fixed ? (coordinates.top + coordinates.bottom) / 2 + offset.top : (coordinates.top + coordinates.bottom) / 2 + window.scrollY + offset.top,
        left: po.dot.fixed ? (coordinates.left + coordinates.right) / 2 + offset.left : (coordinates.left + coordinates.right) / 2 + window.scrollX + offset.left
      };
      for (var key in styles.tooltip.container) {
        style[key] = styles.tooltip.container[key];
      }
      return _react2["default"].createElement(
        "div",
        { style: style },
        _react2["default"].createElement(
          "div",
          null,
          options.tooltip.content.header
        ),
        _react2["default"].createElement(
          "div",
          null,
          options.tooltip.content.note
        ),
        _react2["default"].createElement(
          "div",
          { style: styles.tooltip.close, onClick: this.props.toggleUnderlay },
          " + "
        )
      );
    }
  }]);

  return PulsyTooltip;
})(_react2["default"].Component);

var PulsyDot = (function (_React$Component3) {
  _inherits(PulsyDot, _React$Component3);

  function PulsyDot(props) {
    _classCallCheck(this, PulsyDot);

    _get(Object.getPrototypeOf(PulsyDot.prototype), "constructor", this).call(this, props);
    this.state = {
      showTooltip: false,
      dotClicked: this.props.pulsyObj.dot.clicked || localStorage.getItem("dotClicked" + this.props.pulsyObj.dot.id)
    };
  }

  _createClass(PulsyDot, [{
    key: "dotClick",
    value: function dotClick() {
      this.setState({
        showTooltip: !this.state.showTooltip,
        dotClicked: !this.state.dotClicked
      });
      this.props.pulsyObj.dot.clicked = !this.state.dotClicked;
      localStorage.setItem("dotClicked" + this.props.pulsyObj.dot.id, true);
      this.props.toggleUnderlay;
    }
  }, {
    key: "toggleTooltip",
    value: function toggleTooltip() {
      this.setState({
        showTooltip: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var po = this.props.pulsyObj,
          coordinates = po.dot.coordinates,
          offset = options.dot.offset;
      var style = {
        pulsyBack: {
          top: po.dot.fixed ? (coordinates.top + coordinates.bottom) / 2 : (coordinates.top + coordinates.bottom) / 2 + offset.top + window.scrollY,
          left: po.dot.fixed ? (coordinates.left + coordinates.right) / 2 : (coordinates.left + coordinates.right) / 2 + offset.left + window.scrollX,
          width: styles.dot.back.size,
          height: styles.dot.back.size,
          position: po.dot.fixed ? 'fixed' : 'absolute'
        },
        pulsyFront: {
          width: styles.dot.front.size,
          height: styles.dot.front.size,
          left: '50%',
          top: '50%'
        }
      };
      for (var key in styles.dot) {
        style.pulsyBack[key] = styles.dot[key];
      }
      for (var key in styles.dot) {
        style.pulsyFront[key] = styles.dot[key];
      }
      var pulseName = "pulse-" + this.props.dotId;
      var dot = !this.state.dotClicked ? _react2["default"].createElement(
        "div",
        { style: style.pulsyBack, onClick: this.dotClick.bind(this), className: pulseName },
        _react2["default"].createElement("div", { style: style.pulsyFront, className: "spinner" })
      ) : null;
      var tooltip = this.state.showTooltip ? _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(PulsyTooltip, { pulsyObj: this.props.pulsyObj, toggleUnderlay: this.toggleTooltip.bind(this) }),
        _react2["default"].createElement(PulsyUnderlay, { toggleTooltip: this.toggleTooltip.bind(this), pulsyObj: this.props.pulsyObj })
      ) : null;
      return _react2["default"].createElement(
        "div",
        null,
        dot,
        tooltip
      );
    }
  }]);

  return PulsyDot;
})(_react2["default"].Component);

var PulsyTour = (function (_React$Component4) {
  _inherits(PulsyTour, _React$Component4);

  function PulsyTour(props) {
    _classCallCheck(this, PulsyTour);

    _get(Object.getPrototypeOf(PulsyTour.prototype), "constructor", this).call(this, props);
    this.state = {
      showTooltip: false
    };
  }

  // CREATE ARRAY OF PULSY ANCHORS

  _createClass(PulsyTour, [{
    key: "resetStorage",
    value: function resetStorage() {
      localStorage.clear();
    }
  }, {
    key: "toggleUnderlay",
    value: function toggleUnderlay() {
      this.setState({
        showUnderlay: !this.state.showUnderlay
      });
    }
  }, {
    key: "closeTooltip",
    value: function closeTooltip() {
      this.setState({
        showTooltip: !this.state.showTooltip
      });
    }
  }, {
    key: "render",
    value: function render() {
      var pulsyLength = pulsyAnchors.length;
      var dots = [];
      for (var i = 0; i < pulsyLength; i++) {
        dots.push(_react2["default"].createElement(PulsyDot, {
          showTooltip: this.state.showTooltip,
          pulsyObj: this.props.pulsyInit[i]
        }));
      }
      return _react2["default"].createElement(
        "div",
        { style: styles.tour },
        dots,
        _react2["default"].createElement(
          "button",
          { style: styles.resetButton, onClick: this.resetStorage.bind(this) },
          "Reset Storage"
        )
      );
    }
  }]);

  return PulsyTour;
})(_react2["default"].Component);

var pulsyInit = [],
    pulsyAnchors = document.getElementsByClassName('anchor');
function findAnchors() {
  for (var i = 0; i < pulsyAnchors.length; i++) {
    var anchorStyles = window.getComputedStyle(pulsyAnchors[i], null),
        pulsyHeader = pulsyAnchors[i].getAttribute('data-pulsy-header'),
        pulsyNote = pulsyAnchors[i].getAttribute('data-pulsy-note');
    pulsyInit[i] = {
      dot: {
        id: i,
        clicked: false,
        coordinates: pulsyAnchors[i].getBoundingClientRect(),
        fixed: anchorStyles.getPropertyValue('position') === "fixed"
      },
      tooltip: {
        tooltipHeader: pulsyHeader ? pulsyHeader : options.tooltip.content.header,
        tooltipNote: pulsyNote ? pulsyNote : options.tooltip.content.note
      }
    };
  }
}

var options = {
  storage: 'local',
  ordered: false,
  keybardNav: true,
  dot: {
    animation: 'default',
    offset: {
      left: 0,
      top: 0
    }
  },
  tooltip: {
    edgeSense: true,
    animation: 'default',
    direction: 'above',
    close: true,
    next: {
      display: true,
      label: 'Next'
    },
    next: {
      display: false,
      label: 'Exit tour'
    },
    content: {
      header: 'Default header',
      note: 'Default note'
    },
    offset: {
      left: 0,
      top: 0
    }
  },
  callbacks: {
    tourComplete: null,
    stepComplete: null,
    optOut: null
  }
};

var styles = {
  tour: {
    zIndex: '9999',
    position: 'absolute'
  },
  dot: {
    position: 'absolute',
    display: 'inline-block',
    transform: 'translate(-50%,-50%)',
    background: 'rgba(255,255,255,0.5)',
    borderRadius: '100%',
    cursor: 'pointer',
    zIndex: '9997',
    back: {
      size: 30
    },
    front: {
      size: 50
    }
  },
  tooltip: {
    container: {
      padding: 15,
      background: '#eee',
      minWidth: 200,
      minHeight: 35,
      position: 'absolute',
      textAlign: 'left',
      borderRadius: '2px',
      transform: 'translate(-50%,0)',
      zIndex: '9999'
    },
    close: {
      color: '#333',
      transform: 'translate(-50%, -5%) rotate(-45deg)',
      position: 'absolute',
      top: '0',
      right: '0',
      fontSize: '20px',
      fontFamily: 'sans-serif',
      fontWeight: '300',
      cursor: 'pointer'
    },
    next: {
      display: 'block'
    },
    optOut: {
      display: 'block'
    }
  },
  underlay: {
    background: 'rgba(76,147,234,0.5)',
    zIndex: '9998',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh'
  },
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

var pulsyTour = _react2["default"].createElement(PulsyTour, { pulsyInit: pulsyInit });

// RENDER ROOT COMPONENT
function pulsy() {
  findAnchors();
  _react2["default"].render(pulsyTour, document.getElementById('pulsy-tour'));
}

pulsy();

window.onresize = function renderResize() {
  pulsy();
};
window.onscroll = function renderScroll() {
  pulsy();
};