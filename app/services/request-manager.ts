import RequestManager, { type Future,type RequestInfo } from "@ember-data/request";
import { setOwner } from "@ember/owner";
import { getOwner } from "@ember/owner";
import AuthHandler from "./auth-handler";
import Fetch from "@ember-data/request/fetch";
import { CacheHandler } from "@ember-data/store/-private";

export default class extends RequestManager {
  constructor(args: {}) {
    super(args);
    const authHandler = new AuthHandler();
    setOwner(authHandler, getOwner(this)!);
    this.useCache(CacheHandler)
    this.use([authHandler, Fetch]);
  }

  request<T = unknown>(request: RequestInfo): Future<T> {
    return super.request(request);
  }
}
