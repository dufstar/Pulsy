import cube from './styles';
console.log(cube(3));
//

class PulsyUnderlay extends React.Component {
  render() {
    var style = {
      background: 'rgba(76,147,234,0.5)',
      zIndex: '9998',
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100vw',
      height: '100vh',
    }
    var underlay = this.props.pulsyObj.showUnderlay ? style : null;
    return (
        <div style={underlay} onClick={this.props.toggleTooltip}></div>
    );
  }
}

class PulsyTooltip extends React.Component{
  render() {
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
        top: positionFixed ?
          (coor.top + coor.bottom)/2 + ptv :
          (coor.top + coor.bottom)/2 + window.scrollY + ptv,
        left: positionFixed ?
          (coor.left + coor.right)/2 + pth :
          (coor.left + coor.right)/2 + window.scrollX + pth,
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
        cursor: 'pointer',
      }
    }
    return (
      <div style={style.pulsyTooltip}>
        <div>{po.tooltip.tooltipNote}</div>
        <div>{po.tooltip.tooltipCustom}</div>
        <div style={style.closeTooltip} onClick={this.props.toggleUnderlay}> + </div>
      </div>
    );
  }
}

class PulsyDot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      dotClicked: this.props.pulsyObj.dotClicked || localStorage.getItem("dotClicked" + this.props.pulsyObj.dotId),
    }
  }
  dotClick() {
    this.setState({
      showTooltip: !this.state.showTooltip,
      dotClicked: !this.state.dotClicked,
    });
    this.props.pulsyObj.dotClicked = !this.state.dotClicked;
    localStorage.setItem("dotClicked" + this.props.pulsyObj.dotId, true);
    this.props.toggleUnderlay;
  }
  toggleTooltip() {
    this.setState({
      showTooltip: false,
    });
  }
  render() {
    var po = this.props.pulsyObj;
    var coordinates = po.coordinates;
    var pdv = po.dot.positionTop;
    var pdh = po.dot.positionLeft;
    var style = {
      pulsyDot: {
        top: po.positionFixed ? (coordinates.top + coordinates.bottom)/2 : (coordinates.top + coordinates.bottom)/2 + pdv + window.scrollY,
        left: po.positionFixed ? (coordinates.left + coordinates.right)/2 : (coordinates.left + coordinates.right)/2 + pdh + window.scrollX,
        position: 'absolute',
        display: 'inline-block',
        width: po.dot.dotSize,
        height: po.dot.dotSize,
        transform: 'translate(-50%,-50%)',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '100%',
        cursor: 'pointer',
        zIndex: '9997',
        position: po.positionFixed ? 'fixed' : 'absolute',
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
    var pulseName = "pulse-" + this.props.dotId;
    var dot = !this.state.dotClicked ?
      <div style={style.pulsyDot} onClick={this.dotClick.bind(this)} className={pulseName}>
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
        outline: 'none',
      },
    }
    let pulsyLength = pulsyAnchors.length;
    var dots = [];
    for (var i=0;i<pulsyLength;i++) {
      dots.push(<PulsyDot
        showTooltip={this.state.showTooltip}
        pulsyObj={this.props.pulsyUtilities[i]}
      />);
    }
    return (
      <div style={style}>
        {dots}
        <button style={style.resetButton} onClick={this.resetStorage.bind(this)}>Reset Storage</button>
      </div>
    )
  }
}


// CREATE ARRAY OF PULSY ANCHORS
var pulsyAnchors = document.getElementsByClassName('anchor');
var pulsyUtilities = [];
function findAnchors() {
  for (var i=0;i<pulsyAnchors.length;i++) {
    var anchorStyles = window.getComputedStyle(pulsyAnchors[i],null);
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
        padding: 15,
      },
      dot: {
        positionLeft: 0,
        positionTop: 0,
        transition: false,
        dotSize: 30,
      },
    }
  }
}

findAnchors();
var pulsyTour = <PulsyTour pulsyUtilities={pulsyUtilities} />

// RENDER ROOT COMPONENT
React.render(pulsyTour, document.getElementById('pulsy-tour'));

window.onresize = function renderResize() {
  findAnchors();
  React.render(pulsyTour, document.getElementById('pulsy-tour'));
}

window.onscroll = function renderScroll() {
  findAnchors();
  React.render(pulsyTour, document.getElementById('pulsy-tour'));
}
