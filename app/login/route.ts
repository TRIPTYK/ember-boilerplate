import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';

export default class Login extends Route {
  @inject declare session: SessionService;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }
}
