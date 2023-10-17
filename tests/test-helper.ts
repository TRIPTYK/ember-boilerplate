import 'qunit-dom';
import './helpers/flash-message';

import { setApplication } from '@ember/test-helpers';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

import Application from 'ember-boilerplate/app';
import config from 'ember-boilerplate/config/environment';

import {
  forceModulesToBeLoaded,
  sendCoverage,
  // @ts-expect-error no types
} from 'ember-cli-code-coverage/test-support';
// @ts-expect-error no types
import start from 'ember-exam/test-support/start';

import { setupWorker, stopWorker } from './worker';

QUnit.begin(() => {
  return setupWorker();
});

QUnit.done(async function () {
  forceModulesToBeLoaded();
  await sendCoverage();
  stopWorker();
});

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start({
  setupTestIsolationValidation: true,
});
