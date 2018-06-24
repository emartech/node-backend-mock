import { Interceptor, InterceptorStatus } from './interceptor';
import { add } from './utils';

export class InterceptorRegistry {

  private _interceptors: Interceptor[] = [];

  public get unregistereds(): Interceptor[] {
    return this._interceptors.filter(({ status }) => status === InterceptorStatus.UNREGISTERED);
  }

  public addInterceptor(interceptor: Interceptor): void {
    this._interceptors = add(this._interceptors)(interceptor);
  }

  public clear(): void {
    this._interceptors = [];
  }

}
