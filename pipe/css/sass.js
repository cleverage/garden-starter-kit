// Define the LazyPipe to use eyeglass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var importer = require('node-sass-import');
var ENV = require('../../tools/env');

// SASS CONFIGURATION
// ----------------------------------------------------------------------------
var SASS = {
  sass: ENV.css['src-dir'],
  css: ENV.css['dest-dir'],
  importer: importer,
  precision: 8
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(sass, SASS);

  return lazystream();
};
