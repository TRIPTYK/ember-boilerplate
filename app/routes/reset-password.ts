import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import type SessionService from 'ember-boilerplate/services/session';

export interface ResetPasswordRouteParams {
  token?: string;
}

export default class ResetPasswordRoute extends Route {
  @service declare session: SessionService;
  @service declare router: RouterService;

  async beforeModel(tr: Transition) {
    await this.session.invalidate();

    /**
     * No token query param, denied
     */
    if (!tr.to?.queryParams['token']) {
      await this.router.transitionTo('login');
    }
  }

  model({ token }: ResetPasswordRouteParams) {
    return { token };
  }
}
