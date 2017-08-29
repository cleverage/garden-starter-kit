// Définition du LazyPipe pour linter JS
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var eslint   = require('gulp-eslint');

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(eslint)
    .pipe(eslint.format)
    .pipe(eslint.failAfterError);

  return lazystream();
};
