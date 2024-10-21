'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = async function (defaults) {
  const { setConfig } = await import('@warp-drive/build-config');

  process.on('uncaughtException', (err) => {
    console.error(err.stack);
  });

  let app = new EmberApp(defaults, {
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    'ember-cli-babel': {
      enableTypeScriptTransform: true
    },
    babel: {
      sourceMaps: 'inline',
      plugins: [require.resolve("ember-concurrency/async-arrow-task-transform"), ...require('ember-cli-code-coverage').buildBabelPlugin({ embroider: true })],
    },
    '@embroider/macros': {
      setConfig: {
        '@ember-data/store': {
          polyfillUUID: true,
        },
      },
    },
    'ember-fetch': {
      nativePromise: true
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

  setConfig(app, __dirname, {
    compatWith: '99.0',
  });

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
    staticAddonTrees: true,
    staticAddonTestSupportTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    splitControllers: true,
    splitRouteClasses: true,
    staticEmberSource: true
  });
};
