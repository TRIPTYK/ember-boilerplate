import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class Application extends JSONAPISerializer {
  serializeAttribute(
    snapshot: any,
    json: Record<string, any>,
    key: string,
    attributes: Record<string, any>
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
