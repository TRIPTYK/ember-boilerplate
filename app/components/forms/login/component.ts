import { action } from '@ember/object';
import { BaseFormArgs } from 'ember-form-changeset-validations';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsLoginDTO {
  email: string;
  password: string;
}

interface FormsLoginArgs extends BaseFormArgs<FormsLoginDTO> {}

export default class FormsLogin extends BaseForm<
  FormsLoginArgs,
  FormsLoginDTO
> {
  @action changeInput(field: string, e: Event) {
    e.preventDefault();
    this.args.changeset.set(
      field as keyof FormsLoginDTO,
      (e.target as HTMLInputElement)?.value
    );
  }
}
