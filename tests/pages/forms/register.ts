import { clickable, collection, create, fillable } from 'ember-cli-page-object';

export const pagesFormsRegister = create({
  scope: '[data-test-form="register"]',
  name: fillable('[data-test-input="name"] input'),
  email: fillable('[data-test-input="email"] input'),
  password: fillable('[data-test-input="password"] input'),
  confirmPassword: fillable('[data-test-input="confirmPassword"] input'),
  errors: collection('[data-has-error="true"]'),
  submit: clickable('[data-test-submit]'),
});
