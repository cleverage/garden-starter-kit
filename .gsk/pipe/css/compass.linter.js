// Définition du LazyPipe pour linter sass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var scsslint = require('gulp-scss-lint');


// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
var LINT = {
  bundleExec: true,
  config: './.scss-lint.yml'
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(scsslint, LINT)
    .pipe(scsslint.failReporter);

  return lazystream();
};
