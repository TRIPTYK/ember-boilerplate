/* eslint-disable ember/no-computed-properties-in-native-classes */
import { computed } from '@ember/object';
import { service } from '@ember/service';
import type CurrentUserService from 'ember-boilerplate/services/current-user';
import { Ability } from 'ember-can';

export default abstract class BaseAbility<T = unknown> extends Ability<T> {
  @service declare currentUser: CurrentUserService;

  @computed('currentUser.user')
  public get user() {
    return this.currentUser.user;
  }
}
