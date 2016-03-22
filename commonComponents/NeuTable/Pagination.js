const React = require('react');
const BootstrapPagination = require('react-bootstrap/lib/Pagination');
const {Component} = React;

// The defaut buttons in Pagination
// redirect the page when clicked. This circumvents
// the default behavior, and adds standardized widths
// to the buttons.
class PaginationButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }
  render() {
    const {children} = this.props;
    return (
      <a
        role="button"
        className="btn btn-default"
        onClick={this.handleClick}
        style={{minWidth: 40}}
        >
        {children}
      </a>
    );
  }
}

// hides nav buttons if less than 10 items
// if nav buttons are visible, show max 5 numbered buttons
// otherwise, max is 10.
PaginationButton.displayName = 'PaginationButton';

function Pagination({activePage, onSelect, items}) {

  const showNavButtons = items > 10;

  return (
    <BootstrapPagination
      prev={showNavButtons}
      next={showNavButtons}
      first={showNavButtons}
      last={showNavButtons}
      ellipsis={false}
      boundaryLinks
      items={items}
      maxButtons={showNavButtons ? 5 : 10}
      activePage={activePage}
      onSelect={onSelect}
      buttonComponentClass={PaginationButton}
      />
  );
}

Pagination.displayName = 'Pagination';
// Pagination.propTypes = BootstrapPagination.propTypes;
module.exports = Pagination;
