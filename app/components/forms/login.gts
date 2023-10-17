import Component from '@glimmer/component';
import type { LoginChangeset } from 'ember-boilerplate/changesets/login';
import { InputsValidationComponent } from 'ember-boilerplate/components/inputs/input-validation';
import YupForm from "./yup-form";
import { ImmerChangeset } from 'ember-immer-changeset';
import { Schema } from 'yup';
import { LinkTo } from '@ember/routing';
import t from 'ember-intl/helpers/t';

export interface FormsLoginSignature {
  Args: {
    changeset: LoginChangeset;
    saveFunction: (changeset: ImmerChangeset) => unknown;
    validationSchema: Schema;
  }
}

export default class FormsLogin extends Component<FormsLoginSignature> {
  <template>
    <YupForm
      class="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      @onSubmit={{@saveFunction}}
      @changeset={{@changeset}}
      @validationSchema={{@validationSchema}}
      data-test-form-login
    >
      <InputsValidationComponent
        @label={{t "components.forms.login.email"}}
        @changeset={{@changeset}}
        @validationField="email"
        class="input_block"
        data-test-input="email"
      />
      <InputsValidationComponent
        @label={{t "components.forms.login.password"}}
        @changeset={{@changeset}}
        @validationField="password"
        @type="password"
        class="input_block"
        data-test-input="password"
      />
      <div class="flex items-center justify-between">
        <div class="text-sm">
          <LinkTo
            @route="forgot-password"
            class="font-medium text-primary hover:text-secondary"
          >
            {{t "components.forms.login.forgot_password"}}
          </LinkTo>
        </div>
      </div>
      <div>
        <button data-test-submit type="submit" class="btn">
          <span>
            {{t "components.forms.login.log_in"}}
          </span>
        </button>
      </div>
    </YupForm>
  </template>
}
