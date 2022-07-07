import Service from '@ember/service';
import type { EntityServiceInterface } from 'ember-boilerplate/interfaces/entity-service.interface';
import type UserModel from 'ember-boilerplate/models/user';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';

export default class UserService
  extends Service
  implements EntityServiceInterface<UserModel, {}>
{
  emptyChangeset():
    | TypedBufferedChangeset<{}>
    | Promise<TypedBufferedChangeset<{}>> {
    throw new Error('Method not implemented.');
  }
  changesetFrom():
    | TypedBufferedChangeset<{}>
    | Promise<TypedBufferedChangeset<{}>> {
    throw new Error('Method not implemented.');
  }
  saveChangeset(
    // eslint-disable-next-line no-unused-vars
    _changeset: TypedBufferedChangeset<{}>
  ): UserModel | Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
}
