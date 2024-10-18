import { setBuildURLConfig } from '@ember-data/request-utils';
import Application from '@ember/application';

import config from 'ember-boilerplate/config/environment';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

setBuildURLConfig({
  host: config.host,
  namespace: config.namespace,
});

loadInitializers(App, config.modulePrefix);

