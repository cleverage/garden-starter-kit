// Définition du LazyPipe pour linter Stylus
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var stylint  = require('gulp-stylint');

// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
var LINT = {
  config: './.stylintrc'
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(stylint, LINT)
    .pipe(stylint.reporter)
    .pipe(stylint.reporter, 'fail');

  return lazystream();
};
