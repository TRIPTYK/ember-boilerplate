import Model, { attr } from '@ember-data/model';
import { ResourceType } from '@warp-drive/core-types/symbols';

export default class UserModel extends Model {
  @attr('string') declare email: string;
  @attr('string') declare firstName: string;
  @attr('string') declare lastName: string;
  @attr('string') declare phone: string;
  @attr('string') declare role: string;
  @attr('string') declare password: string;

  [ResourceType] = 'user' as const;
}
