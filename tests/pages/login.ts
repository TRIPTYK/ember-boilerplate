import {
  clickable,
  create,
  fillable,
  text,
  visitable,
} from 'ember-cli-page-object';

export const loginPage = create({
  scope: '[data-test-form-login]',
  visit: visitable('/login'),
  email: fillable('[data-test-input="email"] input'),
  password: fillable('[data-test-input="password"] input'),
  submit: clickable("button[type='submit']"),
  error: text('.errors'),
});
