import { buildBaseURL } from '@ember-data/request-utils';
import type { RequestInfo } from '@warp-drive/core-types/request';
import { pluralize } from './utils';

export function query(type: string): RequestInfo {
  const url = buildBaseURL({
    op: 'query',
    identifier: {
      type: type,
    },
    resourcePath: pluralize(type),
  });

  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  return {
    url,
    headers,
    method: 'GET',
    op: 'query',
  } satisfies RequestInfo;
}
