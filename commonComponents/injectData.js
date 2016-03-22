const React = require('react');
const {Component, PropTypes} = React;
const {toPostObj, pluck} = require('./helpers');

function injectData(query, SubComponent) {
  class DataInjection extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        data: null
      };
    }

    componentDidMount() {
      this.fetchData(this.props);
    }

    componentWillReceiveProps(newProps) {
      if (newProps.route !== this.props.route && newProps.route.indexOf(this.props.route) !== 0) {
        this.fetchData(newProps);
      }
    }

    fetchData(props) {
      const {$http, environment} = this.context;
      Promise.resolve(typeof query === 'string' ? query : query(props))
        .then(toPostObj(environment))
        .then($http)
        .then(pluck('data.data'))
        .then(data => this.setState({data}))
        .catch(console.error.bind(console));
    }

    render() {
      return (
        <SubComponent
          {...this.props}
          data={this.state.data}
        />
      );
    }
  }

  DataInjection.displayName = 'DataInjection.' + SubComponent.displayName;
  DataInjection.contextTypes = {
    $http: PropTypes.any.isRequired,
    environment: PropTypes.any.isRequired
  };
  DataInjection.propTypes = SubComponent.propTypes;

  return DataInjection;
}

module.exports = injectData;
