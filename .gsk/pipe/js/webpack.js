// Définition de gulp js version "webpack"
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path          = require('path');
var gulp          = require('gulp');
var webpackStream = require('webpack-stream');
var webpack       = require('webpack');
var plumber       = require('gulp-plumber');
var bs            = require('browser-sync');
var webpackConfig = require('../../webpack-config.js');
var err           = require('../../tools/errcb');
var ENV           = require('../../tools/env');

var SRC  = path.join(ENV.js['src-dir'], '**', '*.js');
var DEST = ENV.js['dest-dir'];

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp js
// ----------------------------------------------------------------------------
// Gère toutes les actions d'assemblage JavaScript
gulp.task('js', 'Compile JS files into build folder using webpack.', ['test:js'], function () {

  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
}, {
  options: {
    optimize : 'Optimize for production.',
    relax    : 'Skip tests. ☠ ☠ ☠'
  }
});
