// @ts-ignore
import BaseSessionService from 'ember-simple-auth/services/session';
import { inject } from '@ember/service';
import CurrentUser from './current-user';

export default class Session extends BaseSessionService.extend({
  // anything which *must* be merged to prototype here
}) {
  @inject currentUser!: CurrentUser;

  async handleAuthentication(routeAfterAuthentication: any) {
    await super.handleAuthentication(routeAfterAuthentication);
    try {
      await this.currentUser.load();
    } catch (err) {
      // @ts-ignore
      await this.invalidate();
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    session: Session;
  }
}
