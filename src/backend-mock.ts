import { Host, Path, Query, StatusCode, Body, InterceptorDescription } from './interceptor-description';
import { InterceptorDescriptionRegistry } from './interceptor-description-registry';
import { BackendMockError } from './backend-mock-error';
import { NockWrapper } from './nock-wrapper';
import { isEmpty, not } from './utils';

export interface RequestOptions {
  path?: Path;
  query?: Query;
  body?: Body;
}

export interface ResponseOptions {
  statusCode?: StatusCode;
  body?: Body;
  repeat?: number;
}

export class BackendMock {

  public static createFor(host: Host): BackendMock {
    return new BackendMock(host);
  }

  private _registry: InterceptorDescriptionRegistry;
  private _nockWrapper: NockWrapper;
  private _host: Host;

  constructor(host: Host) {
    this._registry = new InterceptorDescriptionRegistry();
    this._nockWrapper = new NockWrapper();
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

  public respondWith({ statusCode = 200, body = {}, repeat = 0 }: ResponseOptions = {}): void {
    for (const { index, description } of this._registry.getUnregistereds()) {

      description
        .setResponseStatusCode(statusCode)
        .setResponseBody(body)
        .setResponseRepeat(repeat);

      this._nockWrapper.registerInterceptor(description);
      this._registry.registerDescription(index);
    }
  }

  public clean(): void {
    const pendingInterceptors = this._nockWrapper.getPendingInterceptors();

    this._registry.clear();
    this._nockWrapper.releaseInterceptors();

    if (not(isEmpty(pendingInterceptors))) {
      throw new BackendMockError(pendingInterceptors);
    }
  }

}
