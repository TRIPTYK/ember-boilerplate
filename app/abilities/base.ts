/* eslint-disable ember/no-computed-properties-in-native-classes */
import { computed } from '@ember/object';
import { service } from '@ember/service';

import { Ability } from 'ember-can';

import type CurrentUserService from 'ember-boilerplate/services/current-user';

export default abstract class BaseAbility extends Ability {
  @service declare currentUser: CurrentUserService;

  @computed('currentUser.user')
  public get user() {
    return this.currentUser.user;
  }
}
