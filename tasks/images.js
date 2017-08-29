'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path     = require('path');
var gulp     = require('gulp');
var newer    = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var ENV      = require('../tools/env').images;

var SRC  = path.join(ENV['src-dir'], '/**', '*');
var DEST = ENV['dest-dir'];


// IMAGEMIN CONFIGURATION
// ----------------------------------------------------------------------------
var IMG_MIN = {
  // Plugins
  // use: [],

  // PNG
  optimizationLevel: 5,

  // JPEG
  progressive: false,

  // GIF
  interlaced: false,

  // SVG
  multipass: false,
  svgoPlugins: [
    {removeHiddenElems  : false},
    {convertStyleToAttrs: false}
  ]
};


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp images
// ----------------------------------------------------------------------------
// Gère toutes les optimisations d'image:
gulp.task('images', 'Optimise and copy images into build folder.', function () {
  return gulp.src(SRC)
    .pipe(newer(DEST))
    .pipe(imagemin(IMG_MIN))
    .pipe(gulp.dest(DEST));
});
