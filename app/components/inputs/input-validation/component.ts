import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';

interface InputsInputValidationComponentArgs {
  changeset: Changeset;
  validationField: string;
  type: 'number' | 'text' | 'date';
  onChange: (value: string) => unknown;
}

export default class InputsInputValidationComponent extends Component<InputsInputValidationComponentArgs> {
  @action
  onChange(e: string) {
    if (this.args.onChange) {
      return this.args.onChange(e);
    }
    if (this.args.type === 'number') {
      return this.args.changeset.set(this.args.validationField, +e);
    }
    this.args.changeset.set(this.args.validationField, e);
  }
}
