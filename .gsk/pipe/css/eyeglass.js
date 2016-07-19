// Define the LazyPipe to use eyeglass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var eyeglass = require('eyeglass');
var ENV = require('../../tools/env');
var assetsDir = ENV.assets['src-dir'];

// SASS CONFIGURATION
// ----------------------------------------------------------------------------
var SASS = {
  sass       : ENV.css['src-dir'],
  css        : ENV.css['dest-dir'],
  eyeglass: {
    // where assets are installed by eyeglass to expose them according to their output url.
    // If not provided, assets are not installed unless you provide a custom installer.
    buildDir: assetsDir,

    assets: {
      relativeTo: '../../../',
      sources: [
        { directory: assetsDir }
      ]
    }
  }
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(sass, eyeglass(SASS));

  return lazystream();
};
