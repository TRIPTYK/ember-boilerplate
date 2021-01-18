import DS from 'ember-data';

export default class User extends DS.Model.extend({}) {
  @DS.attr() email!: string;
  @DS.attr() firstName!: string;
  @DS.attr() lastName!: string;
  @DS.attr() phone!: string;
  @DS.attr() role!: string;
  @DS.attr() password!: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
