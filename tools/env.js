'use strict';

// MODULES
// ----------------------------------------------------------------------------
var fs   = require('fs');
var path = require('path');
var _    = require('underscore');
var cli  = require('./cli');


// CONFIGURATION
// ----------------------------------------------------------------------------
// Récupération de la liste des taches disponibles
var tasks = fs.readdirSync(path.resolve(path.relative(process.cwd(), __dirname), '../tasks')).map(function (val) {
  return val.slice(0, -3);
});

// Récupération de la configuration de base
var DEFAULT = require(path.join(process.cwd(), 'gsk.json'));

// Paramètres de CLI
var CLI_PARAM = [];
var CLI_ALIAS = {
  // Use the flag "-o" instead of "--all.optimize" or "--optimize"
  'all.optimize': 'o',

  // Use the flag "-r" instead of "--all.relax" or "--relax"
  'all.relax': 'r'
};

// Tous les paramètres de conf par defaut peuvent être
// forcés via la ligne de commande.
_.each(DEFAULT, function (value, key) {
  var prefix = key;

  _.each(value, function (v, k) {
    var id    = prefix + '.' + k;
    var names = [id];
    var type  = typeof v;

    if (type === 'string' && /\\{1,2}|\//.test(v)) {
      type = 'filename';
      DEFAULT[key][k] = path.resolve('.', path.normalize(v));
    }

    // Les paramètre globaux peuvent être appelé sans le prefix "all."
    if (prefix === 'all') {
      names.push(k);
    }

    // Certain paramètre dispose d'un alias plus court
    if (id in CLI_ALIAS) {
      names.push(CLI_ALIAS[id]);
    }

    CLI_PARAM.push({
      id: id, cli: names, value: type
    });
  });
});

// Récuperation des parametres passés en ligne de commande
var RAW = cli.parse(CLI_PARAM);

// Configuration final
var CONF = {
  all: _.extend({}, DEFAULT.all, RAW.all)
};

tasks.forEach(function (task) {
  CONF[task] = _.extend({}, DEFAULT[task], RAW[task]);
});


// EXPORTATION
// ----------------------------------------------------------------------------
module.exports = CONF;
