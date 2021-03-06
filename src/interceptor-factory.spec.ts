import { InterceptorSettings, Interceptor } from './interceptor';
import { RequestOptions } from './interceptor-request-options';
import { InterceptorFactory } from './interceptor-factory';
import { IndexableObject, Indefinable } from './utils';
import { expect } from 'chai';

const HOST = 'http://localhost';

type Factory = (host: string, settings: Indefinable<InterceptorSettings>, options: RequestOptions) => Interceptor;

const createInterceptorWith = (expectedAction: string): Factory =>
  ((InterceptorFactory as IndexableObject)[expectedAction] as Factory);

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
      const interceptor = createInterceptorWith(expectedAction)(HOST, undefined, {});
      expect(interceptor.host).to.eql(HOST);
    });

    it('should return created interceptor with given settings', () => {
      const interceptor = createInterceptorWith(expectedAction)(HOST, { allowUnmocked: true }, {});
      expect(interceptor.settings).to.eql({ allowUnmocked: true });
    });

    it(`should return created interceptor for ${expectedMethod} request`, () => {
      const interceptor = createInterceptorWith(expectedAction)(HOST, undefined, {});
      expect(interceptor.requestOptions.method).to.eql(expectedMethod);
    });

    it('should return created interceptor with given request options', () => {
      const requestOptions = { path: '/path', query: { param: true }, body: { data: [] } };
      const interceptor = createInterceptorWith(expectedAction)(HOST, undefined, requestOptions);
      expect(interceptor.requestOptions.path).to.eql(requestOptions.path);
      expect(interceptor.requestOptions.query).to.eql(requestOptions.query);
      expect(interceptor.requestOptions.body).to.eql(requestOptions.body);
    });

    it('should override given request method', () => {
      const interceptor = createInterceptorWith(expectedAction)(HOST, undefined, { method: 'OTHER' } as any);
      expect(interceptor.requestOptions.method).to.eql(expectedMethod);
    });

  }));

});
