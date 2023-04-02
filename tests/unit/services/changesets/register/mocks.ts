// no assertions in mocks !
import { rest } from 'msw';

export const successHandle = rest.post(
  'http://localhost:8080/api/v1/users',
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          attributes: {
            password: null,
          },
          type: 'users',
          id: '1',
        },
      })
    );
  }
);

export const failHandle = rest.post(
  'http://localhost:8080/api/v1/users',
  async (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({
        errors: [],
      })
    );
  }
);
