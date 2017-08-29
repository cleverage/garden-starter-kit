/** script */

// import from a lib
var lib = require('./lib/lib');

// or from another module
// var toto2 = require('./toto2')

// or directly import from node_modules
// var _ = require('underscore');

// some behaviour for our module
function foo(firstname) {
  window.console.log('Hello %s!', firstname);
}

foo(lib.firstname);

// Use jQuery exposed as global by webpack config
// for console, external script on inline js if needed
var $ = require('jquery');

// you can add jquery plugin just by requiring them (if they are compatible with CommonJS)
require('slick-carousel');
// now, that should work:
$('#carousel').slick(); // FYI no `#carousel` element on page :D

// Require lib that are not compatible with CommonJS (see `webpack-config.js`)
// And https://webpack.github.io/docs/shimming-modules.html


// if you want to use global var from external lib
window.globalVar = 'Loaded via window.globalVar';

// expose foo to other modules
module.exports = foo;
