import nock from 'nock';

export type Host = string;
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
export type Path = string | RegExp;
export type Query = object;
export type StatusCode = number;
export type Body = object;

export class InterceptorDescription {

  public static createFor(host: Host): InterceptorDescription {
    return new InterceptorDescription(host);
  }

  private _host: Host;
  private _method: Method = 'GET';
  private _path: Path = '/';
  private _query: Query = {};
  private _requestBody: Body = {};
  private _responseStatusCode: StatusCode = 200;
  private _responseBody: Body = {};
  private _options: nock.Options = {
    allowUnmocked: false,
    badheaders: [],
  };

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

  public get query(): Query {
    return this._query;
  }

  public get requestBody(): Body {
    return this._requestBody;
  }

  public get responseStatusCode(): StatusCode {
    return this._responseStatusCode;
  }

  public get responseBody(): Body {
    return this._responseBody;
  }

  public get options(): nock.Options {
    return this._options;
  }

  public setMethod(method: Method): InterceptorDescription {
    this._method = method;
    return this;
  }

  public setPath(path: Path): InterceptorDescription {
    this._path = path;
    return this;
  }

  public setQuery(query: Query): InterceptorDescription {
    this._query = query;
    return this;
  }

  public setRequestBody(requestBody: Body): InterceptorDescription {
    this._requestBody = requestBody;
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
