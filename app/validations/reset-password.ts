import {
  validateConfirmation,
  validatePresence,
} from 'ember-changeset-validations/validators';

const passwordRecoveryValidation = {
  password: [
    validatePresence({
      presence: true,
      message: "'password' is required.",
    }),
  ],
  confirmPassword: [
    validatePresence({
      presence: true,
      message: "'confirmPassword' is required.",
    }),
    validateConfirmation({
      on: 'password',
      message: "'confirmPassword' and 'password' must be the same.",
    }),
  ],
};

export default passwordRecoveryValidation;
