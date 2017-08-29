'use strict';

var gutil = require('gulp-util');

module.exports = function err(error) {
  gutil.log(gutil.colors.red('ERROR:'), error.plugin);

  if (error.stack) {
    error.stack.split('\n').forEach(function (line) {
      gutil.log(gutil.colors.red('STACK:'), line);
    });
  }

  else {
    gutil.log(gutil.colors.red('ERROR:'), error.message);
  }

  this.emit('end');
};
