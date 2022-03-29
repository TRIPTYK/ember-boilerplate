import BaseSessionService from 'ember-simple-auth/services/session';
import { inject } from '@ember/service';
import type CurrentUser from './current-user';

export default class Session extends BaseSessionService {
  @inject declare currentUser: CurrentUser;

  async handleAuthentication() {
    try {
      await this.currentUser.load();
    } catch (err) {
      /**
       * Does not invalidate with abord error, loading the current user is optional and may be canceled
       * `err instanceof AbortError` is false BTW, we check with the message
       */
      if (err.message === 'Aborted') {
        return;
      }
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
