import type { SetupWorker } from 'msw';
import { rest } from 'msw';

export function fetchWorker(worker: SetupWorker) {
  worker.use(
    rest.get('http://localhost:8080/api/v1/not-found', (_req, res, ctx) => {
      return res(ctx.status(404), ctx.json({}));
    }),
    rest.get('http://localhost:8080/api/v1/users', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    })
  );
  worker.start();
}
