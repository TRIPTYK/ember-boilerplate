import Component from '@glimmer/component';

import type { ValidationError } from 'ember-immer-changeset';
import t from 'ember-intl/helpers/t';

export interface InputsErrorValidationSignature {
  Args: {
    errors: Record<string, unknown>[];
  };
  Element: HTMLElement;
}

export default class InputsErrorValidation extends Component<InputsErrorValidationSignature> {
  formatMessage = (error: unknown) => {
    return (error as ValidationError).message ?? '';
  };

  <template>
    <aside ...attributes>
      {{#each @errors as |error|}}
        <span class="text-red-500">
          {{t (this.formatMessage error)}}
        </span>
      {{/each}}
    </aside>
  </template>
}
