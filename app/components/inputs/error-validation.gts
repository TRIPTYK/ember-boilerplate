import { TOC } from "@ember/component/template-only";
import { get } from "@ember/helper";
import t from "ember-intl/helpers/t";

export interface InputsErrorValidationSignature {
  Args: {
    errors: (Record<string, any>)[];
  };
  Element: HTMLElement;
}

const InputsErrorValidation: TOC<InputsErrorValidationSignature> = <template>
<aside ...attributes>
  {{#each @errors as |error|}}
    <span>
      {{#let (get error "message") as |message|}}
        {{#if message}}
          {{t message (get error "params")}}
    {{/if}}
      {{/let}}
    </span>
  {{/each}}
</aside>
</template>

export default InputsErrorValidation;
