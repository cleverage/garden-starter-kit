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
    // where assets are installed by eyeglass to expose them according to their output url.
    // If not provided, assets are not installed unless you provide a custom installer.
    buildDir: ENV.assets['dest-dir'],

    assets: {
      relativeTo: '../../../',
      sources: [
        { directory: ENV.assets['src-dir'] }
      ]
    }
  }
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(sass, eyeglass(SASS));

  return lazystream();
};
