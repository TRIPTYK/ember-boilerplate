import EmberRouter from '@embroider/router';
import { extendResolver } from 'ember-can';
import Resolver from 'ember-resolver';
import config from 'ember-boilerplate/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
  Resolver = extendResolver(Resolver);
}

Router.map(function () {
  this.route('404', { path: '/*path' });
  this.route('login');
  this.route('forgot-password');
  this.route('reset-password');
  this.route('register');
});
