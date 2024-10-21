import { ImmerChangeset } from 'ember-immer-changeset';

export interface RegisterDTO {
  id?: string;
  firstName: string;
  lastName: string;
  category: string;
  birthDate?: Date;
  phone: string;
  email: string;
  gift: number;
  password: string;
  confirmPassword?: string;
}

export class RegisterChangeset extends ImmerChangeset<RegisterDTO> {}
