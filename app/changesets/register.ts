import { ExtendedChangeset } from 'ember-form-changeset-validations/changeset/extended-changeset';

export interface RegisterDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export class RegisterChangeset extends ExtendedChangeset<RegisterDTO> {}
