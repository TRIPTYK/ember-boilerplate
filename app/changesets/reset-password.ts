import { ExtendedChangeset } from 'ember-form-changeset-validations';

export interface ResetPasswordDTO {
  password: string;
  confirmPassword: string;
}

export class ResetPasswordChangeset extends ExtendedChangeset<ResetPasswordDTO> {}
