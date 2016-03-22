---
title: Link
---

Link is a simple component that can be used instead of an `<a />`.

It can be used exactly like an anchor tag. The only difference is that a `Link`
expects either a `to` or an `sref` prop.

One of these props is used to tap into `ui.router` on the Angular side of the
application.

- **to :** `string`

  The URL to traverse to under `/user-provisioning`.

  For example:

  `<Link to="/customers">Customers</Link` will take you to `/user-provisioning/customers`

  `<Link to="/customers/create">Customers</Link` will take you to `/user-provisioning/customers/create`

  `<Link to="/">Customers</Link` will take you to `/user-provisioning/`

- **sref :** `[string, ...any]`

  When you need to link to the angular parts of the application, you can use the
  `sref` prop. This takes an array of arguments that are passed to `$state.go` when
  the component is clicked.

  Usually this means that the first argument is the route name, the second argument
  a param in the route, and third argument is various options
