import {service} from "@ember/service";
import type SessionService from "./session";
import type { NextFn, RequestContext } from "@ember-data/request";

export default class AuthHandler {
  @service declare session: SessionService;

  request<T>(context: RequestContext, next: NextFn<T>) {
    const headers = new Headers(context.request.headers);
    headers.append(
      'Authorization',
      `Bearer ${this.session.data.authenticated.accessToken}`,
    );

    return next(Object.assign({}, context.request, { headers }));
  }
}
