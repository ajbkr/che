#!/usr/bin/env node
var fs      = require('fs'),
 Handlebars = require('handlebars'),
 pointer    = require('json-pointer-rfc6901');

var conf    = require(process.argv[2]),
 generators = conf.generators,
 helpers    = require('./helpers');

var schema = require(process.argv[3]);

Handlebars.registerHelper('toCamelCase',  helpers.toCamelCase);
Handlebars.registerHelper('toKebabCase',  helpers.toKebabCase);
Handlebars.registerHelper('toLowerCase',  helpers.toLowerCase);
Handlebars.registerHelper('toPascalCase', helpers.toPascalCase);
Handlebars.registerHelper('toStartCase',  helpers.toStartCase);
Handlebars.registerHelper('toUpperCase',  helpers.toUpperCase);

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
