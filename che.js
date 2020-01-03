#!/usr/bin/env node
const fs = require('fs')
const pointer = require('json-pointer-rfc6901')
const _ = { template: require('lodash.template') }
const path = require('path')

const { generators, helpers, schema } =
  require(path.join(process.cwd(), process.argv[2]))

const imports = { imports: helpers }

for (const ptr in generators) {
  for (const templateFile in generators[ptr]) {
    const template = _.template(fs.readFileSync(templateFile).toString(), imports)

    const output = template(pointer.get(schema, ptr))

    fs.writeFile(generators[ptr][templateFile], output, err => {
      if (err) {
        throw err
      }
    })
  }
}
