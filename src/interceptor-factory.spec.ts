import { RequestOptions } from './interceptor-request-options';
import { InterceptorFactory } from './interceptor-factory';
import { Interceptor } from './interceptor';
import { IndexableObject } from './utils';
import { expect } from 'chai';

const HOST = 'http://localhost';

type Factory = (host: string, options: RequestOptions) => Interceptor;

function createInterceptorWith(expectedAction: string): Factory {
  return ((InterceptorFactory as IndexableObject)[expectedAction] as Factory);
}

describe('Interceptor Factory', () => {

  const dataProvider = [
    { expectedMethod: 'GET',    expectedAction: 'createForGET' },
    { expectedMethod: 'POST',   expectedAction: 'createForPOST' },
    { expectedMethod: 'PUT',    expectedAction: 'createForPUT' },
    { expectedMethod: 'PATCH',  expectedAction: 'createForPATCH' },
    { expectedMethod: 'DELETE', expectedAction: 'createForDELETE' },
    { expectedMethod: 'HEAD',   expectedAction: 'createForHEAD' },
  ];

  dataProvider.forEach(({ expectedAction, expectedMethod }) =>
  context(`@${expectedAction}`, () => {

    it('should return created interceptor with given host', () => {
      const interceptor = createInterceptorWith(expectedAction)(HOST, {});
      expect(interceptor.host).to.eql(HOST);
    });

    it(`should return created interceptor for ${expectedMethod} request`, () => {
      const interceptor = createInterceptorWith(expectedAction)(HOST, {});
      expect(interceptor.requestOptions.method).to.eql(expectedMethod);
    });

    it('should return created interceptor with given request options', () => {
      const requestOptions = { path: '/path', query: { param: true }, body: { data: [] } };
      const interceptor = createInterceptorWith(expectedAction)(HOST, requestOptions);
      expect(interceptor.requestOptions.path).to.eql(requestOptions.path);
      expect(interceptor.requestOptions.query).to.eql(requestOptions.query);
      expect(interceptor.requestOptions.body).to.eql(requestOptions.body);
    });

    it('should override given request method', () => {
      const interceptor = createInterceptorWith(expectedAction)(HOST, { method: 'ANY' } as any);
      expect(interceptor.requestOptions.method).to.eql(expectedMethod);
    });

  }));

});
