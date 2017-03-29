#!/usr/bin/env node
var changeCase = require('change-case'),
 fs            = require('fs'),
 Handlebars    = require('handlebars'),
 path          = require('path'),
 pointer       = require('json-pointer-rfc6901');

var conf    = require(path.join(process.cwd(), process.argv[2])),
 generators = conf.generators;

var schema = require(path.join(process.cwd(), process.argv[3]));

for (var name in changeCase) {
  Handlebars.registerHelper(name, changeCase[name]);
}

for (var ptr in generators) {
  for (var templateFile in generators[ptr]) {
    var template = Handlebars.compile(fs.readFileSync(templateFile).toString());

    var output = template(pointer.get(schema, ptr));

    fs.writeFile(generators[ptr][templateFile], output, function(err) {
      if (err) {
        throw err;
      }
    });
  }
}
