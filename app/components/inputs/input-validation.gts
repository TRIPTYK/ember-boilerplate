import TpkValidationInput from '@triptyk/ember-input-validation/components/tpk-validation-input';
import InputsErrorValidation from 'ember-boilerplate/components/inputs/error-validation';

import type { TOC } from '@ember/component/template-only';
import type { TpkValidationInputComponentSignature } from '@triptyk/ember-input-validation/components/tpk-validation-input';

interface InputsValidationComponentSignature {
  Element: HTMLDivElement;
  Args: TpkValidationInputComponentSignature['Args'] & {
    labelClass?: string;
    mandatory?: boolean;
    label?: string;
    inputClass?: string;
    step?: string;
    placeholder?: string;
  };
  Blocks: {
    default: [];
  };
}

const InputsValidationComponent: TOC<InputsValidationComponentSignature> = <template>
  <TpkValidationInput
    @label={{@label}}
    @onChange={{@onChange}}
    @changeset={{@changeset}}
    @validationField={{@validationField}}
    @type={{@type}}
    @mask={{@mask}}
    @maskOptions={{@maskOptions}}
    @unmaskValue={{@unmaskValue}}
    class={{if @disabled "disabled"}}
    ...attributes
    as |TI|
  >
    <TI.Label class={{@labelClass}}>
      {{@label}}
      {{#if @mandatory}}
        <span class="text-primary">
          *
        </span>
      {{/if}}
    </TI.Label>
    <TI.Input
      step={{@step}}
      disabled={{@disabled}}
      placeholder={{@placeholder}}
      class={{@inputClass}}
      aria-autocomplete="none"
      autocomplete="off"
      autofill="off"
    />
    <InputsErrorValidation @errors={{TI.errors}} />
  </TpkValidationInput>
</template>;

export default InputsValidationComponent;
