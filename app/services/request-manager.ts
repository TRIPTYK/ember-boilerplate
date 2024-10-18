import RequestManager from "@ember-data/request";
import { setOwner } from "@ember/owner";
import { getOwner } from "@ember/owner";
import AuthHandler from "./auth-handler";
import Fetch from "@ember-data/request/fetch";

export default class extends RequestManager {
  constructor(args: {}) {
    super(args);
    const authHandler = new AuthHandler();
    setOwner(authHandler, getOwner(this)!);
    this.use([authHandler, Fetch]);
  }
}
