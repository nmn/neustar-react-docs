const React = require('react');
const {Component} = React;
const NeuTable = require('../NeuTable');
const _ = require('lodash');
const {filter} = require('fuzzaldrin');

const selectStyles = {
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  borderRadius: 0,
  height: 38
};

class SearchNeuTable extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      query: '',
      option: ''
    };

    this.clear = this.clear.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.setOption = this.setOption.bind(this);
    this.onSearchUpdate = this.onSearchUpdate.bind(this);
  }

  getKeys(arr) {
    return _(arr)
      .map(x => Object.keys(x))
      .flatten()
      .uniq()
      .value();
  }

  getCSVString() {
    if (this._table) {
      return this._table.getCSVString();
    }
  }

  setQuery() {
    this.setState({query: this._input.value.trim()}, this.onSearchUpdate);
  }

  setOption(e) {
    this.setState({option: e.target.value}, this.onSearchUpdate);
  }

  onSearchUpdate() {
    const {query, option} = this.state;
    if (this.props.onSearch) {
      this.props.onSearch({query, option});
    }
  }

  clear() {
    this._input.value = '';
    this.setQuery();
  }

  filter(data, query, option) {
    const quotedString = /^".*"$/;
    const oneOfThese = query.split(' | ').map(part => part.split(' + '));
    // return filter(data, query, {key: option || 'name'});
    return _.filter(data, obj => {
      let keys = option ? [option] : Object.keys(obj);
      return _.some(keys, key =>
        _.some(oneOfThese, allOfThese =>
          _.every(allOfThese, queryPart =>
            queryPart.match(quotedString) ?
              String(obj[key]).toLowerCase().indexOf(queryPart.replace(/^"/, '').replace(/"$/, '').toLowerCase()) !== -1
            : filter([String(obj[key])], queryPart).length > 0
          )
        )
      );
    });
  }

  render() {
    const {data} = this.props;
    const {query, option} = this.state;
    const keys = this.getKeys(data);

    const filteredData = this.props.onSearch || !query ? data : this.filter(data, query, option);

    return (
      <div>
        <div className="row">
          <div className="col-xs-6 control-row">
            {this.props.children}
          </div>
          <div className="advanced-table-search">
            <div className="col-xs-6">
              <div className="col-xs-4" style={{padding: 0}}>
                <select
                  className="form-control"
                  style={selectStyles}
                  onChange={this.setOption}
                  >
                  <option value={''}>
                    All
                  </option>
                  {keys.map(keyName =>
                    <option value={keyName} key={keyName}>
                      {keyName}
                    </option>
                  )}
                </select>
              </div>
              <div className="col-xs-8 search-container">
                <span className="glyphicon glyphicon-search btn-icon left-icon">
                </span>
                { query ?
                    <span
                      className="glyphicon glyphicon-remove btn-icon right-icon"
                      title="Clear Selection"
                      onClick={this.clear}
                      >
                    </span>
                  : null
                }
                <input
                  className="search-input form-control with-icon"
                  name="table-search-input"
                  type="text"
                  placeholder="Search"
                  ref={c => this._input = c}
                  onKeyUp={this.setQuery}
                  title="use | for OR, + for AND and wrap in double-quotes for exact match"
                  />
              </div>
            </div>
          </div>
        </div>
        <br />
        <NeuTable {...this.props} data={filteredData} ref={e => this._table = e} />
      </div>
    );
  }
}

SearchNeuTable.displayName = 'SearchNeuTable';
module.exports = SearchNeuTable;
