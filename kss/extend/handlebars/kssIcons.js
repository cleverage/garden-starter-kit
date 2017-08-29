
module.exports = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('kssIcons', function (doc, block) {
    var accum = '';
    var regex = /^(\S+)\s*:\s*(\S+)(?:\s*-\s*(.*))?$/gm;
    var test;

    while ((test = regex.exec(doc)) !== null) {
      this.icon = {};
      this.icon.name = test[1];
      this.icon.character = test[2];
      if (test[3] !== undefined) {
        this.icon.description = test[3];
      }

      accum += block.fn(this);
    }

    return accum;
  });
};
