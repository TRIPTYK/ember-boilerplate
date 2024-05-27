import { buildBaseURL } from '@ember-data/request-utils';
import type { RequestInfo } from '@warp-drive/core-types/request';
import { pluralize } from './utils';

export function queryAll(type: string): RequestInfo {
  const url = buildBaseURL({
    op: 'findMany',
    identifiers: [],
    resourcePath: pluralize(type),
  });

  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  return {
    url,
    headers,
    method: 'GET',
    op: '',
  } satisfies RequestInfo;
}
