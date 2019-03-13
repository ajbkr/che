#!/usr/bin/env node
const fs = require('fs')
const Handlebars = require('handlebars')
const path = require('path')
const pointer = require('json-pointer-rfc6901')

const { generators, helpers, schema } =
  require(path.join(process.cwd(), process.argv[2]))

for (let name in helpers) {
  Handlebars.registerHelper(name, helpers[name])
}

for (let ptr in generators) {
  for (let templateFile in generators[ptr]) {
    const template = Handlebars.compile(fs.readFileSync(templateFile).toString())

    const output = template(pointer.get(schema, ptr))

    fs.writeFile(generators[ptr][templateFile], output, err => {
      if (err) {
        throw err
      }
    })
  }
}
