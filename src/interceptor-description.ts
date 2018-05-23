
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
export type ResponseBody = object | undefined;

export class InterceptorDescription {

  public static create({ host }: { host: string }): InterceptorDescription {
    return new InterceptorDescription(host);
  }

  private _host: string;
  private _method: Method = 'GET';
  private _path: string = '/';
  private _responseStatusCode: number = 200;
  private _responseBody: ResponseBody = undefined;

  constructor(host: string) {
    this._host = host;
  }

  public get host(): string {
    return this._host;
  }

  public get method(): Method {
    return this._method;
  }

  public get path(): string {
    return this._path;
  }

  public get responseStatusCode(): number {
    return this._responseStatusCode;
  }

  public get responseBosy(): ResponseBody {
    return this._responseBody;
  }

  public setMethod(method: Method): InterceptorDescription {
    this._method = method;
    return this;
  }

  public setPath(path: string): InterceptorDescription {
    this._path = path;
    return this;
  }

  public setResponseStatusCode(statusCode: number): InterceptorDescription {
    this._responseStatusCode = statusCode;
    return this;
  }

  public setResponseBody(responseBody: ResponseBody): InterceptorDescription {
    this._responseBody = responseBody;
    return this;
  }

}
