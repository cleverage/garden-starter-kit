'use strict';

// MODULES
// ----------------------------------------------------------------------------
var gulp   = require('gulp');
var nproxy = require('nproxy');
var argv   = require('yargs').argv;

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp nproxy
// ----------------------------------------------------------------------------
// This will serve static local files intead of remote ones
// use: `localhost:8989` as proxy parameter

// see `conf/nproxy.js` for proxy configuration

gulp.task('nproxy', 'Starts nproxy (proxy files, webservices, caching...).', function nproxyTask() {

	// use `--port=8080` to change the port number
  var port = argv.port || 8989,
    options = {
      timeout: argv.timeout || 100,
      // use `--debug` to activate debuging
      debug  : argv.debug || false
    };

  // OPTIONAL: If you want nproxy requests to be proxyfied
  // add a `.nproxy-auth.json` file (ignored by git)
  // ```
  // {
  //   "protocol" : "http",
  //   "host"     : "10.xx.xx.xx",
  //   "port"     : 8090,
  //   "username" : "johndoe",
  //   "password" : "mypass"
  // }
  // ```
  try {
    var proxyConf = require('./../conf/nproxy-auth.json');
    options.proxy = proxyConf;
  } catch(e) { /* config file can be missing */ }

  options.responderListFilePath = require('../conf/nproxy.js')(argv);

  return nproxy(port, options);

}, {
  options: {
    debug: 'Debug.'
  }
});