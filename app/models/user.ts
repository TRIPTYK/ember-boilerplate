import Model, { attr, hasMany } from '@ember-data/model';
import type DocumentModel from './document';
import { ResourceType } from '@warp-drive/core-types/symbols';

export default class UserModel extends Model {
  @attr('string') declare email: string;
  @attr('string') declare firstName: string;
  @attr('string') declare lastName: string;
  @attr('string') declare phone: string;
  @attr('string') declare role: string;
  @attr('string') declare password: string;
  @hasMany<DocumentModel>('document', {
    async: false,
    inverse: 'user',
  }) declare documents: DocumentModel[];

  [ResourceType] = 'user' as const;
}
