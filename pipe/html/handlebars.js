// Définition du LazyPipe pour utiliser Handlebars
'use strict';

var path     = require('path');
var _        = require('underscore');
var lazypipe = require('lazypipe');
var gutil    = require('gulp-util');
var hb       = require('gulp-hb');
var rename   = require('gulp-rename');
var data     = require('gulp-data');
var ENV      = require('../../tools/env');

var DEST     = path.resolve(ENV.html['dest-dir']);
var DEST_URL = DEST.replace(path.resolve(ENV.connect.baseDir), '')
                   .replace(path.sep, '/');

var genericDataFile  = path.resolve(path.join(ENV.html['data-dir'], 'data.json'));

var partials   = path.join(ENV.html['src-dir'], '{layouts,partials}', '**', '*.hbs');
var helpers   = './tools/handlebars/helpers/**/*.js';

// UTILS
// ----------------------------------------------------------------------------
function processData(file) {
  var base = file.path.replace(ENV.html['src-dir'], ENV.html['data-dir']);
  var specificDataFile = base.replace('.hbs', '.json');
  var gData = {};
  var sData = {};

  try {
    gData = require(genericDataFile);
  } catch (e) {
    gutil.log(gutil.colors.yellow('WARN:'),
      'Unable to find data from',
      genericDataFile.replace(path.resolve('.'), '').slice(1)
    );
  }

  try {
    sData = require(specificDataFile);
  } catch (e) {
    gutil.log(gutil.colors.yellow('WARN:'),
      'Unable to find data from',
      specificDataFile.replace(path.resolve('.'), '').slice(1)
    );
  }

  var data  = _.extend({}, gData, sData);
  data.url  = file.path.replace(ENV.html['src-dir'], DEST_URL).replace('.hbs', '.html');

  return data;
}

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(data, processData)
    .pipe(hb, {
      helpers: helpers,
      partials: partials,
      parsePartialName: function parsePartialName(options, file) {
        var partialName = file.path.replace(file.base,'');
        partialName = partialName.replace('.hbs','');
        partialName = partialName.replace('partials/','');
        partialName = partialName.replace(/\//g,'');
        return partialName;
      }
    })
    .pipe(rename, {
      extname: '.html'
    });

  return lazystream();
};
