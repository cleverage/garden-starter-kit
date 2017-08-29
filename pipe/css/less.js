// Définition du LazyPipe pour utiliser LESS
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var less     = require('gulp-less');
var ENV      = require('../../tools/env');

// LESS CONFIGURATION
// ----------------------------------------------------------------------------
var CONF = {
  compress: ENV.all.optimize
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(less, CONF);

  return lazystream();
};
