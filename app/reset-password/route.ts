import Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import type SessionService from 'ember-boilerplate/services/session';

export interface ResetPasswordRouteParams {
  token?: string;
}

export default class ResetPasswordRoute extends Route {
  @service declare session: SessionService;
  @service declare router: RouterService;

  beforeModel(tr: Transition) {
    this.session.invalidate();
    /**
     * No token query param, denied
     */
    if (!tr.to?.queryParams['token']) {
      this.router.transitionTo('login');
    }
  }

  model({ token }: ResetPasswordRouteParams) {
    return { token };
  }
}
