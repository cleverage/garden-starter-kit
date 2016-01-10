'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path         = require('path');
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var bs           = require('browser-sync');
var err          = require('../tools/errcb');
var ENV          = require('../tools/env').css;

// On ne va compiler que les fichiers dont le nom ne commence pas par un _
var SRC  = [
  path.join(ENV['src-dir'],       '**', '*'),
  path.join('!' + ENV['src-dir'], '**', '_*'),
  path.join('!' + ENV['src-dir'], '**', '*.md')
];
var DEST = ENV['dest-dir'];


// CONDITIONAL PIPELINE
// ----------------------------------------------------------------------------
var pipeline = require('../pipe/css/' + ENV.engine + '.js');


// AUTOPREFIXER CONFIGURATION
// ----------------------------------------------------------------------------
var APX_CONF = {
  browsers: ENV.autoprefixer || ['> 4%', 'ie >= 8']
};


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp css
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers CSS
gulp.task('css', ['test:css'], function () {
  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(pipeline())
    // .pipe(postcss([
    //   autoprefixer(APX_CONF)
    // ]))
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});
