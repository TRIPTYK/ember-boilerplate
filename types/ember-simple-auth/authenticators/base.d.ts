import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';

declare module 'ember-simple-auth/authenticators/base' {
  export default class Base extends EmberObject.extend(Evented) {
    // eslint-disable-next-line no-unused-vars
    restore(data: unknown): Promise<unknown>;
    invalidate(): Promise<unknown>;
  }
}
