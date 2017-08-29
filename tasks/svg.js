'use strict';

// MODULES
// ----------------------------------------------------------------------------
var gulp     = require('gulp');
var svgstore = require('gulp-svgstore');
var ENV      = require('../tools/env').svg;
var path     = require('path');
var rename   = require('gulp-rename');

var SRC  = path.join(ENV['src-dir'],  '/**', '*.svg');

// TASK DEFINITION
// ----------------------------------------------------------------------------

// $ gulp svg:symbols
// ----------------------------------------------------------------------------
// Regroupe tous les svg dans un même fichier afin qu'il puissent être insérés
// dans les templates via la fonction `filecontent(path)`
gulp.task('svg:symbols', function () {
  return gulp
    .src(SRC)
    .pipe(rename(function (filePath) {
      // add subfolders (if any) into filename
      var nameArray = filePath.dirname !== '.' ? filePath.dirname.split(filePath.sep) : [];
      nameArray.push(filePath.basename);
      // use prefix from config
      if (ENV['id-prefix']) {
        nameArray.unshift(ENV['id-prefix']);
      }
      filePath.basename = nameArray.join('-');
    }))
    .pipe(svgstore({ inlineSvg: true }))
    // if specified in config, rename output file
    .pipe(rename(function (filePath) {
      if (ENV['dest-file']) {
        filePath.basename = ENV['dest-file'];
      }
    }))
    .pipe(gulp.dest(ENV['dest-dir']));
});

// $ gulp svg
// ----------------------------------------------------------------------------
// Gère toutes les tâches svg
gulp.task('svg', ['svg:symbols']);
