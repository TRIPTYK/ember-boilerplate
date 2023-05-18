import type { ResetPasswordDTO } from 'ember-boilerplate/changesets/reset-password';
import {
  validateConfirmation,
  validatePresence,
} from 'ember-changeset-validations/validators';

// jscpd:ignore-start

const passwordRecoveryValidation = {
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
} as Record<keyof ResetPasswordDTO, unknown>;

// jscpd:ignore-end

export default passwordRecoveryValidation;
