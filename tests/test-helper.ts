import 'qunit-dom';
import Application from 'ember-boilerplate/app';
import config from 'ember-boilerplate/config/environment';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import './helpers/flash-message';
import QUnit from 'qunit';
import {
  forceModulesToBeLoaded,
  sendCoverage,
  // @ts-expect-error
} from 'ember-cli-code-coverage/test-support';
import { setupWorker, stopWorker } from './worker';

QUnit.begin(async () => {
  setupWorker();
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
