import Model, { attr, belongsTo } from '@ember-data/model';

import type UserModel from './user';
import { ResourceType } from '@warp-drive/core-types/symbols';

export default class DocumentModel extends Model {
  @attr() declare filename: string;
  @attr() declare originalName: string;
  @attr() declare path: string;
  @attr() declare mimetype: string;
  @attr() declare size: number;
  @attr('date') declare updatedAt: Date;
  @attr('date') declare createdAt: Date;

  @belongsTo('user', {
    async: false,
    inverse: 'documents',
  }) declare user: UserModel;

  [ResourceType] = 'document' as const;
}
