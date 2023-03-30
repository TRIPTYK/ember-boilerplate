import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { createChangeset } from 'ember-form-changeset-validations/changeset/create-changeset';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import formsRegisterValidation from 'ember-boilerplate/validations/register';
import { pagesFormsRegister } from 'ember-boilerplate/tests/pages/forms/register';

interface RegisterTestContext extends TestContext {
  changeset: RegisterChangeset;
  saveFunction: (changeset: RegisterChangeset) => void;
}

module('Integration | Component | forms/register', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);

  let changeset: RegisterChangeset;

  hooks.beforeEach<RegisterTestContext>(function () {
    changeset = createChangeset(
      RegisterChangeset,
      {
        email: 'test@triptyk.eu',
        name: 'triptyk',
        password: '',
        confirmPassword: '',
      },
      formsRegisterValidation
    );
    this.set('changeset', changeset);
  });

  function renderForm() {
    return render(
      hbs`
          <Forms::Register
            @changeset={{this.changeset}}
            @saveFunction={{this.saveFunction}}
          >
            <Inputs::CancelButton data-test-cancel>
              {{t "global.cancel"}}
            </Inputs::CancelButton>
            <Inputs::Button type="submit" data-test-submit>
              {{t "global.create"}}
            </Inputs::Button>
          </Forms::Register>
      `
    );
  }

  test('Submit without complete missing field returns errors', async function (assert) {
    // Testing makes Amaury happy so do your tests
    this.set('saveFunction', () => {});
    await renderForm();
    await pagesFormsRegister.submit();
    assert.true(pagesFormsRegister.errors.length > 0);
  });

  test('Edit form and trigger saveFunction', async function (assert) {
    assert.expect(6);
    this.set('saveFunction', (changeset: RegisterChangeset) => {
      assert.strictEqual(changeset.get('name'), 'triptyk');
      assert.strictEqual(changeset.get('email'), 'test@triptyk.eu');
      assert.strictEqual(changeset.get('password'), 'hello');
      assert.strictEqual(changeset.get('confirmPassword'), 'hello');
      assert.step('saveFunction');
    });
    await renderForm();

    await pagesFormsRegister.password('hello').confirmPassword('hello');

    await pagesFormsRegister.submit();
    assert.verifySteps(['saveFunction']);
  });

  test('confirmPassword not match password and return an error', async function (assert) {
    assert.expect(6);
    this.set('saveFunction', () => {});
    await renderForm();

    await pagesFormsRegister.password('hello').confirmPassword('hellos');

    await pagesFormsRegister.submit();

    console.log(pagesFormsRegister.errors.objectAt(0));
  });
});
