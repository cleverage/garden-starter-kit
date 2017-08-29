// Définition du LazyPipe pour linter Stylus
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var a11y     = require('gulp-a11y');
var ENV      = require('../../tools/env').html;

// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
var CONFIG = {
  viewports: ['1024x768'],
  delay    : Number(ENV.a11y && ENV.a11y.delay) || 1
};

if (ENV.a11y && ENV.a11y.viewports) {
  CONFIG.viewports = ENV.a11y.viewports;

  if (!Array.isArray(CONFIG.viewports)) {
    CONFIG.viewports = [CONFIG.viewports];
  }
}


module.exports = function () {
  var lazystream = lazypipe();

  CONFIG.viewports.forEach(function (vp) {
    lazystream = lazystream
      .pipe(a11y, {
        viewport: vp,
        delay: CONFIG.delay
      })
      .pipe(a11y.reporter);
  });

  return lazystream();
};
