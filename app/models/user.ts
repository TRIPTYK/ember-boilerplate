import Model, { attr, hasMany, type SyncHasMany } from '@ember-data/model';

import type DocumentModel from './document';

export default class UserModel extends Model {
  @attr() declare email: string;
  @attr() declare firstName: string;
  @attr() declare lastName: string;
  @attr() declare phone: string;
  @attr() declare role: string;
  @attr() declare password: string;
  @hasMany('document', {
    async: false,
    inverse: 'user',
  }) declare documents: SyncHasMany<DocumentModel>;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: UserModel;
  }
}
