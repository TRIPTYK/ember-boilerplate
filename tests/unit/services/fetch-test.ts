import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import type FetchService from 'ember-boilerplate/services/fetch';

module('Unit | Service | fetch', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', async function (assert) {
    let service = this.owner.lookup('service:fetch') as FetchService;
    await service.request('/hello');
    assert.expect(0);
  });
});
