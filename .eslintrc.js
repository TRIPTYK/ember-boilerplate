'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ],
    },
  },
  plugins: ['ember', 'unicorn', '@typescript-eslint', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'no-else-return': 'error',
    'no-console': 'warn',
    'no-undef': 'off',
    'unused-imports/no-unused-imports': 'error',
    'ember/no-controllers': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    'ember/require-fetch-import': 'error',
    'ember/route-path-style': 'error',
    'ember/no-current-route-name': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
  },
  overrides: [
    // node files
    {
      files: [
        './.formconfig.js',
        './lighthouserc.js',
        './.eslintrc.js',
        './with-backend.js',
        './read-cov.js',
        './app/tailwind/tailwind.config.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
        './postcss.config.js',
        'node-tests/**/*.js',
      ],
      parserOptions: {
        project: null,
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
        jest: true,
      },
      extends: ['plugin:n/recommended'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
    {
      // translations files
      extends: ['plugin:yml/base'],
      parser: 'yaml-eslint-parser',
      parserOptions: {
        project: null,
      },
      files: ['translations/**/*.{yml,yaml}'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        'yml/key-name-casing': [
          'error',
          {
            snake_case: true,
            camelCase: false,
            PascalCase: false,
          },
        ],
      },
    },
    {
      // browser
      extends: ['plugin:yml/base'],
      parserOptions: {
        project: null,
        sourceType: 'script',
      },
      env: {
        browser: true,
        node: false,
      },
      files: ['public/**/*.js'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ],
};
