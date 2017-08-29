// concat
// --------------------------------------------------------------------------
// Simple helper to concat string

module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('concat', function (/* string1, string2, string3 */) {
    // if you provide several keys, they will be concatenated
    var tests = [].splice.call(arguments, 0);
    // remove options
    tests.splice(-1, 1);
    return tests.join('');
  });
};
