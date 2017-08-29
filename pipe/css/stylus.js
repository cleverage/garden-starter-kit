// Définition du LazyPipe pour utiliser Stylus
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var stylus   = require('gulp-stylus');
var ENV      = require('../../tools/env');

// STYLUS CONFIGURATION
// ----------------------------------------------------------------------------
var CONF = {
  compress:  ENV.all.optimize || false,
  linenos : !ENV.all.optimize,
  'include-css': true
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(stylus, CONF);

  return lazystream();
};
