'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path  = require('path');
var gulp  = require('gulp');
var newer = require('gulp-newer');
var ENV   = require('../tools/env');

// On va déplacer tous les fichiers sauf les images
var SRC  = [
  path.join(ENV.assets['src-dir'], '**', '*'),
  '!' + ENV.images['src-dir'],
  path.join('!' + ENV.images['src-dir'], '**', '*')
];
var DEST = ENV.assets['dest-dir'];


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp assets
// ----------------------------------------------------------------------------
// Copy tout les assets static du projet
gulp.task('assets', 'Copy all static assets into build folder.', ['images'], function () {
  return gulp.src(SRC)
    .pipe(newer(DEST))
    .pipe(gulp.dest(DEST));
});
