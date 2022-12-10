import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';

/**
 * Add errors to changeset from backend error response
 * Should be JSONAPI compliant error
 */
export function mapChangesetErrors(
  changeset: TypedBufferedChangeset,
  // structure of a generic jsonapi error object
  jsonApiErrors: { status: string; meta: unknown; detail: string }[],
  // optional subkey to add errors to in changeset
  key?: string
) {
  if (!jsonApiErrors) return;

  for (const error of jsonApiErrors) {
    if (error.status === '400') {
      const meta = error.meta as Record<string, unknown>;
      const p = key ? `${key}.${meta['field']}` : `${meta['field']}`;
      const value = changeset.get(p);
      if (value !== undefined) {
        changeset.addError(p, error.detail);
      }
    }
  }
}
