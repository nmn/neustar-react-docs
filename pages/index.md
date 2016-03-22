---
title: "Documentation for the React parts of ui-manage"
---

## Introduction

As we start working on the new User-Provisioning API and UI,
we're taking this opportunity to start our move from angular
to React.js

## How

React.js is a great library that can easily swapped into an existing
angular app. With one single directive as an entry point, the entire sub-tree
of the app can be written purely in React.js

There is minimal glue-code. The react code is being written entirely with ES6.
There are also some helpers to make dependency injection of angular modules easier.

## Why

**Warning**: May offend your love for angular.js

The current angular app is getting a little long in the tooth. Angular.js as a
library just doesn't cut it anymore considering javascript community.

Angular has an antiquated module system that doesn't work well with the commonJS
driven environment of modern javascript. There is also way too much boilerplate
and friction when pulling in new libraries. For example, when using any library
with angular you often have to search for special versions of the library that
have `angular` in the name and have been forked to work with angular's digest
cycle correctly. The sad truth is that many of these libraries just aren't being
maintained anymore. The truth is that the Javascript community at large is moving
away from angular entirely.

In our last 'cross-sync meeting' we all agreed that we need to move away from
angular in the long run. While there's no consensus on what we should move to,
I believe that many developers are counting React out due to misinformation.

React is a great library that is easy to understand, is very maintainable and
very flexible. There's also a vibrant community around it, with tons of third-party
components that can be just used

## React-bootstrap

React-bootstrap is a collection of bootstrap components re-implemented in React.
It works out of the box with `nux.css`.

React-bootstrap gives us many components that we need to use all over the site.
This includes things like Modal, Popover, Input, Button etc.

In angular terms, you can think of these components as having directives for small
UI components. You no longer have to think about classNames etc.

## Other Components

React-bootstrap covers a lot of ground. But there are still common patterns that
we follow all over the site. Components such as tables, searchable multi-selects
and tree-views are all components that we're building along-side the new code that
be covered in the documentation.
