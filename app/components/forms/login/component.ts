import type { BaseFormArgs } from 'ember-form-changeset-validations';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsLoginDTO {
  email: string;
  password: string;
}

interface FormsLoginArgs extends BaseFormArgs<FormsLoginDTO> {}

export default class FormsLogin extends BaseForm<
  FormsLoginArgs,
  FormsLoginDTO
> {}
