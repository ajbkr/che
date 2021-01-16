Che
===

Che is a template-driven code generator for Node.js.

Synopsis
--------

```
che che.conf.js
```

Description
-----------

Essentially, Che generates code from templates that are populated with data read
from a JSON schema (or JS object), indexed using
[JSON Pointer (RFC6901)](https://tools.ietf.org/html/rfc6901).

Che is template-engine agnostic; example uses
[Lodash's template method](https://www.npmjs.com/package/lodash.template) and
[generic JavaScript helpers](https://www.npmjs.com/package/template-helpers#string).

Example che.conf.js
-------------------

```
const template = require('lodash.template')

const helpers = require('template-helpers')('string')

const compile = string => template(string, { imports: helpers })

const schema = {
  donaldDuck: {
    nephews: [
      {
        name: 'huey',
        color: 'red'
      },
      {
        name: 'dewey',
        color: 'blue'
      },
      {
        name: 'louie',
        color: 'green'
      }
    ],
    title: "Donald Duck's Nephews"
  }
}

const generators = {
  '/donaldDuck': {
    'example/index.jst': 'example/index.html'
  }
}

module.exports = {
  compile,
  generators,
  schema
}
```

Example index.jst
-----------------

```
<!doctype html>
<html>
  <!-- Autogenerated by che; do NOT edit! -->
  <head>
    <title><%- title %></title>
  </head>
  <body>
    <h1><%- title %></h1>
    <ul>
<% for (const nephew of nephews) { %>
      <li style="color: <%- nephew.color %>"><%= titlecase(nephew.name) %></li>
<% } %>
    </ul>
  </body>
</html>
```

Example index.html (output)
---------------------------

```
<!doctype html>
<html>
  <!-- Autogenerated by che; do NOT edit! -->
  <head>
    <title>Donald Duck&#39;s Nephews</title>
  </head>
  <body>
    <h1>Donald Duck&#39;s Nephews</h1>
    <ul>

      <li style="color: red">Huey</li>

      <li style="color: blue">Dewey</li>

      <li style="color: green">Louie</li>

    </ul>
  </body>
</html>
```
