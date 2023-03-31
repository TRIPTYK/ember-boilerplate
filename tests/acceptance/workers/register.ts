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
