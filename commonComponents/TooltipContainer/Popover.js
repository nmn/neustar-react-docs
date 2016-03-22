const React = require('react');
const _ = require('lodash');
const {Component} = React;

const styles = {
  position: 'absolute',
  left: 0,
  top: -10,
  MozTransform: 'translateY(-100%)',
  WebkitTransform: 'translateY(-100%)',
  transform: 'translateY(-100%)',
  background: 'white'
};

const arrowStyles = {
  position: 'absolute',
  left: '50%',
  bottom: -10,
  height: 0,
  width: 0,
  borderTop: '10px solid white',
  MozTransform: 'translateX(-50%)',
  WebkitTransform: 'translateX(-50%)',
  transform: 'translateX(-50%)'
};

function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

class Popover extends Component {
  constructor(props, context) {
    super(props, context);
    this.closeOnBgClick = this.closeOnBgClick.bind(this);
  }
  closeOnBgClick(e) {
    if (this.props.onClose && !isDescendant(this.popover, e.currentTarget)) {
      this.props.onClose();
    }
  }
  componentDidMount() {
    global.document.body.addEventListener('click', this.closeOnBgClick);
  }
  componentWillUnmount() {
    global.document.body.removeEventListener('click', this.closeOnBgClick);
  }
  render() {
    const {children, width} = this.props;
    return (
      <div style={_.extend({}, styles, {width})} ref={e => this.popover = e}>
        {children}
        <div style={arrowStyles} />
      </div>
    );
  }
}

Popover.displayName = 'PopoverContainer.Popover';
module.exports = Popover;
