import Model, { attr } from '@ember-data/model';

export default class User extends Model {
  @attr() email!: string;
  @attr() firstName!: string;
  @attr() lastName!: string;
  @attr() phone!: string;
  @attr() role!: string;
  @attr() password!: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
