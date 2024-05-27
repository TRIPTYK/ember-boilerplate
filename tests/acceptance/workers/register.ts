import { http,HttpResponse } from 'msw';

import type { SetupWorker } from 'msw/browser';

export async function registerWorker(worker: SetupWorker) {
  worker.use(
    http.post('http://localhost:8080/api/v1/users', () => {
      return HttpResponse.json(({
        data : {
          id: '1',
          type: 'user',
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
              status: '400',
              title: 'Bad Request',
              detail: 'Username is too short',
              source: {
                pointer: '/data/attributes/password',
              },
            }
          ],
        }, { status: 400 });
      }));
  await worker.start();
}
