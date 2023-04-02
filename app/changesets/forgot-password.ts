import { ExtendedChangeset } from 'ember-form-changeset-validations';

export interface ForgotPasswordDTO {
  email: string;
}

export class ForgotPasswordChangeset extends ExtendedChangeset<ForgotPasswordDTO> {}
