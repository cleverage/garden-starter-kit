// {{#readdir dir }}{{/readdir}}
// --------------------------------------------------------------------------
// Lit un dossier et renvoie les informations sur les fichiers
//
// Pour le paramètre `dir`, le dossier courrant `./` est le dossier source
// des gabarits Twig: `src/html` par defaut.
//
// Les informations retournées sont un tableau d'objets de la forme:
// {
//   path      : le chemin complet du fichier à partir de ./
//   directory : le chemin complet du repertoir contenant le fichier à partir de ./
//   filename  : le nom complet du fichier
//   basename  : le nom du fichier sans extension
//   extension : l'extension du fichier commençant par '.'
// }

var path = require('path');
var glob = require('glob');
var ENV  = require('../../env.js').html;


module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('readdir', function (dir, block) {
    var fulldir = path.resolve(ENV['src-dir'], dir);
    var files   = glob.sync(path.join(fulldir, '**', '*.hbs'));

    var data = files
      .map(function (file) {
        file = path.parse(file.replace(ENV['src-dir'], '.'));

        return {
          path     : path.join(file.dir, file.base),
          directory: file.dir,
          filename : file.base,
          basename : file.base.replace(file.ext, ''),
          extension: file.ext
        };
      })
      .sort(function (a, b) {
        if (a.directory !== b.directory) {
          return a.directory.localeCompare(b.directory);
        }

        return a.filename.localeCompare(b.filename);
      });

    var accum = '';
    var directory = '';

    for (var i = 0; i < data.length; i++) {
      this.newdir = false;
      if (directory !== data[i].directory) {
        directory = data[i].directory;
        this.newdir = true;
      }
      if (i+1 ===  data.length || directory !== data[i+1].directory) {
        this.islast = true;
      }
      this.file = data[i];
      accum += block.fn(this);
    }

    return accum;
  });
};
