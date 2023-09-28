import { ImmerChangeset } from 'ember-immer-changeset';

export interface ResetPasswordDTO {
  password: string;
  confirmPassword: string;
}

export class ResetPasswordChangeset extends ImmerChangeset<ResetPasswordDTO> {}
