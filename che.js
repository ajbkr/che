#!/usr/bin/env node
const fs = require('fs')
const pointer = require('json-pointer-rfc6901')
const path = require('path')

const { compile, generators, schema } =
  require(path.join(process.cwd(), process.argv[2]))

for (const ptr in generators) {
  for (const templateFile in generators[ptr]) {
    const template = compile(fs.readFileSync(templateFile).toString())

    const output = template(pointer.get(schema, ptr))

    fs.writeFile(generators[ptr][templateFile], output, err => {
      if (err) {
        throw err
      }
    })
  }
}
