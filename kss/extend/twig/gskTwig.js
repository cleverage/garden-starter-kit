module.exports = function (Twig) {
  'use strict';

  var path = require('path');

  Twig.extend(function (Twig) {
    var folderPath = '../../../tools/twig/extends';
    require('fs').readdirSync(path.resolve(path.relative(process.cwd(), __dirname), folderPath)).forEach(function(file) {
      require(path.join(folderPath, file))(Twig);
    });
  });
};
