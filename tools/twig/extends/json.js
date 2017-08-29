// json(path)
// --------------------------------------------------------------------------
// Lit le fichier JSON en paramètre et renvoie l'objet correspondant
//
// Pour le paramètre `path`, le dossier courrant `./` est le dossier source
// des données des gabarits Twig: `src/data` par defaut.

var fs    = require('fs');
var path  = require('path');
var _     = require('underscore');
var gutil = require('gulp-util');
var ENV   = require('../../env.js').html;

module.exports = function (Twig) {
  'use strict';

  Twig.exports.extendFunction('json', function (file) {
    var data = {};

    if (!_.isString(file)) {
      gutil.log(gutil.colors.red('ERROR:'),
        'Wrong file path:', file,
        '(check your "json(path)" syntax)'
      );

      return data;
    }

    var fullpath = path.resolve(ENV['data-dir'], file);

    try {
      data = JSON.parse(fs.readFileSync(fullpath, 'utf8'));
    } catch (e) {
      gutil.log(gutil.colors.yellow('WARN:'),
        'Unable to find data from',
        fullpath.replace(path.resolve('.'), '').slice(1)
      );
    }

    return data;
  });
};
