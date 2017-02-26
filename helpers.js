function toCamelCase(str) {
  return str.toLowerCase().split('_').map(function(val, idx) {
    return (idx === 0) ? (val) : (val[0].toUpperCase() + val.substr(1));
  }).join('');
}

function toKebabCase(str) {
  return str.toLowerCase().split('_').join('-');
}

function toLowerCase(str) {
  return str.toLowerCase();
}

function toPascalCase(str) {
  return str.toLowerCase().split('_').map(function(val) {
    return val.substr(0, 1).toUpperCase() + val.substr(1);
  }).join('');
}

function toStartCase(str) {
  return str.toLowerCase().split('_').map(function(val) {
    return val.substr(0, 1).toUpperCase() + val.substr(1);
  }).join(' ');
}

function toUpperCase(str) {
  return str.toUpperCase();
}

module.exports = {
  toCamelCase:  toCamelCase,
  toKebabCase:  toKebabCase,
  toLowerCase:  toLowerCase,
  toPascalCase: toPascalCase,
  toStartCase:  toStartCase,
  toUpperCase:  toUpperCase
};
