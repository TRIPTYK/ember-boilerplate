/* eslint-disable node/no-missing-require */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

// const { V1Addon } = require('@embroider/compat');
// const { forceIncludeModule } = require('@embroider/compat/src/compat-utils');

/**
 * See https://github.com/embroider-build/embroider/issues/396#issuecomment-611885598
 * Ember data incompatibility with Embroider
 */
// class EmberDataCompatAdapter extends V1Addon {
//   get packageMeta() {
//     return forceIncludeModule(super.packageMeta, './-private');
//   }
// }

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        enabled: true,
        includePaths: ['app'],
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./app/tailwind/config.js'),
        ],
        cacheInclude: [/.*\.(css|hbs|html)$/, /config\.js/],
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  // return app.toTree();
  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    // compatAdapters: new Map([
    //   ['@ember-data/model', EmberDataCompatAdapter],
    //   ['@ember-data/record-data', EmberDataCompatAdapter],
    // ]),
    splitAtRoutes: ['comments.details', 'comments.create'], // can also be a RegExp
  });
};
