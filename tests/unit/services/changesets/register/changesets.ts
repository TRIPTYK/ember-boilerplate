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
  isFree: true,
  status: 'employee',
  time: new Date(2022, 0, 1, 22, 30, 0),
  period: [new Date(2022, 0, 1, 22, 30, 0), new Date(2023, 0, 1, 22, 30, 0)],
  cv: null,
  confirmPassword: '123',
} satisfies RegisterDTO;
