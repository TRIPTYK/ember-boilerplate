'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  });

  let app = new EmberApp(defaults, {
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    babel: {
      sourceMaps: 'inline'
    },
    '@embroider/macros': {
      setConfig: {
        '@ember-data/store': {
          polyfillUUID: true,
        },
      },
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js'],
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
          require('tailwindcss')('tailwind.config.js'),
        ],
        cacheInclude: [/.*\.(css|hbs|html|gts|gjs|ts)$/, /tailwind\.config\.js/],
      },
    },
  });

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    packagerOptions: {
      webpackConfig: {
        devtool: 'source-map',
      },
    },
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
  });
};
