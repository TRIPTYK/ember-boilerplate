import { validatePresence } from 'ember-changeset-validations/validators';

const loginValidation = {
  email: [validatePresence(true)],
  password: [validatePresence(true)],
};

export default loginValidation;
