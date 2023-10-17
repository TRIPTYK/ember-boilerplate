import { ValidationError } from 'yup';

import type { ValidationError as ChangesetValidationError } from 'ember-immer-changeset';
import type { Schema } from 'yup';

export async function validateAndMapErrors<T extends Schema>(
  schema: T,
  dto: unknown,
): Promise<ChangesetValidationError[]> {
  try {
    await schema.validate(dto, { abortEarly: false });

    return [];
  } catch (e) {
    return applyErrors(e);
  }
}

export async function validateOneAndMapErrors<T extends Schema>(
  path: string,
  schema: T,
  dto: unknown,
): Promise<ChangesetValidationError[]> {
  try {
    await schema.validateAt(dottedPathToJsonPath(path), dto, {
      abortEarly: false,
    });

    return [];
  } catch (e) {
    return applyErrors(e);
  }
}

function applyErrors(e: unknown) {
  if (e instanceof ValidationError) {
    const errs = e.inner.reduce((mergedErrors, e) => {
      let path = jsonPathToDottedPath(e.path ?? '');

      mergedErrors.push({
        message: e.message,
        params: e.params,
        key: path,
        value: e.value,
        originalValue: '',
      });

      return mergedErrors;
    }, [] as ChangesetValidationError[]);

    return errs;
  }

  return [];
}

function jsonPathToDottedPath(e: string) {
  return e.replaceAll('"', '').replace(/(\w+)\[(\d+)\]/g, '$1.$2');
}

function dottedPathToJsonPath(e: string) {
  return e.replaceAll('"', '').replace(/(\w+)\.(\d+)/g, '$1[$2]');
}
