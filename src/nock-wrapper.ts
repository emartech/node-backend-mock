import { matchObjects, map } from './utils';
import { Interceptor } from './interceptor';

import nock, { HttpHeaders } from 'nock';

export { Options } from 'nock';

interface RequestHeaders {
  [key: string]: (headerValue: string) => boolean;
}

export class NockWrapper {

  public registerInterceptor({ host, settings, requestOptions, responseOptions }: Interceptor): void {
    nock(host, { ...settings, reqheaders: this.getRequestHeaders(requestOptions.headers) })
      .intercept(requestOptions.path, requestOptions.method, matchObjects(requestOptions.body))
      .query(matchObjects(requestOptions.query))
      .times(responseOptions.repeat)
      .reply(responseOptions.statusCode, responseOptions.body, responseOptions.headers as HttpHeaders);
  }

  public releaseInterceptors(): void {
    nock.cleanAll();
  }

  public getPendingInterceptors(): string[] {
    if (nock.isDone()) return [];
    return nock.pendingMocks();
  }

  private getRequestHeaders(headers: object): RequestHeaders {
    return map(headers, (expectedValue: string) => (value: string) => expectedValue === value);
  }

}
