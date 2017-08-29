'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path    = require('path');
var gulp    = require('gulp');
var gif     = require('gulp-if');
var plumber = require('gulp-plumber');
var runner  = require('run-sequence');
var err     = require('../tools/errcb');
var ENV     = require('../tools/env');

// LINTING SOURCE
// ----------------------------------------------------------------------------
var SRC = {
  css: [
    path.join(ENV.css['src-dir'],       '**', '*'),
    path.join('!' + ENV.css['src-dir'], '**', '_*'),
    path.join('!' + ENV.css['src-dir'], '**', '*.md')
  ],
  js: [
    path.join(ENV.js['src-dir'], '**', '*'),
    path.join('!' + ENV.js['src-dir'], 'lib', '**', '*')
  ],
  html: [
    path.join(ENV.html['dest-dir'], 'pages', '**', '*.html')
  ]
};

// LINTER
// ----------------------------------------------------------------------------
var css  = require('../pipe/css/' + ENV.css.engine + '.linter.js');
var js   = require('../pipe/js/simple.linter.js');
var a11y = require('../pipe/html/a11y.linter.js');


// TASK DEFINITION
// ----------------------------------------------------------------------------

// $ gulp test:js
// ----------------------------------------------------------------------------
// Lint les fichiers source pour les CSS
gulp.task('test:js', 'Lint JS files.', function () {
  return gulp.src(SRC.js)
    .pipe(plumber({ errorHandler: err }))

    // En mode relax, on ignore les tests (c'est mal)
    .pipe(gif(!ENV.all.relax, js()));
});

// $ gulp test:css
// ----------------------------------------------------------------------------
// Lint les fichiers source pour les CSS
gulp.task('test:css', 'Lint CSS files.', function () {
  return gulp.src(SRC.css)
    .pipe(plumber({ errorHandler: err }))

    // En mode relax, on ignore les tests (c'est mal)
    .pipe(gif(!ENV.all.relax, css()));
});

// $ gulp test:a11y
// ----------------------------------------------------------------------------
// Lint les fichiers html pour l'accessibilité
gulp.task('test:a11y', 'Lint HTML files for accessibility.', function () {
  return gulp.src(SRC.html)
    .pipe(plumber({ errorHandler: err }))

    // En mode relax, on ignore les tests (c'est mal)
    .pipe(gif(!ENV.all.relax, a11y()));
});

// $ gulp test
// ----------------------------------------------------------------------------
// Lint tous les fichiers sources du projet
gulp.task('test', 'Lint CSS, JS and HTML files.', function (cb) {
  // En mode relax, on ignore les tests (c'est mal)
  if (ENV.all.relax) { cb(null); }

  runner('test:js', 'test:css', 'test:a11y', cb);
});
