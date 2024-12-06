import { clickable, collection, create, fillable } from 'ember-cli-page-object';

export const pagesFormsRegister = create({
  scope: '[data-test-form="register"]',
  firstName: fillable('[data-test-input="firstName"] input'),
  lastName: fillable('[data-test-input="lastName"] input'),
  phone: fillable('[data-test-input="phone"] input'),
  email: fillable('[data-test-input="email"] input'),
  gift: fillable('[data-test-input="gift"] input'),
  password: fillable('[data-test-input="password"] input'),
  confirmPassword: fillable('[data-test-input="confirmPassword"] input'),
  isFree: clickable('[data-test-input="isFree"] .tpk-checkbox-input'),
  status: {
    scope: '[data-test-input="status"]',
    jobseeker: clickable('[data-test-radio="jobseeker"] .tpk-radio-input'),
    employee: clickable('[data-test-radio="employee"] .tpk-radio-input'),
    student: clickable('[data-test-radio="student"] .tpk-radio-input'),
  },
  errors: collection('[data-has-error="true"]'),
  submit: clickable('[data-test-submit]'),
});
