import RequestManager, { type Handler,type NextFn,type RequestContext,type RequestInfo } from "@ember-data/request";
import { setOwner } from "@ember/owner";
import { getOwner } from "@ember/owner";
import AuthHandler from "./auth-handler";
import Fetch from "@ember-data/request/fetch";

const TestHandler: Handler = {
  async request<T>(context: RequestContext, next: NextFn<T>) {
    console.log('TestHandler.request', context.request);
    const result = await next(Object.assign({}, context.request));
    console.log('TestHandler.response after fetch', result.response);
    return result;
  },
};


export default class extends RequestManager {
  constructor(args: {}) {
    super(args);
    const authHandler = new AuthHandler();
    setOwner(authHandler, getOwner(this)!);
    this.use([authHandler,TestHandler, Fetch]);
  }
}
