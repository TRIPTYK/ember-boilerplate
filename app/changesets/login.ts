import { ExtendedChangeset } from 'ember-form-changeset-validations';

export interface FormsLoginDTO {
  email: string;
  password: string;
}

export class LoginChangeset extends ExtendedChangeset<FormsLoginDTO> {}
