import type { SetupWorker } from 'msw';
import { rest } from 'msw';

export async function registerWorker(worker: SetupWorker) {
  worker.use(
    rest.post('http://localhost:8080/api/v1/users', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            type: 'users',
            id: '1',
            attributes: {
              email: 'test@triptyk.eu',
              firstName: 'papa',
              lastName: 'triptyk',
              phone: '+32 498542256',
              role: 'user',
            },
          },
        })
      );
    })
  );
  await worker.start();
}
export async function registerWorkerWithErrors(worker: SetupWorker) {
  worker.use(
    rest.post('http://localhost:8080/api/v1/users', (_req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          errors: [
            {
              status: 400,
              code: 'invalid_request',
              message: 'The request is invalid',
              details: [
                {
                  field: 'email',
                  message: 'email_required',
                },
                {
                  field: 'email',
                  message: 'email_format',
                },
                {
                  field: 'password',
                  message: 'password_too_short',
                },
                {
                  field: 'password',
                  message: 'password_required',
                },
              ],
            },
          ],
        })
      );
    })
  );
  await worker.start();
}
