import { http,HttpResponse } from 'msw';

import type { SetupWorker } from 'msw/browser';

export async function registerWorker(worker: SetupWorker) {
  worker.use(
    http.post('http://localhost:8080/api/v1/users', () => {
      return HttpResponse.json(({
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
    http.post('http://localhost:8080/api/v1/users', () => {
      return HttpResponse.json({
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
        });
      }));
  await worker.start();
}
