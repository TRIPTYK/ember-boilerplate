import eslintPluginEmberRecommended from 'eslint-plugin-ember/configs/recommended';
import parser from '@typescript-eslint/parser';
import globals from 'globals';
import qunit from 'eslint-plugin-qunit/configs/recommended';

const config = [
  qunit,
  ...eslintPluginEmberRecommended,
  {
    files: ['{app,tests}/**/*.{ts,js}'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {

  },
  {
    files: [
      '**/*.{cjs,js,mjs}'
    ],
    languageOptions: {
      globals: globals.node
    }
  },
  {
    ignores: ['dist/','public/'],
  }
];

export default config;
