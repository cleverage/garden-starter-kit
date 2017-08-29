'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path = require('path');
var gulp = require('gulp');
var ENV = require('../tools/env');


// WATCH CONFIGURATION
// ----------------------------------------------------------------------------
// /!\ we need relatives path here, otherwise `gulp.watch` will ignore new files.
var W = [
  {tasks: ['svg'], files: path.join(path.relative('.', ENV.svg['src-dir']), '**', '*.svg')},
  {tasks: ['html'], files: [].concat(
    path.relative('.', path.join(path.relative('.', ENV.html['src-dir']), '**', '*')),
    path.relative('.', path.join(path.relative('.', ENV.svg['dest-dir']), '*.svg')),
    path.relative('.', path.join(path.relative('.', ENV.html['data-dir']), '**', '*'))
  )},
  {tasks: ['css'], files: path.join(path.relative('.', ENV.css['src-dir']), '**', '*')},
  {tasks: ['js'], files: path.join(path.relative('.', ENV.js['src-dir']), '**', '*')},
  {tasks: ['images'], files: path.join(path.relative('.', ENV.images['src-dir']), '**', '*')}
];

// Uniquement si l'option `--doc` est utilisée, on génère également la documentation
if(ENV.all.doc) {
  W = W.concat([
    {tasks: ['doc:static'], files: path.join(path.relative('.', ENV.doc['src-dir']), '**', '*.md')},
    {tasks: ['doc:kss'], files: [].concat(
      path.join(path.relative('.', ENV.css['src-dir']), '**', '*'),
      path.relative('.', path.join(path.relative('.', ENV.svg['dest-dir']), '*.svg'))
    )},
    {tasks: ['doc:js'], files: path.join(path.relative('.', ENV.js['src-dir']), '**', '*')}
  ]);
}

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp watch
// ----------------------------------------------------------------------------
// Configuration de tous les watcher du projet
gulp.task('watch', 'Starts all the watchers.', function () {
  W.forEach(function (obj) {
    gulp.watch(obj.files, obj.tasks);
  });
}, {
  options: {
    'doc': 'Also compile documentation. [false]'
  }
});
