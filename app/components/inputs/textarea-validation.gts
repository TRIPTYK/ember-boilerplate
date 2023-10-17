import TpkValidationTextarea from '@triptyk/ember-input-validation/components/tpk-validation-textarea';
import InputsErrorValidation from 'ember-boilerplate/components/inputs/error-validation';

import type { TOC } from '@ember/component/template-only';
import type { ImmerChangeset } from 'ember-immer-changeset';

export interface TextareaValidationSignature {
  Args: {
    label: string;
    changeset: ImmerChangeset;
    validationField: string;
    disabled: boolean;
    placeholder: string;
    inputClass: string;
    rows: number;
  };
  Element: HTMLDivElement;
}

const InputsTextareaValidation: TOC<TextareaValidationSignature> = <template>
  <TpkValidationTextarea
    @label={{@label}}
    @changeset={{@changeset}}
    @validationField={{@validationField}}
    class={{if @disabled 'disabled'}}
    ...attributes
    as |TI|
  >
    <TI.Label>
      {{@label}}
    </TI.Label>
    <TI.Input
      placeholder={{@placeholder}}
      class={{@inputClass}}
      disabled={{@disabled}}
      rows={{@rows}}
      aria-autocomplete='none'
      autocomplete='off'
      autofill='off'
    />
    <InputsErrorValidation @errors={{TI.errors}} />
  </TpkValidationTextarea>
</template>;

export default InputsTextareaValidation;
