import type { Changeset } from 'ember-form-changeset-validations';
import type { Promisable } from 'type-fest';

export interface ChangesetService<T extends Changeset> {
  save(changeset: T): Promisable<unknown>;
}
