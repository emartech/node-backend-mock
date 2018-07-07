import { isFunction } from './utils';

/* tslint:disable no-unbound-method */

export class BackendMockError extends Error {

  public constructor(interceptors: string[]) {
    super(getExceptionMessage(interceptors));
    this.name = this.constructor.name;

    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(getExceptionMessage(interceptors))).stack;
    }
  }

}

function getExceptionMessage(interceptors: string[]): string {
  return `There are unresolved interceptors!\n\t${interceptors.join('\n\t')}\n`;
}
