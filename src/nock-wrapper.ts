import { Interceptor } from './interceptor';
import { matchObjects } from './utils';

import nock from 'nock';

export { Options } from 'nock';

export class NockWrapper {

  public registerInterceptor({ host, settings, requestOptions, responseOptions }: Interceptor): void {
    nock(host, settings)
      .intercept(requestOptions.path, requestOptions.method, matchObjects(requestOptions.body))
      .query(matchObjects(requestOptions.query))
      .times(responseOptions.repeat)
      .reply(responseOptions.statusCode, responseOptions.body);
  }

  public releaseInterceptors(): void {
    nock.cleanAll();
  }

  public getPendingInterceptors(): string[] {
    if (nock.isDone()) return [];
    return nock.pendingMocks();
  }

}
