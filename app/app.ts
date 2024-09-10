import { setBuildURLConfig } from '@ember-data/request-utils';
import Application from '@ember/application';
// @ts-expect-error
import initializer from 'ember-simple-auth/initializers/ember-simple-auth';
// @ts-expect-error
import initializerJwt from '@triptyk/ember-simple-auth-token/initializers/simple-auth-token';

import config from 'ember-boilerplate/config/environment';
import Resolver from 'ember-resolver';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

// ember-load-initializers not working anymore, registering manually
function loadInitializers() {
  App.instanceInitializer(initializer);
  App.instanceInitializer(initializerJwt);
}

setBuildURLConfig({
  host: config.host,
  namespace: config.namespace,
});

loadInitializers();
