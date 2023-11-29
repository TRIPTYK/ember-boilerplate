import { setupWorker } from 'msw/browser';

export default (handlers) => setupWorker(...handlers);
