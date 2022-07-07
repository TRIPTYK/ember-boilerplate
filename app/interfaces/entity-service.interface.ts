import type emberData__model from '@ember-data/model';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';

export interface EntityServiceInterface<
  Entity extends emberData__model,
  DTO extends Record<string, unknown>
> {
  /**
   * Creates an empty changeset
   */
  emptyChangeset(
    ...something: unknown[]
  ): Promise<TypedBufferedChangeset<DTO>> | TypedBufferedChangeset<DTO>;
  /**
   * Creates a changeset of Entity from something
   */
  changesetFrom(
    ...something: unknown[]
  ): Promise<TypedBufferedChangeset<DTO>> | TypedBufferedChangeset<DTO>;
  /**
   * Saves a changeset and returns an Entity
   */
  saveChangeset(
    changeset: TypedBufferedChangeset<DTO>,
    ...something: unknown[]
  ): Promise<Entity> | Entity;
}
