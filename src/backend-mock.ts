import { Host, Path, Query, StatusCode, Body, InterceptorDescription } from './interceptor-description';
import { registerInterceptor } from './register-interceptor';
import { BackendMockError } from './backend-mock-error';
import { isEmpty, not, unique } from './utils';

import nock from 'nock';

export interface RequestOptions {
  path?: Path;
  query?: Query;
  body?: Body;
}

export interface ResponseOptions {
  statusCode?: StatusCode;
  body?: Body;
}

export class BackendMock {

  public static createFor(host: Host): BackendMock {
    return new BackendMock(host);
  }

  private _host: Host;
  private _descriptions: InterceptorDescription[] = [];

  constructor(host: Host) {
    this._host = host;
  }

  public whenGET({ path = '/', query = {} }: RequestOptions = {}): BackendMock {
    this.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('GET')
        .setPath(path)
        .setQuery(query));

    return this;
  }

  public whenPOST({ path = '/', query = {}, body = {} }: RequestOptions = {}): BackendMock {
    this.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('POST')
        .setPath(path)
        .setQuery(query)
        .setRequestBody(body));

    return this;
  }

  public whenPUT({ path = '/', query = {}, body = {} }: RequestOptions = {}): BackendMock {
    this.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('PUT')
        .setPath(path)
        .setQuery(query)
        .setRequestBody(body));

    return this;
  }

  public whenPATCH({ path = '/', query = {}, body = {} }: RequestOptions = {}): BackendMock {
    this.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('PATCH')
        .setPath(path)
        .setQuery(query)
        .setRequestBody(body));

    return this;
  }

  public whenDELETE({ path = '/', query = {} }: RequestOptions = {}): BackendMock {
    this.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('DELETE')
        .setPath(path)
        .setQuery(query));

    return this;
  }

  public whenHEAD({ path = '/', query = {} }: RequestOptions = {}): BackendMock {
    this.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('HEAD')
        .setPath(path)
        .setQuery(query));

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

    if (not(isEmpty(pendingInterceptors))) {
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
