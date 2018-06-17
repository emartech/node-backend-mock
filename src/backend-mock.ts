import { Host, Path, Query, StatusCode, Body, InterceptorDescription } from './interceptor-description';
import { InterceptorDescriptionRegistry } from './interceptor-description-registry';
import { registerInterceptor } from './register-interceptor';
import { BackendMockError } from './backend-mock-error';
import { isEmpty, not } from './utils';

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

  private _registry: InterceptorDescriptionRegistry;
  private _host: Host;

  constructor(host: Host) {
    this._registry = new InterceptorDescriptionRegistry();
    this._host = host;
  }

  public whenGET({ path = '/', query = {} }: RequestOptions = {}): BackendMock {
    this._registry.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('GET')
        .setPath(path)
        .setQuery(query));

    return this;
  }

  public whenPOST({ path = '/', query = {}, body = {} }: RequestOptions = {}): BackendMock {
    this._registry.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('POST')
        .setPath(path)
        .setQuery(query)
        .setRequestBody(body));

    return this;
  }

  public whenPUT({ path = '/', query = {}, body = {} }: RequestOptions = {}): BackendMock {
    this._registry.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('PUT')
        .setPath(path)
        .setQuery(query)
        .setRequestBody(body));

    return this;
  }

  public whenPATCH({ path = '/', query = {}, body = {} }: RequestOptions = {}): BackendMock {
    this._registry.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('PATCH')
        .setPath(path)
        .setQuery(query)
        .setRequestBody(body));

    return this;
  }

  public whenDELETE({ path = '/', query = {} }: RequestOptions = {}): BackendMock {
    this._registry.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('DELETE')
        .setPath(path)
        .setQuery(query));

    return this;
  }

  public whenHEAD({ path = '/', query = {} }: RequestOptions = {}): BackendMock {
    this._registry.addDescription(
      InterceptorDescription
        .createFor(this._host)
        .setMethod('HEAD')
        .setPath(path)
        .setQuery(query));

    return this;
  }

  public respondWith({ statusCode = 200, body = {} }: ResponseOptions = {}): void {
    for (const { index, description } of this._registry.getUnregistereds()) {
      registerInterceptor(
        description
          .setResponseStatusCode(statusCode)
          .setResponseBody(body));

      this._registry.registerDescription(index);
    }
  }

  public clean(): void {
    const pendingInterceptors = this.getPendingInterceptors();

    this._registry.clear();
    nock.cleanAll();

    if (not(isEmpty(pendingInterceptors))) {
      throw new BackendMockError(pendingInterceptors);
    }
  }

  private getPendingInterceptors(): string[] {
    if (nock.isDone()) return [];
    return nock.pendingMocks();
  }

}
