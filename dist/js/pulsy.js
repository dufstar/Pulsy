'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

console.log((0, _styles2['default'])(3));
//

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