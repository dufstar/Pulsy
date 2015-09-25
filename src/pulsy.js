// CREATE ARRAY OF PULSY ANCHORS
var pulsyAnchors = document.getElementsByClassName('anchor');
var pulsyLength = pulsyAnchors.length;
var pulsyArray = [];
for (i=0;i<pulsyAnchors.length;i++) {
  pulsyArray[i] = {
    dotNumber: i,
    tooltipName: 'Tooltip Name #' + i,
    tooltipNote: 'Default tooltip note.',
    dotClicked: false,
    coordinates: pulsyAnchors[i].getBoundingClientRect(),
  };
}

var PulsyTooltip = React.createClass({
  render: function() {
    return (
      <div>
        yebo
      </div>
    );
  }
});

var PulsyDot = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      top: this.props.coordinates.top, //(this.props.coordinates.top + this.props.coordinates.bottom)/2
      left: this.props.coordinates.left,
      width: this.props.coordinates.width,
      height: this.props.coordinates.height,
      background: 'blue'
    }
    return (
      <div style={style}>
        {this.props.dotNumber}
        {this.props.coordinates.top}
      </div>
    );
  }
});

var PulsyTour = React.createClass({
  render: function() {
    var style = {
      zIndex: '9999',
      position: 'absolute',
      opacity: '0.5'
    }
    var pulsyLength = this.props.anchors;
    var dots = [];
    for (i=0;i<pulsyLength;i++) {
      dots.push(<PulsyDot dotNumber={i} coordinates={this.props.pulsyArray[i].coordinates} />);
    }
    return (
      <div style={style}>
        {dots}
      </div>
    )
  }
});

// RENDER ROOT COMPONENT IN DOM
React.render(<PulsyTour
                anchors={pulsyLength}
                pulsyArray={pulsyArray}
              />, document.getElementById('pulsy-tour')
);




//   var style = {
//     pulsyDot: {
//       position: 'absolute',
//       display: 'inline-block',
//       width: '20px',
//       height: '20px',
//       background: 'rgba(255,255,255,0.4)',
//       borderRadius: '100%',
//       left: '50%',
//       top: '50%',
//       transform: 'translate(-50%,-50%)',
//       cursor: 'pointer',
//       zIndex: '9998',
//     },
//     pulsyFront: {
//       position: 'absolute',
//       display: 'inline-block',
//       width: '50px',
//       height: '50px',
//       background: 'rgba(255,255,255,0.7)',
//       borderRadius: '100%',
//       left: '50%',
//       top: '50%',
//       transform: 'translate(-50%,-50%)',
//       cursor: 'pointer',
//       zIndex: '9999',
//     },
//     pulsyTooltip: {
//       minWidth: '200px',
//       minHeight: '35px',
//       background: '#eee',
//       position: 'absolute',
//       top: '-75px',
//       left: '50%',
//       transform: 'translate(-50%,0)',
//       padding: '15px',
//       textAlign: 'left',
//     },
//     closeTooltip: {
//       color: '#333',
//       transform: 'translate(-50%, -5%) rotate(-45deg)',
//       position: 'absolute',
//       top: '0',
//       right: '0',
//       fontSize: '20px',
//       fontFamily: 'sans-serif',
//       fontWeight: '300',
//       cursor: 'pointer',
//     }
//   }
//
//   var anchorSet = document.getElementsByClassName('anchor');
//   var setLength = anchorSet.length;
//   var dotTooltips = [];
//   for (i=0;i<setLength;i++) {
//     dotTooltips[i] = {
//       dotNumber: i,
//       tooltipName: 'Tooltip Name #' + i,
//       tooltipNote: 'Some tooltip note of great significance and utility.',
//       dotClicked: false,
//     };
//   }
// // var PulsyTooltip = React.createClass({ //
//
// // anchorSet[1].parentElement.getBoundingClientRect().right
//
//   ////////////////////
//   // PULSYTOOLTIP
//   var PulsyTooltip = React.createClass({
//     render: function() {
//       return (
//         <div style={style.pulsyTooltip}>
//           {this.props.tooltipMsg}
//           <div style={style.closeTooltip} onClick={this.props.removeTooltip}> + </div>
//         </div>
//       );
//     }
//   });
//
//   ////////////////////
//   // PULSYDOT
//   var PulsyDot = React.createClass({
//     getInitialState: function() {
//       return {
//         showTooltip: false,
//         dotClicked: dotTooltips[this.props.anchorNumber].dotClicked,
//       };
//     },
//     dotClick: function() {
//       this.setState({
//         showTooltip: !this.state.showTooltip,
//         dotClicked: !this.state.dotClicked,
//       });
//       dotTooltips[this.props.anchorNumber].dotClicked = !this.state.dotClicked;
//     },
//     tooltipClick: function() {
//       this.setState({
//         showTooltip: !this.state.showTooltip
//       });
//     },
//     render: function() {
//       var dot = !this.state.dotClicked ?
//         <div style={style.pulsyDot} onClick={this.dotClick}>
//           <div style={style.pulsyFront} className="spinner"></div>
//         </div> :
//         null;
//       var tooltip = this.state.showTooltip ?
//           <PulsyTooltip tooltipMsg = {
//               dotTooltips[this.props.anchorNumber].tooltipNote
//             } removeTooltip={this.tooltipClick} /> :
//         null;
//       return (
//         <div>
//           {dot}
//           {tooltip}
//         </div>
//       );
//     }
//   });
//
//   ////////////////////
//   // RENDER
//   for (i=0;i<setLength;i++) {
//     React.render(<PulsyDot anchorNumber = {i}/>, anchorSet[i]);
//   }
