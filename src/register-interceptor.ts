import { InterceptorDescription } from './interceptor-description';
import { matchObjects } from './utils';

import nock from 'nock';

export const registerInterceptor = (desc: InterceptorDescription): nock.Scope => {
  return nock(desc.host, desc.options)
    .intercept(desc.path, desc.method, matchObjects(desc.requestBody))
    .query(matchObjects(desc.query))
    .reply(desc.responseStatusCode, desc.responseBody);
};
