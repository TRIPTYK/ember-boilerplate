import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class NotFound extends Controller {
  @action
  comeback() {
    window.history.back();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    '404': NotFound;
  }
}
