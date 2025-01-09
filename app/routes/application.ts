import { registerDestructor } from '@ember/destroyable';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import config from 'ember-boilerplate/config/environment';
import { usersHandlers } from 'ember-boilerplate/handlers/users';

import type CurrentUserService from 'ember-boilerplate/services/current-user';
import type { IntlService } from 'ember-intl';
import type SessionService from 'ember-simple-auth/services/session';
import { setupWorker } from 'msw/browser';

export default class ApplicationRoute extends Route {
  @service declare session: SessionService;
  @service declare currentUser: CurrentUserService;
  @service declare intl: IntlService;

  async beforeModel() {
    await this.setupMSWForDevelopment();
    this.intl.setLocale(['fr-fr']);
    await this.session.setup();
    await this.currentUser.load();
  }

  private async setupMSWForDevelopment() {
    if (config.environment === 'development') {
      await setupMSW(this);
    }
  }
}

async function setupMSW(context: object) {
  const server = setupWorker(...usersHandlers);

  await server.start();

  registerDestructor(context, () => server.stop());
}
