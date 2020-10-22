import Controller from '@ember/controller';
import {action} from "@ember/object";
import { inject as service } from '@ember/service';

export default class Application extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service session!: any;

  @action
  logout() {
    this.session.invalidate();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
