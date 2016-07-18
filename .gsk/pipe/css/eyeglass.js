// Define the LazyPipe to use eyeglass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var eyeglass = require('eyeglass');
var ENV = require('../../tools/env');

// SASS CONFIGURATION
// ----------------------------------------------------------------------------
var SASS = {
  sass       : ENV.css['src-dir'],
  css        : ENV.css['dest-dir'],
  eyeglass: {
    // put eyeglass options you need here.
  }
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(sass, eyeglass(SASS));

  return lazystream();
};
