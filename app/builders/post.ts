import { buildBaseURL } from "@ember-data/request-utils";
import type { RequestInfo } from '@warp-drive/core-types/request';
import { pluralize } from "./utils";

export function post(type: string, d: {}): RequestInfo {
  const url = buildBaseURL({
    identifier: {
      type: type,
    },
    op: 'createRecord',
    resourcePath: pluralize(type),
  });

  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  return {
    url: url,
    method: 'POST',
    op: 'create',
    data: d,
    headers,
  } satisfies RequestInfo;
}
