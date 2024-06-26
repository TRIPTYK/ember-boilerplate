import { http,HttpResponse } from 'msw';

export const usersHandlers= [
  http.post('http://localhost:8080/api/v1/auth/login', () => {
    return HttpResponse.json(
      {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTE2MjAzOTAyMn0.wuD_2Nd34saGzi764Zj8FGZVQOYgePwpcWjEoZ41qI4',
        refreshToken: '123',
      },
    );
  }),
  http.get('http://localhost:8080/api/v1/users/profile', () => {
    return HttpResponse.json({
        data: {
          id: '1',
          type: 'user',
          attributes: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            role: '',
          }
        },
      });
  }),
  http.get('http://localhost:8080/api/v1/users', () => {
    return HttpResponse.json({
        data: [],
      });
    }),
  http.post('http://localhost:8080/api/v1/users', () => {
    return HttpResponse.json({
      data: {
        attributes: {},
        type: 'user',
        id: Math.floor(Math.random() * 1000).toString(),
      }
    });
  })
];
