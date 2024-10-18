import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';
import { pagesFormsRegister } from 'ember-boilerplate/tests/pages/forms/register';
import validationsRegister from 'ember-boilerplate/validations/register';
import { setupIntl } from 'ember-intl/test-support';
import RegisterForm from 'ember-boilerplate/components/forms/register';

module('Integration | Component | forms/register', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  function createChangeset(): RegisterChangeset {
    return new RegisterChangeset({
      email: 'test@triptyk.eu',
      lastName: 'triptyk',
      firstName: 'papa',
      phone: '+32 498542257',
      gift: 1000,
      password: '',
      confirmPassword: '',
    });
  }

  function renderForm(
    changeset: RegisterChangeset,
    saveFunction: (changeset: RegisterChangeset) => void,
    validationSchema: typeof validationsRegister
  ) {
    return render(
      <template>
        <RegisterForm
          @changeset={{changeset}}
          @saveFunction={{saveFunction}}
          @validationSchema={{validationSchema}}
        />
      </template>
    );
  }

  test('Submit with missing field returns errors', async function (assert) {
    await renderForm(createChangeset(), () => {}, validationsRegister);
    await pagesFormsRegister.submit();
    assert.true(pagesFormsRegister.errors.length > 0);
  });

  // note : saveFunction when form is valid is already tested by the component YupForm. No need to test this behavior in the future.
  test('Edit form and trigger saveFunction', async function (assert) {
    let saveFunction = (changeset: RegisterChangeset) => {
      assert.strictEqual(changeset.get('lastName'), 'triptyk');
      assert.strictEqual(changeset.get('firstName'), 'papa');
      assert.strictEqual(changeset.get('email'), 'test@triptyk.eu');
      assert.strictEqual(changeset.get('phone'), '+32 498542257');
      assert.strictEqual(changeset.get('gift'), 234.23);
      assert.strictEqual(changeset.get('password'), 'hello');
      assert.strictEqual(changeset.get('confirmPassword'), 'hello');
      assert.step('saveFunction');
    };
    await renderForm(createChangeset(), saveFunction, validationsRegister);

    await pagesFormsRegister.gift('234,23 €').password('hello').confirmPassword('hello');

    await pagesFormsRegister.submit();
    assert.verifySteps(['saveFunction']);
  });

  test('confirmPassword which does not match password returns an error', async function (assert) {
    await renderForm(createChangeset(), () => {}, validationsRegister);

    await pagesFormsRegister.password('hello').confirmPassword('hellos');
    await pagesFormsRegister.submit();

    console.log(pagesFormsRegister.errors[0]?.text);


    assert.true(
      pagesFormsRegister.errors[0]?.text?.includes('Confirmer mot de passe * Les mots de passe ne correspondent pas')
    );
  });
});
