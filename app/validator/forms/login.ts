import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  email: [validatePresence(true)],
  password: [validatePresence(true)],
};
