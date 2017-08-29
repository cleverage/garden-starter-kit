'use strict';

/**
 * This module is used to load the base KSS builder class needed by this builder
 * and to define any custom CLI options or extend any base class methods.
 *
 * Note: since this builder wants to extend the KssBuilderBase class, it
 * must export a KssBuilderBase sub-class as a module. Otherwise, kss-node
 * will assume the builder wants to use the KssBuilderBaseHandlebars class.
 *
 * This file's name should follow standard node.js require() conventions. It
 * should either be named index.js or have its name set in the "main" property
 * of the builder's package.json. See
 * http://nodejs.org/api/modules.html#modules_folders_as_modules
 *
 * @module kss/builder/twig
 */


// We want to extend kss-node's Twig builder so we can add options that
// are used in our templates.
let KssBuilderBase;

var path = require('path');

// gks config
var ENV = require('../tools/env');

try {
  // In order for a builder to be "kss clone"-able, it must use the
  // require('kss/builder/path') syntax.
  KssBuilderBase = require('kss/builder/base/' + ENV.html.engine);
} catch (e) {
  // The above require() line will always work.
  //
  // Unless you are one of the developers of kss-node and are using a git clone
  // of kss-node where this code will not be inside a "node_modules/kss" folder
  // which would allow node.js to find it with require('kss/anything'), forcing
  // you to write a long-winded comment and catch the error and try again using
  // a relative path.
  KssBuilderBase = require('../base/' + ENV.html.engine);
}

/**
 * A kss-node builder that takes input files and builds a style guide using Twig
 * templates.
 */
class KssBuilder extends KssBuilderBase {
  /**
   * Create a builder object.
   */
  constructor() {
    // First call the constructor of KssBuilderBase.
    super();

    // Then tell kss which Yargs-like options this builder adds.
    this.addOptionDefinitions({
      title: {
        group: 'Style guide:',
        string: true,
        multiple: false,
        describe: 'Title of the style guide',
        default: 'KSS Style Guide'
      }
    });

    this.options.extend.push(path.join(__dirname, 'extend', ENV.html.engine));
  }

  /**
   * Allow the builder to preform pre-build tasks or modify the KssStyleGuide
   * object.
   *
   * The method can be set by any KssBuilderBase sub-class to do any custom tasks
   * after the KssStyleGuide object is created and before the HTML style guide
   * is built.
   *
   * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
   * @returns {Promise.<KssStyleGuide>} A `Promise` object resolving to
   *   `styleGuide`.
   */
  prepare(styleGuide) {
    // First we let KssBuilderBase.prepare() clean-up the style guide object.
    return super.prepare(styleGuide).then(styleGuide => {

      return Promise.resolve(styleGuide);
    });
  }
}

module.exports = KssBuilder;
