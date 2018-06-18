import { InterceptorDescription } from './interceptor-description';
import { matchObjects } from './utils';

import nock from 'nock';

export { Options } from 'nock';

export class NockWrapper {

  public registerInterceptor(description: InterceptorDescription): void {
    nock(description.host, description.options)
      .intercept(description.path, description.method, matchObjects(description.requestBody))
      .query(matchObjects(description.query))
      .times(description.responseRepeat)
      .reply(description.responseStatusCode, description.responseBody);
  }

  public releaseInterceptors(): void {
    nock.cleanAll();
  }

  public getPendingInterceptors(): string[] {
    if (nock.isDone()) return [];
    return nock.pendingMocks();
  }

}
