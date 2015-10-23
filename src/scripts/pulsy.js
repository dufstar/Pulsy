import React from './react'

class PulsyUnderlay extends React.Component {
  render() {
    return (
        <div
          style={styles.underlay}
          onClick={this.props.toggleTooltip}>
        </div>
    );
  }
}

class PulsyTooltip extends React.Component{
  render() {
    var po = this.props.pulsyObj,
        coordinates = po.dot.coordinates,
        offset = options.tooltip.offset,
        positionFixed = po.positionFixed;
    var style = {
        top: po.dot.fixed ?
          (coordinates.top + coordinates.bottom)/2 + offset.top :
          (coordinates.top + coordinates.bottom)/2 + window.scrollY + offset.top,
        left: po.dot.fixed ?
          (coordinates.left + coordinates.right)/2 + offset.left :
          (coordinates.left + coordinates.right)/2 + window.scrollX + offset.left,
      }
    for (var key in styles.tooltip.container) {
      style[key] = styles.tooltip.container[key];
    }
    return (
      <div style={style}>
        <div>{options.tooltip.content.header}</div>
        <div>{options.tooltip.content.note}</div>
        <div style={styles.tooltip.close} onClick={this.props.toggleUnderlay}> + </div>
      </div>
    );
  }
}

class PulsyDot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      dotClicked: this.props.pulsyObj.dot.clicked || localStorage.getItem("dotClicked" + this.props.pulsyObj.dot.id),
    }
  }
  dotClick() {
    this.setState({
      showTooltip: !this.state.showTooltip,
      dotClicked: !this.state.dotClicked,
    });
    this.props.pulsyObj.dot.clicked = !this.state.dotClicked;
    localStorage.setItem("dotClicked" + this.props.pulsyObj.dot.id, true);
    this.props.toggleUnderlay;
  }
  toggleTooltip() {
    this.setState({
      showTooltip: false,
    });
  }
  render() {
    var po = this.props.pulsyObj,
        coordinates = po.dot.coordinates,
        offset = options.dot.offset;
    var style = {
      pulsyBack: {
        top: po.dot.fixed ? (coordinates.top + coordinates.bottom)/2 : (coordinates.top + coordinates.bottom)/2 + offset.top + window.scrollY,
        left: po.dot.fixed ? (coordinates.left + coordinates.right)/2 : (coordinates.left + coordinates.right)/2 + offset.left + window.scrollX,
        width: styles.dot.back.size,
        height: styles.dot.back.size,
        position: po.dot.fixed ? 'fixed' : 'absolute',
      },
      pulsyFront: {
        width: styles.dot.front.size,
        height: styles.dot.front.size,
        left: '50%',
        top: '50%',
      }
    }
    for (var key in styles.dot) {
      style.pulsyBack[key] = styles.dot[key];
    }
    for (var key in styles.dot) {
      style.pulsyFront[key] = styles.dot[key];
    }
    var pulseName = "pulse-" + this.props.dotId;
    var dot = !this.state.dotClicked ?
      <div style={style.pulsyBack} onClick={this.dotClick.bind(this)} className={pulseName}>
        <div style={style.pulsyFront} className="spinner"></div>
      </div> :
      null;
    var tooltip = this.state.showTooltip ?
      <div>
          <PulsyTooltip pulsyObj={this.props.pulsyObj} toggleUnderlay={this.toggleTooltip.bind(this)} />
        <PulsyUnderlay toggleTooltip={this.toggleTooltip.bind(this)} pulsyObj={this.props.pulsyObj} />
      </div> :
      null;
    return (
      <div>
        {dot}
        {tooltip}
      </div>
    );
  }
}

class PulsyTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
    }
  }
  resetStorage() {
    localStorage.clear();
  }
  toggleUnderlay() {
    this.setState({
      showUnderlay: !this.state.showUnderlay
    });
  }
  closeTooltip() {
    this.setState({
      showTooltip: !this.state.showTooltip,
    });
  }
  render() {
    let pulsyLength = pulsyAnchors.length;
    var dots = [];
    for (var i=0;i<pulsyLength;i++) {
      dots.push(<PulsyDot
        showTooltip={this.state.showTooltip}
        pulsyObj={this.props.pulsyInit[i]}
      />);
    }
    return (
      <div style={styles.tour}>
        {dots}
        <button style={styles.resetButton} onClick={this.resetStorage.bind(this)}>Reset Storage</button>
      </div>
    )
  }
}

// CREATE ARRAY OF PULSY ANCHORS
var pulsyInit = [],
    pulsyAnchors = document.getElementsByClassName('anchor');
function findAnchors() {
  for (var i=0;i<pulsyAnchors.length;i++) {
    var anchorStyles = window.getComputedStyle(pulsyAnchors[i],null),
        pulsyHeader = pulsyAnchors[i].getAttribute('data-pulsy-header'),
        pulsyNote = pulsyAnchors[i].getAttribute('data-pulsy-note');
    pulsyInit[i] = {
      dot: {
        id: i,
        clicked: false,
        coordinates: pulsyAnchors[i].getBoundingClientRect(),
        fixed: anchorStyles.getPropertyValue('position') === "fixed",
      },
      tooltip: {
        tooltipHeader: pulsyHeader ? pulsyHeader : options.tooltip.content.header,
        tooltipNote: pulsyNote ? pulsyNote : options.tooltip.content.note,
      }
    }
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
      top: 0,
    },
  },
  tooltip: {
    edgeSense: true,
    animation: 'default',
    direction: 'above',
    close: true,
    next: {
      display: true,
      label: 'Next',
    },
    next: {
      display: false,
      label: 'Exit tour',
    },
    content: {
      header: 'Default header',
      note: 'Default note',
    },
    offset: {
      left: 0,
      top: 0,
    },
  },
  callbacks: {
    tourComplete: null,
    stepComplete: null,
    optOut: null,
  }
}

var styles = {
  tour: {
    zIndex: '9999',
    position: 'absolute',
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
      size: 30,
    },
    front: {
      size: 50,
    },
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
      zIndex: '9999',
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
      cursor: 'pointer',
    },
    next: {
      display: 'block',
    },
    optOut: {
      display: 'block',
    },
  },
  underlay: {
    background: 'rgba(76,147,234,0.5)',
    zIndex: '9998',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
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
    outline: 'none',
  }
}

var pulsyTour = <PulsyTour pulsyInit={pulsyInit} />

// RENDER ROOT COMPONENT
function pulsy() {
  findAnchors();
  React.render(pulsyTour, document.getElementById('pulsy-tour'));
}

pulsy();

window.onresize = function renderResize() {
  pulsy();
}
window.onscroll = function renderScroll() {
  pulsy();
}
