// Définition du LazyPipe pour utiliser compass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var compass  = require('gulp-compass');
var ENV      = require('../../tools/env');

// SASS CONFIGURATION
// ----------------------------------------------------------------------------
var SASS = {
  bundle_exec: true,
  config_file: './config.rb',
  environment: ENV.all.optimize ? 'production' : 'development',
  sass       : ENV.css['src-dir'],
  css        : ENV.css['dest-dir'],
  relative   : false,
  // Force only if task is called via `gulp css`.
  // That fixes the following bug: `--optimized` option was ignored if built
  // files were already cached.
  force      : require('yargs').argv._[0] === 'css'
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(compass, SASS);

  return lazystream();
};
