import type { RegisterDTO } from 'ember-boilerplate/changesets/register';
import {
  validateConfirmation,
  validateFormat,
  validatePresence,
} from 'ember-changeset-validations/validators';

const formsRegisterValidation = {
  name: [
    validatePresence({
      presence: true,
      message: 'validations.name.required',
    }),
  ],
  email: [
    validatePresence({
      presence: true,
      message: 'validations.email.required',
    }),
    validateFormat({
      type: 'email',
      message: 'validations.email.format',
    }),
  ],
  password: [
    validatePresence({
      presence: true,
      message: 'validations.password.required',
    }),
  ],
  confirmPassword: [
    validatePresence({
      presence: true,
      message: 'validations.confirmPassword.required',
    }),
    validateConfirmation({
      on: 'password',
      message: 'validations.confirmPassword.notMatching',
    }),
  ],
} as Record<keyof RegisterDTO, unknown>;

export default formsRegisterValidation;
