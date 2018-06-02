
export type Host = string;
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
export type Path = string;
export type StatusCode = number;
export type Body = object;

export class InterceptorDescription {

  public static create({ host }: { host: Host }): InterceptorDescription {
    return new InterceptorDescription(host);
  }

  private _host: Host;
  private _method: Method = 'GET';
  private _path: Path = '/';
  private _responseStatusCode: StatusCode = 200;
  private _responseBody: Body = {};

  constructor(host: Host) {
    this._host = host;
  }

  public get host(): Host {
    return this._host;
  }

  public get method(): Method {
    return this._method;
  }

  public get path(): Path {
    return this._path;
  }

  public get responseStatusCode(): StatusCode {
    return this._responseStatusCode;
  }

  public get responseBody(): Body {
    return this._responseBody;
  }

  public setMethod(method: Method): InterceptorDescription {
    this._method = method;
    return this;
  }

  public setPath(path: Path): InterceptorDescription {
    this._path = path;
    return this;
  }

  public setResponseStatusCode(statusCode: StatusCode): InterceptorDescription {
    this._responseStatusCode = statusCode;
    return this;
  }

  public setResponseBody(responseBody: Body): InterceptorDescription {
    this._responseBody = responseBody;
    return this;
  }

}