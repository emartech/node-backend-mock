import { InterceptorRequestOptions, RequestOptions } from './interceptor-request-options';
import { InterceptorResponseOptions, ResponseOptions } from './interceptor-response-options';
import { HttpStatusCodes } from './http-status-codes';

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

  public constructor(host: string, settings: InterceptorSettings = { allowUnmocked: false }) {
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

  public setRequestOptions({
    path = '/',
    method = 'GET',
    headers = {},
    query = {},
    body = {},
  }: RequestOptions = {}): Interceptor {
    this._requestOptions
      .setMethod(method)
      .setPath(path)
      .setHeaders(headers)
      .setQuery(query)
      .setBody(body);

    return this;
  }

  public setResponseOptions({
    statusCode = HttpStatusCodes.OK,
    headers = {},
    body = {},
    repeat = 0,
  }: ResponseOptions = {}): Interceptor {
    this._responseOptions
      .setStatusCode(statusCode)
      .setHeaders(headers)
      .setBody(body)
      .setRepeat(repeat);

    return this;
  }

}
