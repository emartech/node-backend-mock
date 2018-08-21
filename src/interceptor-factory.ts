import { Interceptor, InterceptorStatus, InterceptorSettings } from './interceptor';
import { RequestOptions } from './interceptor-request-options';
import { Indefinable } from './utils';

export class InterceptorFactory {

  public static createForGET(
    host: string,
    settings: Indefinable<InterceptorSettings>,
    requestOptions: RequestOptions,
  ): Interceptor {
    return Interceptor
      .create(host, settings)
      .setRequestOptions({ ...requestOptions, method: 'GET' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForPOST(
    host: string,
    settings: Indefinable<InterceptorSettings>,
    requestOptions: RequestOptions,
  ): Interceptor {
    return Interceptor
      .create(host, settings)
      .setRequestOptions({ ...requestOptions, method: 'POST' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForPUT(
    host: string,
    settings: Indefinable<InterceptorSettings>,
    requestOptions: RequestOptions,
  ): Interceptor {
    return Interceptor
      .create(host, settings)
      .setRequestOptions({ ...requestOptions, method: 'PUT' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForPATCH(
    host: string,
    settings: Indefinable<InterceptorSettings>,
    requestOptions: RequestOptions,
  ): Interceptor {
    return Interceptor
      .create(host, settings)
      .setRequestOptions({ ...requestOptions, method: 'PATCH' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForDELETE(
    host: string,
    settings: Indefinable<InterceptorSettings>,
    requestOptions: RequestOptions,
  ): Interceptor {
    return Interceptor
      .create(host, settings)
      .setRequestOptions({ ...requestOptions, method: 'DELETE' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForHEAD(
    host: string,
    settings: Indefinable<InterceptorSettings>,
    requestOptions: RequestOptions,
  ): Interceptor {
    return Interceptor
      .create(host, settings)
      .setRequestOptions({ ...requestOptions, method: 'HEAD' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

}
