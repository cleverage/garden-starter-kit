'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path     = require('path');
var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var bs       = require('browser-sync');
var err      = require('../tools/errcb');
var ENV      = require('../tools/env').html;

// CONDITIONAL PIPELINE
// ----------------------------------------------------------------------------
var pipeline = require('../pipe/html/' + ENV.engine + '.js');

// On ne va compiler que les fichiers dont le nom ne commence pas par un _
// Ni ceux qui ne sont pas au format de l'engine choisi
var ext = {
  handlebars: '*.hbs',
  twig: '*.twig'
};

function getExt(engine) {
  return (ext[engine] !== undefined) ? ext[engine] : '*.*';
}

var SRC  = [
  path.join(ENV['src-dir'], '**', getExt(ENV.engine)),
  path.join('!' + ENV['src-dir'], '**', '_*')
];
var DEST = ENV['dest-dir'];


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp html
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers HTML
gulp.task('html', 'Compile HTML files.', function () {
  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(pipeline())
    .pipe(gulp.dest(DEST))
    .on('end', bs.reload);
});
