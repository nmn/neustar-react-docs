const React = require('react');
const _ = require('lodash');
const {Component} = React;

class Link extends Component {
  render() {

    const passDownProps = _.extend({}, this.props);
    delete passDownProps.sref;
    delete passDownProps.children;
    delete passDownProps.onClick;

    return (
      <a {...passDownProps}>
        {this.props.children}
      </a>
    );
  }
}

Link.displayName = 'Link';
module.exports = Link;
