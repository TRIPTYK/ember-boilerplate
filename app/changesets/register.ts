import { ExtendedChangeset } from 'ember-form-changeset-validations/changeset/extended-changeset';

export interface RegisterDTO {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gift: number;
  password: string;
  confirmPassword?: string;
}

export class RegisterChangeset extends ExtendedChangeset<RegisterDTO> {}
