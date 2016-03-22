---
title: Introduction
---

Other than react components there are a few helper functions that help abstract
away many of the commonly used patterns in our code.

These functions are usually of two kinds:

1. General Purpose functions
2. Higher Order Components

We're all used the general purpose function to abstract away some common checks etc.

## Higher Order Components

HOCs can generally be simply thought of functions that modify React components in
some way. In some ways you can think of them as decorators. In fact, if we were to
enable the experimental feature, these functions *can* be used as decorators on
our React classes.

If you dig a little deeper, these function often won't *actually* modify our class,
and instead wrap our React Class in another dynamically created React Class. This
is widely considered to be a much better pattern and dates back to the OOP patterns
book that states:

```
“Prefer composition over inheritance.”
```

In stead of inheriting from our own classes, or mucking about with the prototype,
it is simpler and more resilient to just compose one Class within another class.

And so in vast majority of cases we try to do just that. There are very few cases,
where this pattern isn't powerful enough and we need to look into modifying or
sub-classing.
