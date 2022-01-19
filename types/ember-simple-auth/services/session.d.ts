/* eslint-disable no-unused-vars */
import Service from '@ember/service';
import Store from '@ember-data/store';
import Transition from '@ember/routing/-private/transition';

declare module 'ember-simple-auth/services/session' {
  export default class SessionService extends Service {
    isAuthenticated: boolean;
    data: unknown;
    store: Store;
    authenticate(...args: unknown[]): Promise<void>;
    invalidate(): Promise<void>;
    requireAuthentication(
      transition: Transition,
      routeOrCallback: string | Function
    ): boolean;
    prohibitAuthentication(routeOrCallback: string | Function): boolean;
    handleAuthentication(routeAfterAuthentication: string): void;
    handleInvalidation(routeAfterInvalidation: string): void;
  }
}
