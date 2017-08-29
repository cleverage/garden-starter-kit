#!/usr/bin/env node
console.log('Hello, world!');

var fs = require('fs-extra');
var argv = require('yargs').argv

var gulpfile = 'gulpfile.js';

// process.env.PWD : /Users/yliechti/Sites/trygsknext
// process.cwd() : /Users/yliechti/Sites/trygsknext
// __dirname : /Users/yliechti/Sites/trygsknext/node_modules/garden-starterkit/bin

fs.stat(gulpfile, function(err) {
  if (err === null){
    // it‘s can be an update
    console.log('This project seems to be already initializated');
  } else if (err.code === 'ENOENT') {
    console.log('Welcome in Garden-starterkit.');

    // write gulpfile
    fs.writeFileSync(gulpfile, 'require(\'garden-starterkit\');', 'utf-8');

    var config = require('../config.json');

    if (argv.default) {
      // use default config
      require('../tools/init.js')(config);
    } else {
      // start prompt to config gsk
      var inquirer = require('inquirer');

      inquirer.prompt([
        {
          type: 'list',
          message: 'Select your HTML engine:',
          name: 'html',
          choices: [
            {
              name: 'Twig',
              checked: true,
              value: 'twig'
            },
            {
              name: 'Handlebars',
              value: 'handlebars'
            }
          ]
        },
        {
          type: 'list',
          message: 'Select your Css engine:',
          name: 'css',
          choices: [
            {
              name: 'Sass (node-sass)',
              checked: true,
              value: 'sass'
            },
            {
              name: 'Compass (with ruby)',
              value: 'compass'
            },
            {
              name: 'Stylus',
              value: 'stylus'
            }
          ]
        }
      ]).then(function (answers) {
        config.html.engine = answers.html;
        config.css.engine = answers.css;

        require('../tools/init.js')(config);
      });
    }
  }
});
