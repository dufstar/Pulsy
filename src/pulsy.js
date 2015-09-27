var PulsyTooltip = React.createClass({
  render: function() {
    var coordinates = this.props.coordinates;
    var style = {
      pulsyTooltip: {
        minWidth: '200px',
        minHeight: '35px',
        background: '#eee',
        position: 'absolute',
        top: this.props.positionFixed ? (coordinates.top + coordinates.bottom)/2 - 130 : (coordinates.top + coordinates.bottom)/2 - 130 + window.scrollY,
        left: this.props.positionFixed ? (coordinates.left + coordinates.right)/2 : (coordinates.left + coordinates.right)/2 + window.scrollX,
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
      dotClicked: pulsyArray[this.props.dotId].dotClicked || localStorage.getItem("dotClicked" + this.props.dotId),
    };
  },
  dotClick: function() {
    this.setState({
      showTooltip: !this.state.showTooltip,
      dotClicked: !this.state.dotClicked,
    });
    pulsyArray[this.props.dotId].dotClicked = !this.state.dotClicked;
    localStorage.setItem("dotClicked" + this.props.dotId, true);
  },
  tooltipClick: function() {
    this.setState({
      showTooltip: !this.state.showTooltip
    });
  },
  render: function() {
    var coordinates = this.props.coordinates;
    var style = {
      pulsyDot: {
        top: this.props.positionFixed ? (coordinates.top + coordinates.bottom)/2 : (coordinates.top + coordinates.bottom)/2 + window.scrollY,
        left: this.props.positionFixed ? (coordinates.left + coordinates.right)/2 : (coordinates.left + coordinates.right)/2 + window.scrollX,
        position: 'absolute',
        display: 'inline-block',
        width: '20px',
        height: '20px',
        transform: 'translate(-50%,-50%)',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '100%',
        cursor: 'pointer',
        zIndex: '9998',
        position: this.props.positionFixed ? 'fixed' : 'absolute',
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
        position: this.props.positionFixed ? 'fixed' : 'absolute',
      }
    }
    var dot = !this.state.dotClicked ?
      <div style={style.pulsyDot} onClick={this.dotClick}>
        <div style={style.pulsyFront} className="spinner"></div>
      </div> :
      null;
    var tooltip = this.state.showTooltip ?
        <PulsyTooltip positionFixed={this.positionFixed} tooltipMsg={pulsyArray[this.props.dotId].tooltipNote} removeTooltip={this.tooltipClick} coordinates={this.props.coordinates}/> :
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
  resetStorage: function() {
    localStorage.clear();
  },
  render: function() {
    var style = {
      zIndex: '9999',
      position: 'absolute',
    }
    var pulsyLength = this.props.anchors;
    var dots = [];
    for (i=0;i<pulsyLength;i++) {
      dots.push(<PulsyDot
        dotId={i}
        coordinates={this.props.pulsyArray[i].coordinates}
        positionFixed={this.props.pulsyArray[i].positionFixed} />);
    }
    return (
      <div style={style}>
        {dots}
        <button onClick={this.resetStorage}>Reset Storage</button>
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
    dotId: i,
    tooltipName: 'Tooltip Name #' + i,
    tooltipNote: 'Default tooltip note.',
    dotClicked: false,
    coordinates: pulsyAnchors[i].getBoundingClientRect(),
    positionFixed: false,
  }
}

// RENDER ROOT COMPONENT ON WINDOW RESIZE
window.onresize = function() {
  for (i=0;i<pulsyAnchors.length;i++) {
    pulsyArray[i].coordinates = pulsyAnchors[i].getBoundingClientRect();
    pulsyArray[i].positionFixed = window.getComputedStyle(pulsyAnchors[i],null).getPropertyValue('position') === "fixed";
  }
  React.render(<PulsyTour
                anchors={pulsyLength}
                pulsyArray={pulsyArray}
              />, document.getElementById('pulsy-tour')
            );
}

window.onscroll = function() {
  for (i=0;i<pulsyAnchors.length;i++) {
    pulsyArray[i].coordinates = pulsyAnchors[i].getBoundingClientRect();
    pulsyArray[i].positionFixed = window.getComputedStyle(pulsyAnchors[i],null).getPropertyValue('position') === "fixed";
  }
  console.log('yebo');
  React.render(<PulsyTour
                anchors={pulsyLength}
                pulsyArray={pulsyArray}
              />, document.getElementById('pulsy-tour')
            );
}

// RENDER ROOT COMPONENT
React.render(<PulsyTour
              anchors={pulsyLength}
              pulsyArray={pulsyArray}
            />, document.getElementById('pulsy-tour')
          );
