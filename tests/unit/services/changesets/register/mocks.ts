import { http,HttpResponse } from 'msw';

export const successHandle = http.post(
  'http://localhost:8080/api/v1/users',
  () => {
    return HttpResponse.json({
        data: {
          attributes: {
            password: null,
          },
          type: 'users',
          id: '1',
        },
      })
  }
);

export const failHandle = http.post(
  'http://localhost:8080/api/v1/users',
  () => {
    return HttpResponse.json({
        errors: [],
    },
      {
        status: 400
      }
  );
  }
);
