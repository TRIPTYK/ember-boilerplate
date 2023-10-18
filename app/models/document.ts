import Model, { attr, belongsTo } from '@ember-data/model';

import type UserModel from './user';

export default class DocumentModel extends Model {
  @attr() declare filename: string;
  @attr() declare originalName: string;
  @attr() declare path: string;
  @attr() declare mimetype: string;
  @attr() declare size: number;
  @attr('date') declare updatedAt: Date;
  @attr('date') declare createdAt: Date;

  @belongsTo('user') declare user: UserModel;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    document: DocumentModel;
  }
}
