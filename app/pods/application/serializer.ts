import { ObjectLiteral } from 'ember-boilerplate/types/global.types';
import DS from 'ember-data';

export default class Application extends DS.JSONAPISerializer.extend({
}) {
  serializeAttribute(snapshot: DS.Snapshot, json: ObjectLiteral, key: string, attributes: ObjectLiteral) {    
    if (snapshot.record.get('isNew') || snapshot.changedAttributes()[key]) {
      super.serializeAttribute(snapshot, json, key, attributes);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    'application': Application;
  }
}
