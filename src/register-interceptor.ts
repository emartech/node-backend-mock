import { InterceptorDescription, Body } from './interceptor-description';
import { isEmpty, matchObjects } from './utils';

import nock from 'nock';

export const registerInterceptor = (desc: InterceptorDescription): nock.Scope => {
  return nock(desc.host, desc.options)
    .intercept(desc.path, desc.method, requestBody(desc))
    .reply(desc.responseStatusCode, desc.responseBody);
};

function requestBody(desc: InterceptorDescription): Body | ((body: Body) => boolean) {
  if (isEmpty(desc.requestBody)) return () => true;
  else return matchObjects(desc.requestBody);
}
