import { validatePresence } from 'ember-changeset-validations/validators';

const forgotPasswordValidation = {
  email: [
    validatePresence({
      presence: true,
      message: 'login.emailMissing',
    }),
  ],
};

export default forgotPasswordValidation;
