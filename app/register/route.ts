import Route from '@ember/routing/route';

export interface RegisterRouteParams {}

export type RegisterRouteModel = Resolved<ReturnType<RegisterRoute['model']>>;

export default class RegisterRoute extends Route {
  model(_params: RegisterRouteParams) {
    return {};
  }
}
