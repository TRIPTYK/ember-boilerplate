import type { Changeset } from 'ember-immer-changeset';
import type { Promisable } from 'type-fest';

export interface ChangesetService<T extends Changeset> {
  save(changeset: T): Promisable<unknown>;
}
