
export interface ResponseOptions {
  statusCode?: number;
  body?: object;
  repeat?: number;
}

export class InterceptorResponseOptions {

  private _statusCode: number = 200;
  private _body: object = {};
  private _repeat: number = 0;

  public get statusCode(): number {
    return this._statusCode;
  }

  public get body(): object {
    return this._body;
  }

  public get repeat(): number {
    return this._repeat;
  }

  public setStatusCode(statusCode: number): InterceptorResponseOptions {
    this._statusCode = statusCode;
    return this;
  }

  public setBody(responseBody: object): InterceptorResponseOptions {
    this._body = responseBody;
    return this;
  }

  public setRepeat(responseRepeat: number): InterceptorResponseOptions {
    this._repeat = responseRepeat;
    return this;
  }

}
