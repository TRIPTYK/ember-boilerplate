import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type SessionService from 'ember-simple-auth/services/session';

export default class LoginRoute extends Route {
  @service declare session: SessionService;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }
}
