
var PulsyTooltip = React.createClass({
  render: function() {
    var style = {
      pulsyTooltip: {
        minWidth: '200px',
        minHeight: '35px',
        background: '#eee',
        position: 'absolute',
        top: this.props.coordinates.top/2 + this.props.coordinates.bottom/2 - 130,
        left: this.props.coordinates.left/2 + this.props.coordinates.right/2 - 8,
        transform: 'translate(-50%,0)',
        padding: '15px',
        textAlign: 'left',
        borderRadius: '2px',
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
        cursor: 'pointer',
      }
    }
    return (
      <div style={style.pulsyTooltip}>
        {this.props.tooltipMsg}
        <div style={style.closeTooltip} onClick={this.props.removeTooltip}> + </div>
      </div>
    );
  }
});

var PulsyDot = React.createClass({
  getInitialState: function() {
    return {
      showTooltip: false,
      dotClicked: pulsyArray[this.props.dotNumber].dotClicked,
    };
  },
  dotClick: function() {
    this.setState({
      showTooltip: !this.state.showTooltip,
      dotClicked: !this.state.dotClicked,
    });
    pulsyArray[this.props.dotNumber].dotClicked = !this.state.dotClicked;
  },
  tooltipClick: function() {
    this.setState({
      showTooltip: !this.state.showTooltip
    });
  },
  render: function() {
    var style = {
      pulsyDot: {
        top: this.props.coordinates.top/2 + this.props.coordinates.bottom/2 - 8,
        left: this.props.coordinates.left/2 + this.props.coordinates.right/2 - 8,
        position: 'absolute',
        display: 'inline-block',
        width: '20px',
        height: '20px',
        transform: 'translate(-50%,-50%)',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '100%',
        cursor: 'pointer',
        zIndex: '9998',
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
      }
    }
    var dot = !this.state.dotClicked ?
      <div style={style.pulsyDot} onClick={this.dotClick}>
        <div style={style.pulsyFront} className="spinner"></div>
      </div> :
      null;
    var tooltip = this.state.showTooltip ?
        <PulsyTooltip tooltipMsg = {pulsyArray[this.props.dotNumber].tooltipNote} removeTooltip={this.tooltipClick} coordinates={this.props.coordinates}/> :
      null;
    return (
      <div>
        {dot}
        {tooltip}
      </div>
    );
  }
});

var PulsyTour = React.createClass({
  render: function() {
    var style = {
      zIndex: '9999',
      position: 'absolute',
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
  }
}

// RENDER ROOT COMPONENT IN DOM
window.onresize = function() {
  for (i=0;i<pulsyAnchors.length;i++) {
    pulsyArray[i] = {
      dotNumber: i,
      tooltipName: 'Tooltip Name #' + i,
      tooltipNote: 'Default tooltip note.',
      dotClicked: false,
      coordinates: pulsyAnchors[i].getBoundingClientRect(),
    }
  }
  console.log('yebo');
  React.render(<PulsyTour
                anchors={pulsyLength}
                pulsyArray={pulsyArray}
              />, document.getElementById('pulsy-tour')
            );
}

React.render(<PulsyTour
              anchors={pulsyLength}
              pulsyArray={pulsyArray}
            />, document.getElementById('pulsy-tour')
          );
