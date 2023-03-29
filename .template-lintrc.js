'use strict';

module.exports = {
  extends: ['recommended', 'stylistic'],
  rules: {
    'self-closing-void-elements': 'off',
    'template-length': ['error', {
      min: 0,
      max: 50
    }]
  },
};
