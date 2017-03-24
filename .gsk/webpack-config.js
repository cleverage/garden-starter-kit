'use strict';

const webpack = require('webpack');
const path = require('path');

const ENV  = require('./tools/env');
const SRC  = ENV.js['src-dir'];
const DEST = ENV.js['dest-dir'];

var glob = require('glob');

// Get collection of entries files from config.js
let entries = [];

let files = glob.sync(path.join(SRC, '*.js'));

for (const file of files) {
  entries.push(file);
}


// Plugins
let webpackPlugins = [];

// If an external module try to use jQuery or $ as a global,
// it make a require('jquery') to relolve it
//
webpackPlugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  })
);

// Create a js file with modules common to each entries
//
// webpackPlugins.push(
//   new webpack.optimize.CommonsChunkPlugin('common.js')
// );

// Minimise with uglify if --optimize used
if (ENV.all.optimize) {
  webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    sourceMap: true
  }));
}

module.exports = {
  entry: entries,
  output: {
    path: DEST,
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {'modules': false}]
          ]
        }
      }
    }]
  },
  resolve: {
    modules: [
      path.resolve('../src/js'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  devtool: 'source-map',
  plugins: webpackPlugins
};
