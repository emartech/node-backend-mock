import { InterceptorRequestOptions, RequestOptions } from './interceptor-request-options';
import { InterceptorResponseOptions, ResponseOptions } from './interceptor-response-options';

export interface InterceptorSettings {
  allowUnmocked: boolean;
}

export const enum InterceptorStatus {
  UNREGISTERED = 0,
  REGISTERED = 1,
}

export class Interceptor {

  public static create(host: string, settings?: InterceptorSettings): Interceptor {
    return new Interceptor(host, settings);
  }

  private _host: string;
  private _settings: InterceptorSettings;
  private _requestOptions: InterceptorRequestOptions;
  private _responseOptions: InterceptorResponseOptions;
  private _status: InterceptorStatus;

  constructor(host: string, settings: InterceptorSettings = { allowUnmocked: false }) {
    this._host = host;
    this._settings = settings;
    this._requestOptions = new InterceptorRequestOptions();
    this._responseOptions = new InterceptorResponseOptions();
    this._status = InterceptorStatus.UNREGISTERED;
  }

  public get host(): string {
    return this._host;
  }

  public get settings(): InterceptorSettings {
    return this._settings;
  }

  public get status(): InterceptorStatus {
    return this._status;
  }

  public get requestOptions(): InterceptorRequestOptions {
    return this._requestOptions;
  }

  public get responseOptions(): InterceptorResponseOptions {
    return this._responseOptions;
  }

  public setStatus(status: InterceptorStatus): Interceptor {
    this._status = status;
    return this;
  }

  public setRequestOptions({ path = '/', method = 'GET', query = {}, body = {} }: RequestOptions = {}): Interceptor {
    this._requestOptions
      .setPath(path)
      .setMethod(method)
      .setQuery(query)
      .setBody(body);

    return this;
  }

  public setResponseOptions({ statusCode = 200, body = {}, repeat = 0 }: ResponseOptions = {}): Interceptor {
    this._responseOptions
      .setStatusCode(statusCode)
      .setBody(body)
      .setRepeat(repeat);

    return this;
  }

}
