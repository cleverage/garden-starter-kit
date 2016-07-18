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
  bundle_exec: true,
  config_file: './config.rb',
  environment: ENV.all.optimize ? 'production' : 'development',
  sass       : ENV.css['src-dir'],
  css        : ENV.css['dest-dir'],
  relative   : false,

  eyeglass: {
    // put eyeglass options you need here.
  }
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(sass, eyeglass(SASS));

  return lazystream();
};
