import { InterceptorDescription } from './interceptor-description';
import nock from 'nock';

export const registerInterceptor = (desc: InterceptorDescription): nock.Scope => {
  return nock(desc.host, desc.options)
    .intercept(desc.path, desc.method)
    .reply(desc.responseStatusCode, desc.responseBody);
};
