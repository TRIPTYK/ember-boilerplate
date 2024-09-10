'use strict';

module.exports = {
  overrides: [
    {
      files: ['**/*.{js,ts}'],
      plugins: ['ember'],
      parser: '@typescript-eslint/parser',
      extends: ['eslint:recommended', 'plugin:ember/recommended'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
      }
    },
    {
      files: ['**/*.gts'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:ember/recommended-gts'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
      }
    },
    {
      files: ['**/*.gjs'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:ember/recommended-gjs'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
      }
    },
    // test files
    {
      files: ['tests/**/*-test.{js,ts}'],
      plugins: ['ember'],
      parser: '@typescript-eslint/parser',
      extends: ['eslint:recommended', 'plugin:qunit/recommended'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
      }
    },
    {
      files: ['tests/**/*-test.{gjs,gts}'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:ember/recommended-gts'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
      }
    },
    // node files
    {
      files: [
        './.eslintrc.{js,cjs}',
        './.prettierrc.{js,cjs}',
        './.stylelintrc.{js,cjs}',
        './.template-lintrc.{js,cjs}',
        './ember-cli-build.js',
        './testem.js',
        './tailwind.config.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
  ],
};
