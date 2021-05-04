import { JSONAPISerializer, Snapshot } from '@ember-data/serializer';

export default class Application extends JSONAPISerializer {
  serializeAttribute(
    snapshot: Snapshot,
    json: Record<string, any>,
    key: string,
    attributes: Record<string, any>
  ) {
    if (snapshot.record.get('isNew') || snapshot.changedAttributes()[key]) {
      super.serializeAttribute(snapshot, json, key, attributes);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    application: Application;
  }
}
