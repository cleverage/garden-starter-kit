module.exports = function (Handlebars) {
  'use strict';

  var path = require('path');

  var folderPath = '../../../tools/handlebars/helpers';
  require('fs').readdirSync(path.resolve(path.relative(process.cwd(), __dirname), folderPath)).forEach(function(file) {
    var helper = require(path.join(folderPath, file));
    if (helper.register) {
      helper.register(Handlebars);
    }
  });
};
