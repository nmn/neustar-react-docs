const React = require('react');
const {Component, PropTypes} = React;
const _ = require('lodash');
const defaultHeadComponent = require('./HeadComponent');
const defaultCellComponent = require('./CellComponent');
const Pagination = require('./Pagination');

class NeuTable extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      orderBy: null,
      reverse: false,
      pageLength: props.defaultLength,
      page: 1
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  getCSVString() {
    const {data} = this.props;
    const keys = this.getKeys(data);
    const firstRow = keys
      .map(key =>
        key.includes(',') || key.includes('"') ? '"' + key.replace(/"/g, '\\"') + '"' : key
      )
      .join(', ');
    const output = data
      .map(row =>
        keys
          .map(key => row[key])
          .map(val => val.includes(',') || val.includes('"') ? '"' + val.replace(/"/g, '\\"') + '"' : val)
          .join(', '))
      .join('\n');
    return firstRow + '\n' + output + '\n';
  }

  componentWillReceiveProps({resetPageOnProps, resetPageOnLengthChange, data}) {
    if (resetPageOnProps || (resetPageOnLengthChange && this.props.data.length !== data.length)) {
      this.setPage(1);
    }
  }

  setPageLength(pageLength) {
    this.setState({pageLength, page: 1});
    if (this.props.onPageLengthChange) {
      this.props.onPageLengthChange(pageLength);
    }
  }

  setPage(page, e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({page});
    if (this.props.onPageChange) {
      this.props.onPageChange(page);
    }
  }

  handlePagination(event, {eventKey: pageNum}) {
    this.setPage(pageNum);
    event.preventDefault();
    event.stopPropagation();
  }

  orderBy(str) {
    this.setState(({orderBy, reverse}) => {
      if (this.props.onOrder) {
        this.props.onOrder(str, !reverse);
      }
      return {
        orderBy: str,
        reverse: orderBy === str ? !reverse : false
      };
    });

    if (this.props.resetPageOnOrder) {
      this.setPage(1);
    }
  }

  getKeys(arr) {
    return _(arr)
      .map(x => Object.keys(x))
      .flatten()
      .uniq()
      .value();
  }

  render() {

    let {data, lengths, keysToRender, HeadComponent, CellComponent, keyTypes, headRenderers, cellRenderers, unsortableKeys} = this.props;
    const {orderBy, reverse, pageLength, page} = this.state;
    const keys = keysToRender || this.getKeys(data);

    if (orderBy) {
      if (keyTypes && keyTypes[orderBy] === 'number') {
        data = data.sort((a, b) => parseFloat(a[orderBy]) - parseFloat(b[orderBy]));
      } else {
        data = _.sortBy(data, orderBy);
      }
      if (reverse) {
        data = data.reverse();
      }
    }

    const pages = _.range(1, Math.ceil(data.length / pageLength));
    const skip = (page - 1) * pageLength;
    const renderData = data.slice(skip, skip + pageLength);

    return (
      <div>
        <table className="nux-table table table-responsive ng-scope ng-table">
          <thead>
            <tr>
              {keys.map(key =>
                <HeadComponent
                  key={key}
                  keyName={key}
                  onClick={this.orderBy.bind(this, key)}
                  orderBy={orderBy}
                  reverse={reverse}
                  sortable={unsortableKeys.indexOf(key) === -1}
                  >
                  {headRenderers && headRenderers[key] ? headRenderers[key](key) : key}
                </HeadComponent>
              )}
            </tr>
          </thead>
          <tbody>
            {renderData.map((obj, i) =>
              <tr key={'d' + i}>
                {keys.map(key =>
                  <CellComponent
                    key={key}
                    value={obj[key]}
                    keyName={key}
                    obj={obj}
                    >
                    {cellRenderers && cellRenderers[key] ? cellRenderers[key](obj[key], obj) : obj[key]}
                  </CellComponent>
                )}
              </tr>
            )}
          </tbody>
        </table>

        <div className="ng-table-pager">
          <div className="ng-table-counts btn-group pull-right">
            {lengths
              .filter(l => l < data.length)
              .map(l =>
                <button
                  type="button"
                  className={'btn btn-default' + (l === pageLength ? ' active' : '')}
                  key={'l' + l}
                  onClick={this.setPageLength.bind(this, l)}
                  >
                  <span>{l}</span>
                </button>
              )
            }
          </div>

          { pages.length ?
            <Pagination
              items={pages.length}
              activePage={page}
              onSelect={this.handlePagination}
              />
            : null
          }
        </div>
      </div>
    );
  }
}

NeuTable.displayName = 'NeuTable';
NeuTable.propTypes = {
  // ##required
  data: PropTypes.arrayOf(PropTypes.object).isRequired, // An array of objects. The data to be rendered

  // ##optional
  lengths: PropTypes.arrayOf(PropTypes.number).isRequired,
  // The possible number of items per page shown in the toolbar below.
  // Defauls to [10, 25, 50, 100]
  defaultLength: PropTypes.number.isRequired,
  // The page Length to start with. Defaults to 25
  resetPageOnProps: PropTypes.bool.isRequired,
  // If the table should go back to page 1 when it receives new props (default: false)
  resetPageOnOrder: PropTypes.bool.isRequired,
  // If the table should go back to page 1 when it receives new data with a different length (default: true)
  keysToRender: PropTypes.arrayOf(PropTypes.string),
  // The keys of the object to render as columns in the table.
  // This can be used to skip unneeded columns, but also render extra columns.
  unsortableKeys: PropTypes.arrayOf(PropTypes.string),
  // the keys which should not be sortable
  keyTypes: PropTypes.objectOf(PropTypes.oneOf(['number', 'string', 'date'])),
  // Define the value types for the keys in the data. This is used to sort columns correctly.
  // This will also be used to show a date picker in the search when search by a date type.
  HeadComponent: PropTypes.func,
  // The Component used to render table headers. Can be overriden for custom rendering
  CellComponent: PropTypes.func,
  // The Component used to render table cells. Can be overriden for custom rendering
  headRenderers: PropTypes.objectOf(PropTypes.func),
  // An object that maps keyNames to functions that transform the renderable value in headers
  cellRenderers: PropTypes.objectOf(PropTypes.func),
  // An object that maps keyNames to functions that transform the renderable value in cells

  // ## Callbacks
  onPageChange: PropTypes.func,
  // Callback when table page is changed. Can be used for server-side fetching of new data
  onPageLengthChange: PropTypes.func,
  // Callback when table length is changed. Can be used for server-side fetching of new data
  onOrder: PropTypes.func
  // Callback when the table is sorted by one of the headers.
};
NeuTable.defaultProps = {
  lengths: [10, 25, 50, 100],
  defaultLength: 25,
  resetPageOnProps: false,
  resetPageOnLengthChange: true,
  resetPageOnOrder: true,
  HeadComponent: defaultHeadComponent,
  CellComponent: defaultCellComponent,
  unsortableKeys: []
};

module.exports = NeuTable;
