import Service from '@ember/service';
import type Store from '@ember-data/store';
import type Transition from '@ember/routing/-private/transition';

declare module 'ember-simple-auth/services/session' {
  export default class SessionService extends Service {
    isAuthenticated: boolean;
    data: {
      authenticated: {
        accessToken: string;
        refreshToken: string;
      };
    };
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
