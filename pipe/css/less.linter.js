// Définition du LazyPipe pour linter LESS
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var lesshint = require('gulp-lesshint');

// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
var CONF = {
  configPath: './.lesshintrc'
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(lesshint, CONF)
    .pipe(lesshint.reporter)
    .pipe(lesshint.reporter, 'fail');

  return lazystream();
};
