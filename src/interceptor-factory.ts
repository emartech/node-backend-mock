import { RequestOptions } from './interceptor-request-options';
import { Interceptor, InterceptorStatus } from './interceptor';

export class InterceptorFactory {

  public static createForGET(host: string, requestOptions: RequestOptions): Interceptor {
    return Interceptor
      .create(host)
      .setRequestOptions({ ...requestOptions, method: 'GET' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForPOST(host: string, requestOptions: RequestOptions): Interceptor {
    return Interceptor
      .create(host)
      .setRequestOptions({ ...requestOptions, method: 'POST' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForPUT(host: string, requestOptions: RequestOptions): Interceptor {
    return Interceptor
      .create(host)
      .setRequestOptions({ ...requestOptions, method: 'PUT' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForPATCH(host: string, requestOptions: RequestOptions): Interceptor {
    return Interceptor
      .create(host)
      .setRequestOptions({ ...requestOptions, method: 'PATCH' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForDELETE(host: string, requestOptions: RequestOptions): Interceptor {
    return Interceptor
      .create(host)
      .setRequestOptions({ ...requestOptions, method: 'DELETE' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

  public static createForHEAD(host: string, requestOptions: RequestOptions): Interceptor {
    return Interceptor
      .create(host)
      .setRequestOptions({ ...requestOptions, method: 'HEAD' })
      .setStatus(InterceptorStatus.UNREGISTERED);
  }

}
