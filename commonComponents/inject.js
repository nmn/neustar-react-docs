const React = require('react');
const _ = require('lodash');
const {Component,PropTypes} = React;

function inject(dependencies, Komponent) {

  class Injector extends Component {
    render() {
      return <Komponent {...this.props} {...this.context}/>;
    }
  }

  Injector.contextTypes = _(dependencies)
    .map((depName) => [depName, PropTypes.any.isRequired])
    .reduce( (obj, arr) => _.extend({}, obj, {[arr[0]]: arr[1]}), {});

  Injector.propTypes = Komponent.propTypes;
  Injector.displayName = 'inject.' + Komponent.displayName;

  return Injector;
}

module.exports = inject;
