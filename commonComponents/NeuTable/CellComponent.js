const React = require('react');

const CellComponent = ({children}) => <td>{children}</td>;
CellComponent.displayName = 'CellComponent';

module.exports = CellComponent;
