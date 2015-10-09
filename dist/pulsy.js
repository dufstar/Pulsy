// wrap in a IIFE (immediately invoked function expression)
// (function (){

// var Radium = require('radium');

'use strict';

var PulsyUnderlay = React.createClass({
  displayName: 'PulsyUnderlay',

  render: function render() {
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
});
// module.exports = Radium(PulsyUnderlay);

var PulsyTooltip = React.createClass({
  displayName: 'PulsyTooltip',

  render: function render() {
    var coor = this.props.coordinates;
    var positionFixed = this.props.positionFixed;
    var horiz = this.props.adjustHorizontal;
    var vert = this.props.adjustVertical;
    var pumh = this.props.pumh;
    var pumv = this.props.pumv;
    var style = {
      pulsyTooltip: {
        minWidth: '200px',
        minHeight: '35px',
        background: '#eee',
        position: 'absolute',
        top: positionFixed ? (coor.top + coor.bottom) / 2 + vert + pumv : (coor.top + coor.bottom) / 2 + window.scrollY + pumv,
        left: positionFixed ? (coor.left + coor.right) / 2 + horiz + pumh : (coor.left + coor.right) / 2 + window.scrollX + pumh,
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
        pulsyArray[this.props.dotId].tooltipNote
      ),
      React.createElement(
        'div',
        null,
        pulsyArray[this.props.dotId].tooltipCustom
      ),
      React.createElement(
        'div',
        { style: style.closeTooltip, onClick: this.props.toggleTooltip },
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
      dotClicked: pulsyArray[this.props.dotId].dotClicked || localStorage.getItem("dotClicked" + this.props.dotId)
    };
  },
  dotClick: function dotClick() {
    this.setState({
      showTooltip: !this.state.showTooltip,
      dotClicked: !this.state.dotClicked
    });
    pulsyArray[this.props.dotId].dotClicked = !this.state.dotClicked;
    localStorage.setItem("dotClicked" + this.props.dotId, true);
    this.props.toggleUnderlay();
  },
  toggleTooltip: function toggleTooltip() {
    this.setState({
      showTooltip: false
    });
  },
  render: function render() {
    var coordinates = this.props.coordinates;
    var pudh = this.props.pudh;
    var pudv = this.props.pudv;
    var style = {
      pulsyDot: {
        top: this.props.positionFixed ? (coordinates.top + coordinates.bottom) / 2 : (coordinates.top + coordinates.bottom) / 2 + pudv + window.scrollY,
        left: this.props.positionFixed ? (coordinates.left + coordinates.right) / 2 : (coordinates.left + coordinates.right) / 2 + pudh + window.scrollX,
        position: 'absolute',
        display: 'inline-block',
        width: '20px',
        height: '20px',
        transform: 'translate(-50%,-50%)',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '100%',
        cursor: 'pointer',
        zIndex: '9997',
        position: this.props.positionFixed ? 'fixed' : 'absolute'
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
      { style: style.pulsyDot, onClick: this.dotClick, className: pulseName },
      React.createElement('div', { style: style.pulsyFront, className: 'spinner' })
    ) : null;
    var tooltip = this.state.showTooltip ? React.createElement(
      'div',
      null,
      React.createElement(PulsyTooltip, {
        positionFixed: this.positionFixed,
        closeTooltip: this.props.closeTooltip,
        toggleTooltip: this.toggleTooltip,
        coordinates: this.props.coordinates,
        dotId: this.props.dotId,
        pumh: this.props.pumh,
        pumv: this.props.pumv,
        pudh: this.props.pudh,
        pudv: this.props.pudv
      }),
      React.createElement(PulsyUnderlay, {
        toggleUnderlay: this.toggleTooltip
      })
    ) : null;
    return React.createElement(
      'div',
      null,
      dot,
      tooltip,
      console.log(this.props.pumv)
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
      position: 'absolute'
    };
    var pulsyLength = this.props.anchors;
    var dots = [];
    for (i = 0; i < pulsyLength; i++) {
      dots.push(React.createElement(PulsyDot, {
        dotId: i,
        coordinates: this.props.pulsyArray[i].coordinates,
        positionFixed: this.props.pulsyArray[i].positionFixed,
        toggleUnderlay: this.toggleUnderlay,
        closeTooltip: this.closeTooltip,
        showTooltip: this.state.showTooltip,
        pumh: this.props.pumh,
        pumv: this.props.pumv,
        pudh: this.props.pudh,
        pudv: this.props.pudv
      }));
    }
    return React.createElement(
      'div',
      { style: style },
      dots,
      React.createElement(
        'button',
        { onClick: this.resetStorage },
        'Reset Storage'
      )
    );
  }
});

// CREATE ARRAY OF PULSY ANCHORS
var pulsyAnchors = document.getElementsByClassName('anchor');
var pulsyLength = pulsyAnchors.length;
var pulsyArray = [];
for (i = 0; i < pulsyAnchors.length; i++) {
  pulsyArray[i] = {
    dotId: i,
    tooltipHeader: 'Default header',
    tooltipNote: 'Default note',
    tooltipCustom: 'Add your custom HTML here.',
    dotClicked: false,
    coordinates: pulsyAnchors[i].getBoundingClientRect(),
    positionFixed: false,
    dotStyles: {},
    dotOptions: {},
    tooltipStyles: {},
    tooltipOptions: {}
  };
}

window.PulsyAdjustments = {
  pulsyTooltipHorizontal: 0,
  pulsyTooltipVertical: 0,
  pulsyDotHorizontal: 100,
  pulsyDotVertical: 50
};

// RENDER ROOT COMPONENT ON WINDOW RESIZE
window.onresize = function () {
  for (i = 0; i < pulsyAnchors.length; i++) {
    pulsyArray[i].coordinates = pulsyAnchors[i].getBoundingClientRect();
    pulsyArray[i].positionFixed = window.getComputedStyle(pulsyAnchors[i], null).getPropertyValue('position') === "fixed";
  }
  React.render(React.createElement(PulsyTour, {
    anchors: pulsyLength,
    pulsyArray: pulsyArray,
    pumh: window.PulsyAdjustments.pulsyTooltipHorizontal,
    pumv: window.PulsyAdjustments.pulsyTooltipVertical,
    pudh: window.PulsyAdjustments.pulsyDotHorizontal,
    pudv: window.PulsyAdjustments.pulsyDotVertical
  }), document.getElementById('pulsy-tour'));
};

window.onscroll = function () {
  for (i = 0; i < pulsyAnchors.length; i++) {
    pulsyArray[i].coordinates = pulsyAnchors[i].getBoundingClientRect();
    pulsyArray[i].positionFixed = window.getComputedStyle(pulsyAnchors[i], null).getPropertyValue('position') === "fixed";
  }
  React.render(React.createElement(PulsyTour, {
    anchors: pulsyLength,
    pulsyArray: pulsyArray,
    pumh: window.PulsyAdjustments.pulsyTooltipHorizontal,
    pumv: window.PulsyAdjustments.pulsyTooltipVertical,
    pudh: window.PulsyAdjustments.pulsyDotHorizontal,
    pudv: window.PulsyAdjustments.pulsyDotVertical
  }), document.getElementById('pulsy-tour'));
};

// RENDER ROOT COMPONENT
React.render(React.createElement(PulsyTour, {
  anchors: pulsyLength,
  pulsyArray: pulsyArray,
  pumh: window.PulsyAdjustments.pulsyTooltipHorizontal,
  pumv: window.PulsyAdjustments.pulsyTooltipVertical,
  pudh: window.PulsyAdjustments.pulsyDotHorizontal,
  pudv: window.PulsyAdjustments.pulsyDotVertical
}), document.getElementById('pulsy-tour'));

// CUSTOMIZE DOTS HERE

var p1 = pulsyArray[0];
window.PulsyUtilities = {
  getPulsyDot: function getPulsyDot(index) {
    return document.getElementsByClassName('pulse-' + index)[0];
  }
};

//MAKE THIS INTO A FUNCTION TO SET THE TOOLTIP NOTE
var tNote = document.getElementsByClassName('anchor')[0].setAttribute('data-pt-tooltip', 'obey obey');
p1.tooltipNote = "This is a tooltip that your users will see after they click on a dot! Isn't this one of the coolest things you've ever seen?";
// }) ();

console.log("get a PulsyDot: ", PulsyUtilities.getPulsyDot(1));
// PulsyUtilities.getPulsyDot(1).style.background = "blue";