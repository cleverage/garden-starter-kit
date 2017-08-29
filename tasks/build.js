'use strict';

// MODULES
// ----------------------------------------------------------------------------
var gulp   = require('gulp');
var del    = require('del');
var runner = require('run-sequence');


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp build:clean
// ----------------------------------------------------------------------------
// Supprime le contenu du build
gulp.task('build:clean', 'Delete the content of the build folder.', function () {
  return del(['build/**/*']);
});

// $ grunt build
// ----------------------------------------------------------------------------
// Régénère le contenu du dossier `/build`. Il est recommandé de lancer cette
// tache à chaque fois que l'on réalise un `git pull` du projet.
gulp.task('build', 'Compile the whole project into build folder.', function (cb) {
  runner('build:clean', 'svg:symbols', ['assets', 'css', 'js', 'html'], ['import','doc'], 'test:a11y', cb);
}, {
  options: {
    optimize : 'Optimize for production.',
    relax    : 'Skip tests. ☠ ☠ ☠'
  }
});
