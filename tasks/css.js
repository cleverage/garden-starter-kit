'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path         = require('path');
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var bs           = require('browser-sync');
var err          = require('../tools/errcb');
var ENV          = require('../tools/env').css;
var _            = require('underscore');

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


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp css
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers CSS
gulp.task('css', 'Compile CSS files into build folder.', ['test:css'], function () {
  var processors = _.map(ENV.postcss, function (conf, processorName) {
    var processor = require(processorName);
    return processor(conf);
  });
  return gulp.src(SRC, { nodir: true })
    .pipe(plumber({ errorHandler: err }))
    .pipe(pipeline())
    .pipe(postcss(processors))
    .pipe(gulp.dest(DEST))
    .on('end', bs.reload);
}, {
  options: {
    optimize : 'Optimize for production.',
    relax    : 'Skip tests. ☠ ☠ ☠'
  }
});
