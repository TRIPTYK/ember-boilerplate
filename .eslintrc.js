'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
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
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
        'node-tests/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
        jest: true,
      },
      extends: ['plugin:n/recommended'],
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
