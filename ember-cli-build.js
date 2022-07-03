'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { V1Addon } = require('@embroider/compat');
const { forceIncludeModule } = require('@embroider/compat/src/compat-utils');

/**
 * See https://github.com/embroider-build/embroider/issues/396#issuecomment-611885598
 * Ember data incompatibility with Embroider
 * Ember-cli mirage ?
 */
class EmberDataCompatAdapter extends V1Addon {
  get packageMeta() {
    return forceIncludeModule(super.packageMeta, './-private');
  }
}

module.exports = function (defaults) {
  process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  });

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
          require('cssnano')(),
        ],
        cacheInclude: [/.*\.(css|hbs|html)$/, /tailwind\.config\.js/],
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
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    compatAdapters: new Map([
      ['@ember-data/model', EmberDataCompatAdapter],
      ['@ember-data/record-data', EmberDataCompatAdapter],
    ]),
    splitAtRoutes: [/^(?!(application)$).*$/], // can also be a RegExp
  });
};
