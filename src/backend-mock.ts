import { Host, Path, StatusCode, Body, InterceptorDescription } from './interceptor-description';
import { registerInterceptor } from './register-interceptor';
import { BackendMockError } from './backend-mock-error';
import { unique } from './utils';

import nock from 'nock';

export interface RequestOptions {
  path?: Path;
}

export interface ResponseOptions {
  statusCode?: StatusCode;
  body?: Body;
}

export class BackendMock {

  public static create({ host }: { host: Host }): BackendMock {
    return new BackendMock(host);
  }

  private _host: Host;
  private _descriptions: InterceptorDescription[] = [];

  constructor(host: Host) {
    this._host = host;
  }

  public whenGET({ path = '/' }: RequestOptions = {}): BackendMock {
    this.addDescription(
      InterceptorDescription
        .create({ host: this._host })
        .setMethod('GET')
        .setPath(path));

    return this;
  }

  public whenPOST({ path = '/' }: RequestOptions = {}): BackendMock {
    this.addDescription(
      InterceptorDescription
        .create({ host: this._host })
        .setMethod('POST')
        .setPath(path));

    return this;
  }

  public respondWith({ statusCode = 200, body = {} }: ResponseOptions = {}): void {
    for (const description of this._descriptions) {
      registerInterceptor(
        description
          .setResponseStatusCode(statusCode)
          .setResponseBody(body));
    }
  }

  public clean(): void {
    const pendingInterceptors = this.getPendingInterceptors();

    this._descriptions = [];
    nock.cleanAll();

    if (pendingInterceptors.length !== 0) {
      throw new BackendMockError(pendingInterceptors);
    }
  }

  private addDescription(description: InterceptorDescription): void {
    this._descriptions = [...this._descriptions, description];
  }

  private getPendingInterceptors(): string[] {
    if (nock.isDone()) return [];
    return unique(nock.pendingMocks());
  }

}
