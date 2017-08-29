'use strict';

var path = require('path');

function extractCliArgs() {
  var argv = process.argv.slice(2);
  var args = {};
  var prev;

  argv.forEach(function (value) {
    var t, k, v;

    if (value.indexOf('--') === 0) {
      if (value.indexOf('=') > -1) {
        t = value.split('=');
        k = t[0].slice(2);
        v = t[1];
        prev = null;
      } else {
        prev = k = value.slice(2);
        v = true;
      }

      args[k] = v;
    }

    else if (value.indexOf('-') === 0) {
      k = value.slice(1);
      prev = k.slice(-1);

      k.split('').forEach(function (id) {
        args[id] = true;
      });
    }

    else if (prev in args) {
      args[prev] = value;
    }
  });

  return args;
}

function sanitize(value, format) {
  format = format.toUpperCase();

  if (format in sanitize) {
    return sanitize[format](value);
  }

  return false;
}

sanitize.BOOLEAN = function (value) {
  return Boolean(value);
};

sanitize.NUMBER = function (value) {
  var n = Number(value);

  return n === +n ? n : 0;
};

sanitize.STRING = function (value) {
  return String(value).replace(/^(?:"|')?(.*)(?:"|')?$/, '$1');
};

sanitize.FILENAME = function (value) {
  return path.resolve('.', path.normalize(sanitize.STRING(value)));
};


function parser(rules) {
  var args   = extractCliArgs();
  var output = {};

  rules.forEach(function (rule) {
    var id = rule.id.split('.');

    rule.cli.forEach(function (name) {
      if (name in args) {
        output[id[0]] = output[id[0]] || {};
        output[id[0]][id[1]] = sanitize(args[name], rule.value);
      }
    });
  });

  return output;
}

module.exports = {
  parse   : parser,
  sanitize: sanitize
};
