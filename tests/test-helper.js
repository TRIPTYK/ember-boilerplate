import Application from 'ember-boilerplate/app';
import config from 'ember-boilerplate/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
