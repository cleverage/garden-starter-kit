'use strict';

var path = require('path');

require('fs').readdirSync(path.relative(process.cwd() , __dirname)).forEach(function(file) {
    require(path.resolve(__dirname, file));
});
