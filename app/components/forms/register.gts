import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import InputsValidationComponent from 'ember-boilerplate/components/inputs/input-validation';
import t from 'ember-intl/helpers/t';

import YupForm from './yup-form';

import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import type { Schema } from 'yup';

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
    <YupForm
      @changeset={{@changeset}}
      @onSubmit={{@saveFunction}}
      @validationSchema={{@validationSchema}}
      data-test-form="register"
      class="px-4 py-8 mt-8 bg-white rounded-lg shadow space-y-6 sm:px-10 sm:mx-auto sm:w-full sm:max-w-xl grid grid-cols-12 gap-x-6 gap-y-4"
      ...attributes
    >
      <InputsValidationComponent
        class="input_block col-span-12"
        @label={{t "components.forms.register.last_name"}}
        @changeset={{@changeset}}
        @validationField="lastName"
        data-test-input="lastName"
      />
      <InputsValidationComponent
        class="input_block col-span-12"
        @label={{t "components.forms.register.first_name"}}
        @changeset={{@changeset}}
        @validationField="firstName"
        data-test-input="firstName"
      />
      <InputsValidationComponent
        class="input_block col-span-12"
        @label={{t "components.forms.register.email"}}
        @changeset={{@changeset}}
        @validationField="email"
        data-test-input="email"
      />
      <InputsValidationComponent
        class="input_block col-span-12"
        @label={{t "components.forms.register.phone"}}
        @changeset={{@changeset}}
        @validationField="phone"
        @mask="+30 000000000"
        @maskOptions={{hash lazy=false}}
        data-test-input="phone"
      />
      <InputsValidationComponent
        class="input_block col-span-12"
        @label={{t "components.forms.register.password"}}
        @changeset={{@changeset}}
        @validationField="password"
        data-test-input="password"
      />
      <InputsValidationComponent
        class="input_block col-span-12"
        @label={{t "components.forms.register.confirm_password"}}
        @changeset={{@changeset}}
        @validationField="confirmPassword"
        data-test-input="confirmPassword"
      />
      <InputsValidationComponent
        class="input_block col-span-6"
        @label={{t "components.forms.register.gift"}}
        @changeset={{@changeset}}
        @validationField="gift"
        @mask="Number €"
        @maskOptions={{this.maskForEuro}}
        @unmaskValue={{true}}
        data-test-input="gift"
      />
      <button data-test-submit type="submit" class="btn col-span-12">
        <span>
          {{t "global.submit"}}
        </span>
      </button>
    </YupForm>
  </template>
}
