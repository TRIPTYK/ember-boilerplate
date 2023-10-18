import { setupWorker } from 'msw';

export default (handlers) => setupWorker(...handlers);
