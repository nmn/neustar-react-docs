const React = require('react');
const {Component, PropTypes} = React;

class Link extends Component {
  go(event) {

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (!this.props.sref && !this.props.to) {
      return;
    }

    event.preventDefault();

    if (Array.isArray(this.props.sref)) {
      this.context.$state.go(...this.props.sref);
    } else if (this.props.sref) {
      this.context.$state.go(this.props.sref);
    } else {
      this.context.$state.go(
        'manage.user-provisioning',
        {query: this.props.to[0] === '/' ? this.props.to.slice(1) : this.props.to }
      );
    }
  }
  render() {

    const passDownProps = Object.assign({}, this.props);
    delete passDownProps.sref;
    delete passDownProps.to;
    delete passDownProps.children;
    delete passDownProps.onClick;

    return (
      <a
        onClick={this.go.bind(this)}
        {...passDownProps}
        >
        {this.props.children}
      </a>
    );
  }
}

Link.displayName = 'Link';
Link.contextTypes = {
  $state: PropTypes.any.isRequired
};
module.exports = Link;
