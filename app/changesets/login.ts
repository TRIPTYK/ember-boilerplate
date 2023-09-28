import { ImmerChangeset } from 'ember-immer-changeset';

export interface LoginDTO {
  email: string;
  password: string;
}

export class LoginChangeset extends ImmerChangeset<LoginDTO> {}
