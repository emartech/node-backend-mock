export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
export type Path = string | RegExp;

export interface RequestOptions {
  path?: Path;
  method?: Method;
  query?: object;
  body?: object;
}

export class InterceptorRequestOptions {

  private _method: Method = 'GET';
  private _path: Path = '/';
  private _query: object = {};
  private _body: object = {};

  public get method(): Method {
    return this._method;
  }

  public get path(): Path {
    return this._path;
  }

  public get query(): object {
    return this._query;
  }

  public get body(): object {
    return this._body;
  }

  public setMethod(method: Method): InterceptorRequestOptions {
    this._method = method;
    return this;
  }

  public setPath(path: Path): InterceptorRequestOptions {
    this._path = path;
    return this;
  }

  public setQuery(query: object): InterceptorRequestOptions {
    this._query = query;
    return this;
  }

  public setBody(requestBody: object): InterceptorRequestOptions {
    this._body = requestBody;
    return this;
  }

}
