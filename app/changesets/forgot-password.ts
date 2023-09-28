import { ImmerChangeset } from 'ember-immer-changeset';

export interface ForgotPasswordDTO {
  email: string;
}

export class ForgotPasswordChangeset extends ImmerChangeset<ForgotPasswordDTO> {}
