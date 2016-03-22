const React = require('react');
const {Component, PropTypes} = React;

class Root extends Component {
  getChildContext() {
    return {
      $http: this.props.$http,
      environment: this.props.environment,
      $state: this.props.$state,
      $rootScope: this.props.$rootScope
    };
  }
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}

Root.childContextTypes = {
  $http: PropTypes.any.isRequired,
  environment: PropTypes.any.isRequired,
  $state: PropTypes.any.isRequired,
  $rootScope: PropTypes.any.isRequired
};

Root.propTypes = Root.childContextTypes;

Root.displayName = 'Root';
Root.$inject = [
  '$http',
  'environment',
  '$state',
  '$rootScope'
];

module.exports = Root;
