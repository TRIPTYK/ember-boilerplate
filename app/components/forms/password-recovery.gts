import type { TOC } from '@ember/component/template-only';
import type { ResetPasswordChangeset } from 'ember-boilerplate/changesets/reset-password';
import type { Schema } from 'yup';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import t from 'ember-intl/helpers/t';
import InputsValidationComponent from '../inputs/input-validation';

export interface FormsPasswordRecoveryComponentSignature {
  Args: {
    saveFunction: (changeset: ResetPasswordChangeset) => void;
    changeset: ResetPasswordChangeset;
    validationSchema: Schema;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLFormElement;
}

const FormsPasswordRecovery: TOC<FormsPasswordRecoveryComponentSignature> = <template>
  <TpkForm
    class="px-4 py-8 mt-8 bg-white rounded-lg shadow space-y-6 sm:px-10 sm:mx-auto sm:w-full sm:max-w-md"
    @onSubmit={{@saveFunction}}
    @changeset={{@changeset}}
    @validationSchema={{@validationSchema}}
    ...attributes
  >
    <InputsValidationComponent
      @changeset={{@changeset}}
      @label={{t "components.forms.reset-password.new_password"}}
      @validationField="password"
      @labelClass="label"
      @inputClass="input"
      class="form-control"
      data-test-input="password"
    />
    <InputsValidationComponent
      @changeset={{@changeset}}
      @label={{t "components.forms.reset-password.confirm_new_password"}}
      @validationField="confirmPassword"
      @labelClass="label"
      @inputClass="input"
      class="form-control"
      data-test-input="confirmPassword"
    />
    <button data-test-submit type="submit" class="btn">
      <span>
        components.forms.reset-password.validate
      </span>
    </button>
  </TpkForm>
</template>;

export default FormsPasswordRecovery;
