const template = require('lodash/template')

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
