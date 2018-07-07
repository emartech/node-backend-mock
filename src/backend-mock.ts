import { ResponseOptions } from './interceptor-response-options';
import { InterceptorRegistry } from './interceptor-registry';
import { InterceptorFactory } from './interceptor-factory';
import { BackendMockError } from './backend-mock-error';
import { Path } from './interceptor-request-options';
import { InterceptorStatus } from './interceptor';
import { NockWrapper } from './nock-wrapper';
import { isEmpty, not } from './utils';

export interface RequestOptions {
  path?: Path;
  query?: object;
  body?: object;
}

export class BackendMock {

  public static createFor(host: string): BackendMock {
    return new BackendMock(host);
  }

  private _registry: InterceptorRegistry;
  private _nockWrapper: NockWrapper;
  private _host: string;

  public constructor(host: string) {
    this._registry = new InterceptorRegistry();
    this._nockWrapper = new NockWrapper();
    this._host = host;
  }

  public whenGET(requestOptions: RequestOptions = {}): BackendMock {
    const interceptor = InterceptorFactory.createForGET(this._host, requestOptions);
    this._registry.addInterceptor(interceptor);
    return this;
  }

  public whenPOST(requestOptions: RequestOptions = {}): BackendMock {
    const interceptor = InterceptorFactory.createForPOST(this._host, requestOptions);
    this._registry.addInterceptor(interceptor);
    return this;
  }

  public whenPUT(requestOptions: RequestOptions = {}): BackendMock {
    const interceptor = InterceptorFactory.createForPUT(this._host, requestOptions);
    this._registry.addInterceptor(interceptor);
    return this;
  }

  public whenPATCH(requestOptions: RequestOptions = {}): BackendMock {
    const interceptor = InterceptorFactory.createForPATCH(this._host, requestOptions);
    this._registry.addInterceptor(interceptor);
    return this;
  }

  public whenDELETE(requestOptions: RequestOptions = {}): BackendMock {
    const interceptor = InterceptorFactory.createForDELETE(this._host, requestOptions);
    this._registry.addInterceptor(interceptor);
    return this;
  }

  public whenHEAD(requestOptions: RequestOptions = {}): BackendMock {
    const interceptor = InterceptorFactory.createForHEAD(this._host, requestOptions);
    this._registry.addInterceptor(interceptor);
    return this;
  }

  public respondWith(responseOptions: ResponseOptions = {}): void {
    for (const interceptor of this._registry.unregistereds) {

      interceptor
        .setResponseOptions(responseOptions)
        .setStatus(InterceptorStatus.REGISTERED);

      this._nockWrapper.registerInterceptor(interceptor);
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
