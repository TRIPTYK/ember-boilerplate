/* eslint-disable qunit/require-expect */
import { render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { loginPage } from 'ember-boilerplate/tests/pages/login';
import loginSchema from 'ember-boilerplate/validations/login';
import { type Changeset, ImmerChangeset } from 'ember-immer-changeset';

import { setupIntl } from 'ember-intl/test-support';

import { LoginChangeset } from 'ember-boilerplate/changesets/login';
import LoginForm from 'ember-boilerplate/components/forms/login';

interface LoginTestContext {
  changeset: LoginChangeset;
  saveFunction: (changeset: Changeset) => void;
  validationSchema: typeof loginSchema;
}

module('Integration | Component | FormsLogin', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);

  function renderForm(context: LoginTestContext) {
    return render<LoginTestContext>(
      <template>
        <LoginForm
          @validationSchema={{context.validationSchema}}
          @changeset={{context.changeset}}
          @saveFunction={{context.saveFunction}}
        />
      </template>
    );
  }

  test('Create (empty changeset)', async function (assert) {
    let validationSchema = loginSchema;
    let saveFunction = (changeset: Changeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('email'), 'edited@gmail.com');
      assert.strictEqual(changeset.get('password'), 'edited');
    };

    await renderForm({
      changeset: new LoginChangeset({} as never),
      validationSchema,
      saveFunction,
    });

    assert.dom('[data-test-input="email"] input').hasValue('');
    assert.dom('[data-test-input="password"] input').hasValue('');

    await loginPage.email('edited@gmail.com').password('edited');

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });

  test('Edit (populated changeset)', async function (assert) {
    let changeset = new ImmerChangeset({
      email: 'hello',
      password: 'hello',
    });
    let validationSchema = loginSchema;

    let saveFunction = (changeset: Changeset) => {
      assert.strictEqual(changeset.get('email'), 'edited@gmail.com');
      assert.strictEqual(changeset.get('password'), 'helloEdited');
      assert.step('saveFunction');
    };

    await renderForm({
      changeset,
      validationSchema,
      saveFunction,
    });

    assert.dom('[data-test-input="email"] input').hasValue('hello');
    assert.dom('[data-test-input="password"] input').hasValue('hello');

    await loginPage.email('edited@gmail.com').password('helloEdited');

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });
});
