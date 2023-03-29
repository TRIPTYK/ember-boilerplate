import { ExtendedChangeset } from 'ember-form-changeset-validations';

export interface LoginDTO {
  email: string;
  password: string;
}

export class LoginChangeset extends ExtendedChangeset<LoginDTO> {}
