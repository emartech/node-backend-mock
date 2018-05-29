import { InterceptorDescription } from './interceptor-description';
import nock from 'nock';

const options: nock.Options = {
  allowUnmocked: false,
  badheaders: [],
};

export const registerInterceptor = (desc: InterceptorDescription): nock.Scope => {
  return nock(desc.host, { ...options })
    .intercept(desc.path, desc.method)
    .reply(desc.responseStatusCode, desc.responseBody);
};
