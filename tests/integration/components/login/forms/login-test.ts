/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Validation from 'ember-boilerplate/validations/login';
import type { Changeset } from 'ember-form-changeset-validations';
import { createChangeset } from 'ember-form-changeset-validations';
import { ExtendedChangeset } from 'ember-form-changeset-validations';
import click from '@ember/test-helpers/dom/click';
import { loginPage } from 'ember-boilerplate/tests/pages/login';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | FormsLogin', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);

  test('Create (empty changeset)', async function (assert) {
    this.set(
      'changeset',
      createChangeset(
        ExtendedChangeset,
        {
          email: '',
          password: '',
        },
        Validation
      )
    );

    this.set('saveFunction', (changeset: Changeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('email'), 'edited@gmail.com');
      assert.strictEqual(changeset.get('password'), 'edited');
    });

    await render(
      hbs`<Forms::Login @changeset={{this.changeset}} @saveFunction={{this.saveFunction}} />`
    );

    assert.dom('[data-test-input="email"] input').hasValue('');
    assert.dom('[data-test-input="password"] input').hasValue('');

    await loginPage.email('edited@gmail.com').password('edited');

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });

  test('Edit (populated changeset)', async function (assert) {
    this.set(
      'changeset',
      createChangeset(
        ExtendedChangeset,
        {
          email: 'hello',
          password: 'hello',
        },
        Validation
      )
    );

    this.set('saveFunction', (changeset: Changeset) => {
      assert.strictEqual(changeset.get('email'), 'edited@gmail.com');
      assert.strictEqual(changeset.get('password'), 'helloEdited');
      assert.step('saveFunction');
    });

    await render(
      hbs`<Forms::Login @saveFunction={{this.saveFunction}} @changeset={{this.changeset}}/>`
    );

    assert.dom('[data-test-input="email"] input').hasValue('hello');
    assert.dom('[data-test-input="password"] input').hasValue('hello');

    await loginPage.email('edited@gmail.com').password('helloEdited');

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });
});
