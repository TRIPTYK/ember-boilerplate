import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr() declare email: string;
  @attr() declare firstName: string;
  @attr() declare lastName: string;
  @attr() declare phone: string;
  @attr() declare role: string;
  @attr() declare password: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: UserModel;
  }
}
