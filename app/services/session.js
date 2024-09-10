import { service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';

export default class SessionService extends BaseSessionService {
  @service currentUser;

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
