import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';
import { pagesFormsRegister } from 'ember-boilerplate/tests/pages/forms/register';
import validationsRegister from 'ember-boilerplate/validations/register';
import { setupIntl } from 'ember-intl/test-support';
import RegisterForm from 'ember-boilerplate/components/forms/register';
import { array } from '@ember/helper';
import { triggerEvent } from '@ember/test-helpers';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';
import { selectChoose } from 'ember-power-select/test-support';

module('Integration | Component | forms/register', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  function createChangeset(): RegisterChangeset {
    return new RegisterChangeset({
      email: 'test@triptyk.eu',
      lastName: 'triptyk',
      category: null,
      birthDate: null,
      firstName: 'papa',
      phone: '+32 498542257',
      gift: 1000,
      password: '',
      confirmPassword: '',
      isFree: true,
      period: null,
      time: null,
      status: null,
      cv: null,
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
          @categories={{array "1" "2" "3"}}
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
    const date1 = new Date(2022, 0, 1, 22, 30, 0);
    const date2 = new Date(2023, 0, 1, 22, 30, 0);
    let saveFunction = (changeset: RegisterChangeset) => {
      assert.strictEqual(changeset.get('lastName'), 'triptyk');
      assert.strictEqual(changeset.get('firstName'), 'papa');
      assert.strictEqual(changeset.get('email'), 'test@triptyk.eu');
      assert.strictEqual(changeset.get('phone'), '+32 498542257');
      assert.strictEqual(changeset.get('gift'), 234.23);
      assert.strictEqual(changeset.get('password'), 'hello');
      assert.strictEqual(changeset.get('confirmPassword'), 'hello');
      assert.true(changeset.get('isFree'));
      assert.deepEqual(changeset.get('period'), [date1, date2]);
      assert.strictEqual(changeset.get('time'), date1);
      assert.strictEqual(changeset.get('status'), 'jobseeker');
      assert.strictEqual(changeset.get('cv')?.name, 'file.txt');
      assert.strictEqual(changeset.get('category'), '3');
      assert.strictEqual(changeset.get('birthDate'), date1);
      assert.step('saveFunction');
    };
    await renderForm(createChangeset(), saveFunction, validationsRegister);

    await pagesFormsRegister.gift('234,23 €').password('hello').confirmPassword('hello');
    setTempusDominusDate('[data-test-input="birthDate"] .tpk-datepicker-input', date1);
    await pagesFormsRegister.isFree();
    await pagesFormsRegister.isFree();

    await pagesFormsRegister.status.jobseeker();
    await selectChoose('[data-test-input="category"]', '.ember-power-select-option', 2);

    setTempusDominusDate('[data-test-input="period"] .tpk-datepicker-range-input', date1, 0);
    setTempusDominusDate('[data-test-input="period"] .tpk-datepicker-range-input', date2, 1);

    setTempusDominusDate('[data-test-input="time"] .tpk-timepicker-input', date1);

    await triggerEvent('[data-test-input="cv"] .tpk-file-input', 'change', {
      files: [new File(['Ember Rules!'], 'file.txt')],
    });
    await pagesFormsRegister.submit();
    assert.verifySteps(['saveFunction']);
  });

  test('confirmPassword which does not match password returns an error', async function (assert) {
    await renderForm(createChangeset(), () => {}, validationsRegister);

    await pagesFormsRegister.password('hello').confirmPassword('hellos');
    await pagesFormsRegister.submit();

    console.log(pagesFormsRegister.errors[0]?.text);

    assert.true(
      pagesFormsRegister.errors[0]?.text?.includes(
        'Confirmer mot de passe * Les mots de passe ne correspondent pas'
      )
    );
  });
});
