import type { RegisterDTO } from "ember-boilerplate/changesets/register";

export const changesetInitialData = {
  firstName: 'a',
  lastName: 'a',
  phone: 'a',
  email: 'a',
  gift: 5000,
  password: '123',
  birthDate: new Date(),
  category: 'a',
} satisfies RegisterDTO;
