import { clickable, collection, create, fillable } from 'ember-cli-page-object';

export const pagesFormsRegister = create({
  scope: '[data-test-form="register"]',
  firstName: fillable('[data-test-input="firstName"] input'),
  lastName: fillable('[data-test-input="lastName"] input'),
  phone: fillable('[data-test-input="phone"] input'),
  email: fillable('[data-test-input="email"] input'),
  password: fillable('[data-test-input="password"] input'),
  confirmPassword: fillable('[data-test-input="confirmPassword"] input'),
  errors: collection('[data-has-error="true"]'),
  submit: clickable('[data-test-submit]'),
});
