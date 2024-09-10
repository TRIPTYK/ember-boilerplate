import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import t from 'ember-intl/helpers/t';

import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import type { Schema } from 'yup';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import InputsValidationComponent from '../inputs/input-validation';

export interface FormsRegisterSignature {
  Args: {
    changeset: RegisterChangeset;
    saveFunction: (changeset: RegisterChangeset) => void;
    validationSchema: Schema;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLFormElement;
}

export default class RegisterForm extends Component<FormsRegisterSignature> {
  maskForEuro = {
    mask: 'num €',
    lazy: false,
    blocks: {
      num: {
        mask: Number,
        signed: true,
        scale: 2,
        radix: ',',
        thousandsSeparator: '.',
      },
    },
    overwrite: true,
  };

  <template>
    <TpkForm
      @changeset={{@changeset}}
      @onSubmit={{@saveFunction}}
      @validationSchema={{@validationSchema}}
      data-test-form="register"
      class="px-4 py-8 mt-8 bg-white rounded-lg shadow sm:px-10 sm:mx-auto w-full sm:max-w-xl lg:max-w-4xl grid grid-cols-12 gap-x-6 gap-y-4"
      ...attributes
    >
      <InputsValidationComponent
        class="form-control col-span-12 lg:col-span-6"
        @changeset={{@changeset}}
        @label={{t "components.forms.register.last_name"}}
        @validationField="lastName"
        @labelClass="label"
        @inputClass="input"
        data-test-input="lastName"
      />
      <InputsValidationComponent
        class="form-control col-span-12 lg:col-span-6"
        @changeset={{@changeset}}
        @label={{t "components.forms.register.first_name"}}
        @validationField="firstName"
        @labelClass="label"
        @inputClass="input"
        data-test-input="firstName"
      />
      <InputsValidationComponent
        class="form-control col-span-12 lg:col-span-6"
        @changeset={{@changeset}}
        @label={{t "components.forms.register.email"}}
        @validationField="email"
        @labelClass="label"
        @inputClass="input"
        data-test-input="email"
      />
      <InputsValidationComponent
        class="form-control col-span-12 lg:col-span-6"
        @changeset={{@changeset}}
        @label={{t "components.forms.register.phone"}}
        @validationField="phone"
        @mask="+30 000000000"
        @maskOptions={{hash lazy=false}}
        @labelClass="label"
        @inputClass="input"
        data-test-input="phone"
      />
      <InputsValidationComponent
        class="form-control col-span-12 lg:col-span-6"
        @changeset={{@changeset}}
        @label={{t "components.forms.register.password"}}
        @validationField="password"
        @labelClass="label"
        @inputClass="input"
        @type="password"
        data-test-input="password"
      />
      <InputsValidationComponent
        class="form-control col-span-12 lg:col-span-6"
        @changeset={{@changeset}}
        @label={{t "components.forms.register.confirm_password"}}
        @validationField="confirmPassword"
        @labelClass="label"
        @inputClass="input"
        @type="password"
        data-test-input="confirmPassword"
      />
      <InputsValidationComponent
        class="form-control col-span-6 lg:col-span-6"
        @changeset={{@changeset}}
        @label={{t "components.forms.register.gift"}}
        @validationField="gift"
        @mask="Number €"
        @maskOptions={{this.maskForEuro}}
        @unmaskValue={{true}}
        @labelClass="label"
        @inputClass="input"
        data-test-input="gift"
      />
      <button data-test-submit type="submit" class="btn col-span-12">
        <span>
          {{t "global.submit"}}
        </span>
      </button>
    </TpkForm>
  </template>
}
