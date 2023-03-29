import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';

interface InputsInputValidationComponentArgs {
  changeset: TypedBufferedChangeset;
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
