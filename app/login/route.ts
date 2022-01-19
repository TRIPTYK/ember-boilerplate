import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { Changeset } from 'ember-changeset';
import SessionService from 'ember-simple-auth/services/session';
import lookupValidator from 'ember-changeset-validations';
import LoginValidation from 'ember-boilerplate/validation/forms/login';

export default class Login extends Route {
  @inject declare session: SessionService;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  model() {
    const changeset = Changeset(
      {
        email: '',
        password: '',
      },
      lookupValidator(LoginValidation),
      LoginValidation
    );
    return {
      changeset,
    };
  }
}
