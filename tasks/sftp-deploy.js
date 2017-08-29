'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path   = require('path');
var gulp   = require('gulp');
var sftp   = require('gulp-sftp');
var prompt = require('gulp-prompt');
var pkg    = require(path.relative(__dirname, path.join(process.cwd(), 'package.json')));
var ENV    = require('../tools/env');
var gutil  = require('gulp-util');

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp sftp-deploy
// ----------------------------------------------------------------------------
// Deploys the build folder onto a preview server via SFTP.
// The configuration is in the `.ftpass` file (to be created at the same level
// as `gulpfile.js`):
// ```
// {
//   "key1": {
//     "username": "<username>",
//     "password": "<password>"
//   }
// }
// ```
// Caution: before the first deploy, ensure that the root target folder exists
// (if needed, create it). We didn't solve this problem because it prevents
// deploying at the wrong location.
gulp.task('sftp-deploy', function () {

  var SRC = path.join(ENV['sftp-deploy']['src-dir'], '**', '*');

  var options = ENV['sftp-deploy'];

  // set `options.remotePath` from `options['dest-dir']`
  // and replace elements like `%pkg.name%` with the corresponding value from `package.json`
  options.remotePath = options['dest-dir']
    .replace(/%pkg\.\w+%/g, function(placeholder) {
      return placeholder.replace(/%pkg\.(\w+)%/, function(ph, pkgKey) {
        return pkg[pkgKey];
      });
    });

  gutil.log('package.json: ' + pkg.name + ' ' + pkg.version);

  return gulp.src(SRC)
    // remind user to build first
    .pipe(prompt.confirm('Are you on the correct branch, and have built before deployment?'))
    // confirm destination URL
    .pipe(prompt.confirm({
      message : 'Destination: sftp://' + options.host + ':' + options.port + options.remotePath,
      default : true})
    )
    .pipe(sftp(options));

});
