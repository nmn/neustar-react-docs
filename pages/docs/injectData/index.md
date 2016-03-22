---
title: injectData
---

```
injectData :: (query: string | (props: Object) => string, ReactClass) => ReactClass
```

`injectData` is a Higher-Order-Component more specific to graphQl endpoints.

It quite simply abstracts away the data fetching duties of a component. All you do is
give it a graphQL query and a React Component, and returns a new ReactComponent that
renders your component with the correctly fetched data.

```javascript
const React = require('react');
const injectData = require('../../commonComponents/injectData');

const query = `
{
  allCustomers {
    customerList {
      customerId
      customerName
    }
  }
}
`;

function Test() {
  const {data} = this.props;
  if (!data) { // data hasn't been fetched yet.
    return 'loading...';
  }

  return (
    <div>
      {data.allCustomer.customerList /*array of objects*/}
    </div>
  );
}


module.exports = injectData(query, Test);

```

To make things a little more flexible, instead of a string query, you can pass a
function that would take in the component's props and return a string query.

```javascript
const query = ({id}) => `
{
  customer(id: ${id}) {
    customerId
    customerName
  }
}
`
```
