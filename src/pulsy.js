var style = {
  pulsyDot: {
    position: 'absolute',
    display: 'inline-block',
    width: '20px',
    height: '20px',
    background: 'rgba(76,147,234,0.4)',
    borderRadius: '100%',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    cursor: 'pointer',
    zIndex: '9998'
  },
  pulsyFront: {
    position: 'absolute',
    display: 'inline-block',
    width: '50px',
    height: '50px',
    background: '#4c93ea',
    borderRadius: '100%',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    cursor: 'pointer',
    zIndex: '9999'
  },
  pulsyTooltip: {
    width: '100px',
    height: '40px',
    background: '#eee',
    position: 'absolute',
    top: '-75px',
    left: '50%',
    transform: 'translate(-50%,0)',
    padding: '10px',
    textAlign: 'center'
  }
}

var userNotes = {}

var anchorSet = document.getElementsByClassName('anchor');
var anchorLength = anchorSet.length;
for (i=0;i<anchorLength;i++) {
  userNotes[i] = 'default tooltip note ' + i;
}

var PulsyTooltip = React.createClass({
  render: function() {
    return (
      <div
      style={style.pulsyTooltip}
      onClick={this.props.remove}>
        {this.props.tooltipMsg}
      </div>
    );
  }
});

var PulsyDot = React.createClass({
  getInitialState: function() {
    return {
      showTooltip: false,
      showDot: true
    };
  },
  dotClick: function() {
    this.setState({
      showTooltip: !this.state.showTooltip,
      showDot: !this.state.showDot
    });
  },
  tooltipClick: function() {
    this.setState({
      showTooltip: !this.state.showTooltip
    });
  },
  render: function() {
    return (
      <div>
        {this.state.showDot ?
          <div
            style={style.pulsyDot}
            onClick={this.dotClick}>
            <div
              style={style.pulsyFront}
              className="spinner"></div>
          </div>
        : null}

        {this.state.showTooltip ?
          <PulsyTooltip
            tooltipMsg = {userNotes[this.props.anchorNumber]}
            remove={this.tooltipClick}
          />
        : null}
      </div>
    );
  }
});

for (i=0;i<anchorLength;i++) {
  React.render(<PulsyDot anchorNumber = {i}/>, anchorSet[i]);
}
