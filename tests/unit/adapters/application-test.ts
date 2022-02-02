import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import type ApplicationAdapter from '../../../app/adapters/application';

module('Unit | Adapter | application', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup(
      'adapter:application'
    ) as ApplicationAdapter;
    const url = adapter.urlForQueryRecord(
      {
        id: 1,
      },
      'user'
    );
    // queryRecord is working
    assert.true(url.endsWith('/1'));
  });
});
