/* eslint-disable unicorn/filename-case */
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

interface Pages<%= classifiedModuleName %>IndexArgs {}

export default class Pages<%= classifiedModuleName %>Index extends Component<Pages<%= classifiedModuleName %>IndexArgs> {
  @service declare router: RouterService;
  @service declare flashMessages: FlashMessageService;
}