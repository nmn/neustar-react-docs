const React = require('react');

function HeadComponent({keyName, onClick, orderBy, reverse, children, sortable}) {

  const secondClass = sortable ? ' sortable' : '';
  const thirdClass = sortable && orderBy === keyName ?
      reverse ? ' sort-desc' : ' sort-asc'
    : '';

  const clickProps = sortable ? {onClick} : {};

  return (
    <th className={`header${secondClass}${thirdClass}`} {...clickProps}>
      <div className="ng-table-header">
        { sortable ?
            <span className="sort-indicator">
              {children}
            </span>
          :
            children
        }
      </div>
    </th>
  );
}

HeadComponent.displayName = 'HeadComponent';

module.exports = HeadComponent;
