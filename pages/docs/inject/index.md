---
title: inject
---

```
inject :: (arr: Array<string>, ReactClass) => ReactClass
```

As a temporary workaround, there is a way to pull in angular modules into your
React components. The modules you can pull in is defined in a small whitelist
as described in `Root.js`. You can make modules available by just editing that
one file.

To actually pull the dependencies in, you can just wrap you component with the
`inject` function before exporting it.

```javascript
const React = require('react');
const inject = require('../../commonComponents/inject');

class Test extends React.Component {
  render() {
    return (
      <div>
        {this.props.environment.getHostName()}
        {...someJSX}
      </div>
    );
  }
}

module.exports = inject(['environment'], Test);

```

As you can see the important code here is:

```javascript
module.exports = inject(['environment'], Test);
```

With that one line, our `Test` component
