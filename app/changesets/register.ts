import { ImmerChangeset } from 'ember-immer-changeset';

export interface RegisterDTO {
  id?: string;
  firstName: string;
  lastName: string;
  category: string | null;
  birthDate: Date | null;
  phone: string;
  email: string;
  gift: number;
  password: string;
  confirmPassword?: string;
  isFree: boolean;
  period: Date[] | null;
  time: Date | null;
  status: string | null;
  cv: File | null;
}

export class RegisterChangeset extends ImmerChangeset<RegisterDTO> {}
