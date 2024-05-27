import { buildBaseURL } from "@ember-data/request-utils";
import type { RequestInfo } from '@warp-drive/core-types/request';
import { pluralize } from "./utils";

export function patch(type: string, d: {
  id: string
  [key: string]: any
}): RequestInfo {
  const url = buildBaseURL({
    identifier: {
      type: type,
      id: d['id'],
    },
    op: 'updateRecord',
    resourcePath: pluralize(type),
  });

  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  return {
    url: url,
    method: 'PATCH',
    op: 'update',
    data: d,
    headers,
  } satisfies RequestInfo;
}
