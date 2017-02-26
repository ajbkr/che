#!/usr/bin/env node
var fs      = require('fs'),
 Handlebars = require('handlebars'),
 path       = require('path'),
 pointer    = require('json-pointer-rfc6901');

var conf    = require(path.join(process.cwd(), process.argv[2])),
 generators = conf.generators,
 helpers    = require('./helpers');

var schema = require(path.join(process.cwd(), process.argv[3]));

for (var name in helpers) {
  Handlebars.registerHelper(name, helpers[name]);
}

for (var ptr in generators) {
  for (var currentValue in generators[ptr]) {
    var template = Handlebars.compile(fs.readFileSync(currentValue).toString());

    var output = template(pointer.get(schema, ptr));

    fs.writeFile(generators[ptr][currentValue], output, function(err) {
      if (err) {
        throw err;
      }
    });
  }
}
