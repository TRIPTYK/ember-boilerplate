import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type CurrentUserService from 'ember-boilerplate/services/current-user';
import type IntlService from 'ember-intl/services/intl';
import type SessionService from 'ember-simple-auth/services/session';

export default class Application extends Route {
  @service declare session: SessionService;
  @service declare intl: IntlService;
  @service declare currentUser: CurrentUserService;

  async beforeModel() {
    this.intl.setLocale(['fr-fr']);
    await this.session.setup();
    await this.currentUser.load();
  }
}
