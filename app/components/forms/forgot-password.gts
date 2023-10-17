import { TOC } from '@ember/component/template-only';
import YupForm from './yup-form';
import { Schema } from 'yup';
import { ImmerChangeset } from 'ember-immer-changeset';
import { InputsValidationComponent } from 'ember-boilerplate/components/inputs/input-validation';
import t from 'ember-intl/helpers/t';
import { LinkTo } from '@ember/routing';

export interface FormsForgotPasswordSignature {
  Args: {
    saveFunction: (changeset: any) => void;
    changeset: ImmerChangeset;
    validationSchema: Schema;
  },
  Element: HTMLFormElement;
}

const FormsForgotPassword: TOC<FormsForgotPasswordSignature> = <template>
  <YupForm
    class="px-4 py-8 mt-8 bg-white shadow space-y-6 sm:rounded-lg sm:px-10 sm:mx-auto sm:w-full sm:max-w-md"
    data-test-form="forgot-password"
    @onSubmit={{@saveFunction}}
    @changeset={{@changeset}}
    @validationSchema={{@validationSchema}}
    ...attributes
    >
    <InputsValidationComponent
      class="input_block"
      @label={{t "components.forms.forgot-password.email"}}
      @changeset={{@changeset}}
      @validationField="email"
      data-test-input="email"
    />
    <div class="flex flex-col w-full">
      <button data-test-submit type="submit" class="btn">
        <span>
          {{t "components.forms.forgot-password.validate"}}
        </span>
      </button>
      <LinkTo @route="login" class="self-center mt-4 text-center link">
        <span>{{t "components.forms.forgot-password.cancel"}}</span>
      </LinkTo>
    </div>
  </YupForm>
</template>

export default FormsForgotPassword;