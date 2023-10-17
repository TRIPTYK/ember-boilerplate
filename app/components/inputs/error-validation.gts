import { get } from '@ember/helper';

import t from 'ember-intl/helpers/t';

import type { TOC } from '@ember/component/template-only';

export interface InputsErrorValidationSignature {
  Args: {
    errors: {
      message: string;
      params: {
        [key: string]: unknown;
      };
    }[];
  };
  Element: HTMLElement;
}

const InputsErrorValidation: TOC<InputsErrorValidationSignature> = <template>
  <aside ...attributes>
    {{#each @errors as |error|}}
      <span>
        {{#let (get error 'message') as |message|}}
          {{#if message}}
            {{t message (get error 'params')}}
          {{/if}}
        {{/let}}
      </span>
    {{/each}}
  </aside>
</template>;

export default InputsErrorValidation;
