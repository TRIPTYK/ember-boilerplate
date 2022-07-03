import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import type { MirageTestContext } from 'ember-cli-mirage/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { loginPage } from '../pages/login';

module('Acceptance | login', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test<MirageTestContext>('visiting /login', async function (assert) {
    this.server.createList('user', 1);

    await loginPage.visit().email('dev@triptyk.eu').password('123').submit();

    assert.strictEqual(currentURL(), '/');
  });
});
