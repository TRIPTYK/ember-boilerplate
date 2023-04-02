import { rest } from 'msw';

const type = 'users';

export const usersHandlers = [
  rest.post('http://localhost:8080/api/v1/users', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          type,
          id: '123',
          attributes: {},
        },
      })
    );
  }),
];
