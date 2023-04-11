import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import type ApplicationAdapter from '../../../app/adapters/application';
import { setConfig } from 'ember-boilerplate/utils/get-config';
import config from 'ember-boilerplate/config/environment';

module('Unit | Adapter | application', function (hooks) {
  setupTest(hooks);

  test('It queries record by id', function (assert) {
    setConfig(config);

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
