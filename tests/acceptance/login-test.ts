import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import fillIn from '@ember/test-helpers/dom/fill-in';
import click from '@ember/test-helpers/dom/click';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | login', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /login', async function (assert) {
    // @ts-expect-error
    this.server.createList('user', 1);
    await visit('/login');
    await this.pauseTest();
    await fillIn(
      "[data-test-form-login] [data-test-input='email']",
      'dev@triptyk.eu'
    );
    await fillIn("[data-test-form-login] [data-test-input='password']", '123');
    await click('[data-test-form-login] [data-test-submit]');

    assert.strictEqual(currentURL(), '/');
  });
});
