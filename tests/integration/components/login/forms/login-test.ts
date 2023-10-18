/* eslint-disable qunit/require-expect */
import { render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { loginPage } from 'ember-boilerplate/tests/pages/login';
import loginSchema from 'ember-boilerplate/validations/login';
import { type Changeset,ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | FormsLogin', function (hooks) {
  setupRenderingTest(hooks);

  test('Create (empty changeset)', async function (assert) {
    this.set('changeset', new ImmerChangeset({}));
    this.set('validationSchema', loginSchema);
    this.set('saveFunction', (changeset: Changeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('email'), 'edited@gmail.com');
      assert.strictEqual(changeset.get('password'), 'edited');
    });

    await render(
      hbs`{{! @glint-nocheck }}<Forms::Login @validationSchema={{this.validationSchema}} @changeset={{this.changeset}} @saveFunction={{this.saveFunction}} />`,
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
      new ImmerChangeset({
        email: 'hello',
        password: 'hello',
      }),
    );
    this.set('validationSchema', loginSchema);

    this.set('saveFunction', (changeset: Changeset) => {
      assert.strictEqual(changeset.get('email'), 'edited@gmail.com');
      assert.strictEqual(changeset.get('password'), 'helloEdited');
      assert.step('saveFunction');
    });

    await render(
      hbs`{{! @glint-nocheck }}<Forms::Login  @validationSchema={{this.validationSchema}} @saveFunction={{this.saveFunction}} @changeset={{this.changeset}}/>`,
    );

    assert.dom('[data-test-input="email"] input').hasValue('hello');
    assert.dom('[data-test-input="password"] input').hasValue('hello');

    await loginPage.email('edited@gmail.com').password('helloEdited');

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });
});
