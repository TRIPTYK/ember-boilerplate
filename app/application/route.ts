import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type CurrentUserService from 'ember-boilerplate/services/current-user';
import type IntlService from 'ember-intl/services/intl';
import type SessionService from 'ember-simple-auth/services/session';
import { registerDestructor } from '@ember/destroyable';
import config from 'ember-boilerplate/config/environment';

export default class Application extends Route {
  @service declare session: SessionService;
  @service declare intl: IntlService;
  @service declare currentUser: CurrentUserService;

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
  // @ts-expect-error
  let { worker } = await import('/mocks/index.js');
  await worker.start();
  registerDestructor(context, () => worker.stop());
}
