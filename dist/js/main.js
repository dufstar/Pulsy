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
      return React.createElement('div', { style: style, onClick: this.props.toggleUnderlay });
    }
  }]);

  return PulsyUnderlay;
})(React.Component);

var PulsyTooltip = React.createClass({
  displayName: 'PulsyTooltip',

  render: function render() {
    var po = this.props.pulsyObj;
    var coor = po.coordinates;
    var ptv = po.tooltipOptions.vertical;
    var pth = po.tooltipOptions.horizontal;
    var positionFixed = this.props.pulsyObj.positionFixed;
    var style = {
      pulsyTooltip: {
        minWidth: '200px',
        minHeight: '35px',
        background: '#eee',
        position: 'absolute',
        top: positionFixed ? (coor.top + coor.bottom) / 2 + ptv : (coor.top + coor.bottom) / 2 + window.scrollY + ptv,
        left: positionFixed ? (coor.left + coor.right) / 2 + pth : (coor.left + coor.right) / 2 + window.scrollX + pth,
        transform: 'translate(-50%,0)',
        padding: '15px',
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
        this.props.pulsyObj.tooltipNote
      ),
      React.createElement(
        'div',
        null,
        this.props.pulsyObj.tooltipCustom
      ),
      React.createElement(
        'div',
        { style: style.closeTooltip, onClick: this.props.toggleUnderlay },
        ' + '
      )
    );
  }
});

var PulsyDot = React.createClass({
  displayName: 'PulsyDot',

  getInitialState: function getInitialState() {
    return {
      showTooltip: false,
      dotClicked: this.props.pulsyObj.dotClicked || localStorage.getItem("dotClicked" + this.props.pulsyObj.dotId)
    };
  },
  dotClick: function dotClick() {
    this.setState({
      showTooltip: !this.state.showTooltip,
      dotClicked: !this.state.dotClicked
    });
    this.props.pulsyObj.dotClicked = !this.state.dotClicked;
    localStorage.setItem("dotClicked" + this.props.pulsyObj.dotId, true);
    this.props.toggleUnderlay;
  },
  toggleTooltip: function toggleTooltip() {
    this.setState({
      showTooltip: false
    });
  },
  render: function render() {
    var po = this.props.pulsyObj;
    var coordinates = po.coordinates;
    var pdv = po.dotOptions.vertical;
    var pdh = po.dotOptions.horizontal;
    var style = {
      pulsyDot: {
        top: po.positionFixed ? (coordinates.top + coordinates.bottom) / 2 : (coordinates.top + coordinates.bottom) / 2 + pdv + window.scrollY,
        left: po.positionFixed ? (coordinates.left + coordinates.right) / 2 : (coordinates.left + coordinates.right) / 2 + pdh + window.scrollX,
        position: 'absolute',
        display: 'inline-block',
        width: '20px',
        height: '20px',
        transform: 'translate(-50%,-50%)',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '100%',
        cursor: 'pointer',
        zIndex: '9997'
      },
      // position: po.positionFixed ? 'fixed' : 'absolute',
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
        zIndex: '9999'
      }
    };
    // position: this.props.positionFixed ? 'fixed' : 'absolute',
    var pulseName = "pulse-" + this.props.dotId;
    var dot = !this.state.dotClicked ? React.createElement(
      'div',
      { style: style.pulsyDot, onClick: this.dotClick, className: pulseName },
      React.createElement('div', { style: style.pulsyFront, className: 'spinner' })
    ) : null;
    var tooltip = this.state.showTooltip ? React.createElement(
      'div',
      null,
      React.createElement(PulsyTooltip, { pulsyObj: this.props.pulsyObj, toggleUnderlay: this.toggleTooltip }),
      React.createElement(PulsyUnderlay, { toggleUnderlay: this.toggleTooltip })
    ) : null;
    return React.createElement(
      'div',
      null,
      dot,
      tooltip
    );
  }
});

var PulsyTour = React.createClass({
  displayName: 'PulsyTour',

  getInitialState: function getInitialState() {
    return {
      showTooltip: false
    };
  },
  resetStorage: function resetStorage() {
    localStorage.clear();
  },
  toggleUnderlay: function toggleUnderlay() {
    this.setState({
      showUnderlay: !this.state.showUnderlay
    });
  },
  closeTooltip: function closeTooltip() {
    this.setState({
      showTooltip: !this.state.showTooltip
    });
  },
  render: function render() {
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
        pulsyObj: this.props.pulsyArray[i]
      }));
    }
    return React.createElement(
      'div',
      { style: style },
      dots,
      React.createElement(
        'button',
        { style: style.resetButton, onClick: this.resetStorage },
        'Reset Storage'
      )
    );
  }
});

// CREATE ARRAY OF PULSY ANCHORS
var pulsyAnchors = document.getElementsByClassName('anchor');
var pulsyArray = [];
function findAnchors() {
  for (var i = 0; i < pulsyAnchors.length; i++) {
    pulsyArray[i] = {
      dotId: i,
      tooltipHeader: 'Default header',
      tooltipNote: 'Default note',
      tooltipCustom: 'Add your custom HTML here.',
      dotClicked: false,
      coordinates: pulsyAnchors[i].getBoundingClientRect(),
      positionFixed: window.getComputedStyle(pulsyAnchors[i], null).getPropertyValue('position') === "fixed",
      dotOptions: {
        horizontal: 0,
        vertical: 0,
        transition: false
      },
      tooltipOptions: {
        horizontal: 0,
        vertical: 0,
        transition: false
      }
    };
  }
}

findAnchors();
var pulsyTour = React.createElement(PulsyTour, { pulsyArray: pulsyArray });

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