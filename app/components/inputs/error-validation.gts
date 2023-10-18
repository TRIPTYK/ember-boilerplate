import Component from '@glimmer/component';
import { service } from '@ember/service';

import type { ValidationError } from 'ember-immer-changeset';
import type { IntlService } from 'ember-intl';

export interface InputsErrorValidationSignature {
  Args: {
    errors: Record<string, unknown>[];
  };
  Element: HTMLElement;
}

export default class InputsErrorValidation extends Component<InputsErrorValidationSignature> {
  @service declare intl: IntlService;

  formatMessage = (error: unknown) => {
    return this.intl.t((error as ValidationError).message ?? '');
  };

  <template>
    <aside ...attributes>
      {{#each @errors as |error|}}
        <span>
          {{this.formatMessage error}}
        </span>
      {{/each}}
    </aside>
  </template>
}
