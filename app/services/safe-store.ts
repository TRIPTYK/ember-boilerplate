import type { Future, StructuredDataDocument } from "@ember-data/request";
import type { StoreRequestInput } from "@ember-data/store";
import type Store from "@ember-data/store";
import {service} from "@ember/service";
import Service from "@ember/service";
import { toResult } from "ember-boilerplate/utils/result-utils";
import type Result from "true-myth/result";

export default class SafeStore extends Service {
  @service declare store: Store;

  request<RT, T = unknown>(requestConfig: StoreRequestInput<T, RT>): Promise<Result<StructuredDataDocument<RT>, AggregateError>> {
    return toResult(this.store.request(requestConfig), [AggregateError]);
  }
}
