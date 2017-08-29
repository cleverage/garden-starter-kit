// Définition du LazyPipe pour linter sass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var sasslint = require('gulp-sass-lint');


// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
var LINT = {
  configFile: './.sass-lint.yml'
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(sasslint, LINT)
    .pipe(sasslint.format)
    .pipe(sasslint.failOnError);

  return lazystream();
};
