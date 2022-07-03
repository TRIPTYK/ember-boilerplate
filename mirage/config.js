import { Response } from 'miragejs';

import {
  discoverEmberDataModels,
  applyEmberDataSerializers,
} from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    urlPrefix: 'http://localhost:8080',
    namespace: 'api/v1',
    models: { ...discoverEmberDataModels(), ...config.models },
    serializers: applyEmberDataSerializers(config.serializers),
    routes,
  };

  return createServer(finalConfig);
}

function routes() {
  this.get('/users');

  this.get('/users/profile', (schema) => {
    return schema.users.find(1);
  });

  this.get('/not-found', () => {
    return new Response(404, {}, {});
  });

  this.post('/auth/login', (_, request) => {
    const body = JSON.parse(request.requestBody);
    if (body.password === '123' && body.email === 'dev@triptyk.eu') {
      return new Response(
        200,
        {},
        {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0Ijo1MDg2MjM5MDIyfQ.drnymZMDGW_JPV04DVBwKDY2KZpt8kuaLVf__fGmDKo',
          refreshToken: '123',
        }
      );
    }
    return new Response(417, {}, { message: 'Invalid username or password' });
  });
}
