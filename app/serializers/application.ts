import JSONAPISerializer from '@ember-data/serializer/json-api';
import type { Snapshot } from '@ember-data/store';

export default class Application extends JSONAPISerializer {
  serializeAttribute(
    snapshot: Snapshot,
    json: Record<string, unknown>,
    key: string,
    attributes: Record<string, unknown>
  ) {
    if (snapshot.record.get('isNew') || snapshot.changedAttributes()[key]) {
      super.serializeAttribute(snapshot, json, key, attributes);
    }
  }

  keyForAttribute(key: string) {
    return key;
  }

  keyForRelationship(key: string) {
    return key;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    application: Application;
  }
}
