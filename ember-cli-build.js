/* eslint-disable node/no-missing-require */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [
        ...require('ember-cli-code-coverage').buildBabelPlugin({
          embroider: true,
        }),
      ],
    },
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
          require('tailwindcss')('./app/tailwind/tailwind.config.js'),
        ],
        cacheInclude: [/.*\.(css|hbs|html)$/, /tailwind\.config\.js/],
      },
    },
  });

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    splitAtRoutes: ['login'], // can also be a RegExp
  });
};
