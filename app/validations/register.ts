import type { RegisterDTO } from 'ember-boilerplate/changesets/register';
import {
  validateConfirmation,
  validateFormat,
  validatePresence,
} from 'ember-changeset-validations/validators';

const formsRegisterValidation = {
  firstName: [
    validatePresence({
      presence: true,
      message: 'validations.firstName.required',
    }),
  ],
  lastName: [
    validatePresence({
      presence: true,
      message: 'validations.lastName.required',
    }),
  ],
  phone: [
    validatePresence({
      presence: true,
      message: 'validations.phone.required',
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
      message: 'validations.confirm_password.required',
    }),
    validateConfirmation({
      on: 'password',
      message: 'validations.confirm_password.not_matching',
    }),
  ],
} as Record<keyof RegisterDTO, unknown>;

export default formsRegisterValidation;
