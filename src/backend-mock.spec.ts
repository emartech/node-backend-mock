import { BackendMock, RequestOptions } from './backend-mock';
import { BackendMockError } from './backend-mock-error';
import { HttpStatusCodes } from './http-status-codes';
import { IndexableObject, range } from './utils';
import { expect } from 'chai';

import Axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

type MockFactory = (options?: RequestOptions) => BackendMock;
type RequestFactory<T> = (url: string, body?: object, config?: AxiosRequestConfig) => AxiosPromise<T>;

const unresolvedInterceptors = (str: string) => str
  .split('\n')
  .filter((value: string) => value.match(/http:\/\/localhost:80\//));

const createMockWith = (mock: BackendMock) => (expectedAction: string): MockFactory =>
  (((mock as IndexableObject)[expectedAction] as Function).bind(mock) as MockFactory);

const createRequestWith = <T>(expectedMethod: string): RequestFactory<T> =>
  (url: string, body?: object, config?: AxiosRequestConfig): AxiosPromise<T> => {
    const method = expectedMethod.toLowerCase();
    return (['POST', 'PUT', 'PATCH'].includes(expectedMethod)) ?
      (((Axios as IndexableObject)[method] as Function).bind(Axios) as RequestFactory<T>)(url, body, config) :
      (((Axios as IndexableObject)[method] as Function).bind(Axios) as RequestFactory<T>)(url, config);
  };

describe('Backend Mock', () => {

  [
    { expectedMethod: 'GET',    expectedAction: 'whenGET' },
    { expectedMethod: 'POST',   expectedAction: 'whenPOST' },
    { expectedMethod: 'PUT',    expectedAction: 'whenPUT' },
    { expectedMethod: 'PATCH',  expectedAction: 'whenPATCH' },
    { expectedMethod: 'DELETE', expectedAction: 'whenDELETE' },
    { expectedMethod: 'HEAD',   expectedAction: 'whenHEAD' },
  ]
  .forEach(({ expectedMethod, expectedAction }) =>
  context(`when ${expectedMethod} request mocked`, () => {

    it('should respond to the issued request on the specified host on http protocol', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)().respondWith();

      const response = await createRequestWith(expectedMethod)(host);

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host on https protocol', async () => {
      const host = 'https://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)().respondWith();

      const response = await createRequestWith(expectedMethod)(host);

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ path }).respondWith();

      const response = await createRequestWith(expectedMethod)(`${host}${path}`);

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host and matching path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ path: /test$/ }).respondWith();

      const response = await createRequestWith(expectedMethod)(`${host}${path}`);

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request with expected query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ query: { param: 'value' } }).respondWith();

      const response = await createRequestWith(expectedMethod)(`${host}?param=value`);

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request with matching query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ query: { param: 'value' } }).respondWith();

      const response = await createRequestWith(expectedMethod)(`${host}?param=value&extra=true`);

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request with expected headers on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ headers: { 'Application-Type': 'text/json' } }).respondWith();

      const response = await createRequestWith(expectedMethod)
        (host, undefined, { headers: { 'Application-Type': 'text/json' } });

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request with matching headers on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ headers: { 'Application-Type': 'text/json' } }).respondWith();

      const response = await createRequestWith(expectedMethod)
        (host, undefined, { headers: { 'Application-Type': 'text/json', 'X-Request-Id': 222 } });

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should throw exception if expected header value is not the same', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ headers: { 'Application-Type': 'text/json' } }).respondWith();

      try {
        await createRequestWith(expectedMethod)(host, undefined, { headers: { 'Application-Type': 'text/html' } });
      } catch (exception) {
        expect(() => mock.verifyAndRestore()).to.throw(BackendMockError);
        expect(exception).to.instanceOf(Error);
      }
    });

    it('should throw exception if expected header field not present', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ headers: { 'X-Request-Id': 222 } }).respondWith();

      try {
        await createRequestWith(expectedMethod)(host, undefined);
      } catch (exception) {
        expect(() => mock.verifyAndRestore()).to.throw(BackendMockError);
        expect(exception).to.instanceOf(Error);
      }
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = HttpStatusCodes.OK;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)().respondWith({ statusCode: expectedStatus });

      const { status } = await createRequestWith(expectedMethod)(host);

      expect(status).to.eql(expectedStatus);

      mock.verifyAndRestore();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)().respondWith({ body: expectedBody });

      const { data } = await createRequestWith(expectedMethod)(host);

      expect(data).to.eql(expectedBody);

      mock.verifyAndRestore();
    });

    it('should respond also with given headers to the issued request on the specified host', async () => {
      const expectedHeaders = { 'X-Request-Id': 222 };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)().respondWith({ headers: expectedHeaders });

      const { headers } = await createRequestWith(expectedMethod)(host);

      expect((headers as IndexableObject)['x-request-id']).to.eql(expectedHeaders['X-Request-Id']);

      mock.verifyAndRestore();
    });

    it('should respond as many times as repeat count given', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);
      const repeat = 10;

      createMockWith(mock)(expectedAction)().respondWith({ repeat });

      for (const _ of range(repeat)) {
        await createRequestWith(expectedMethod)(host);
      }

      mock.verifyAndRestore();
    });

  }));

  [
    { expectedMethod: 'POST',   expectedAction: 'whenPOST' },
    { expectedMethod: 'PUT',    expectedAction: 'whenPUT' },
    { expectedMethod: 'PATCH',  expectedAction: 'whenPATCH' },
  ]
  .forEach(({ expectedMethod, expectedAction }) =>
  context(`when only ${expectedMethod} request mocked`, () => {

    it('should respond to the issued request on the specified host with expected request body', async () => {
      const requestBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ body: requestBody }).respondWith();

      const response = await createRequestWith(expectedMethod)(host, requestBody);

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host with matching request body', async () => {
      const requestBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ body: requestBody }).respondWith();

      const response = await createRequestWith(expectedMethod)(host, { ...requestBody, extra: 'value' });

      expect(response).to.not.eql(undefined);

      mock.verifyAndRestore();
    });

    it('should throw exception if expected body value is not the same', async () => {
      const requestBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ body: requestBody }).respondWith();

      try {
        await createRequestWith(expectedMethod)(host, { irrelevant: false });
      } catch (exception) {
        expect(() => mock.verifyAndRestore()).to.throw(BackendMockError);
        expect(exception).to.instanceOf(Error);
      }
    });

    it('should throw exception if expected header field not present', async () => {
      const requestBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      createMockWith(mock)(expectedAction)({ body: requestBody }).respondWith();

      try {
        await createRequestWith(expectedMethod)(host, {});
      } catch (exception) {
        expect(() => mock.verifyAndRestore()).to.throw(BackendMockError);
        expect(exception).to.instanceOf(Error);
      }
    });

  }));

  context('#verifyAndRestore', () => {

    it('should throw exception if there is an unresolved interceptor', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      const expectedMesssage = /GET http:\/\/localhost:80\/test/;
      expect(() => mock.verifyAndRestore()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception if there are multiple unresolved interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      mock
        .whenPOST({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      const expectedMesssage = /GET http:\/\/localhost:80\/test(.|\n)+POST http:\/\/localhost:80\/test/;
      expect(() => mock.verifyAndRestore()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception if there are multiple unresolved batched interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .whenPOST({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      const expectedMesssage = /GET http:\/\/localhost:80\/test(.|\n)+POST http:\/\/localhost:80\/test/;
      expect(() => mock.verifyAndRestore()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception message with exactly the same number of unresolved interceptors', async () => {
      const expectedUnresolvedInterceptors = 2;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .whenPOST({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      try {
        mock.verifyAndRestore();
      } catch (exception) {
        expect(unresolvedInterceptors((exception as Error).message)).to.have.length(expectedUnresolvedInterceptors);
      }
    });

    it('should throw exception if request sent to a non-matching interceptor on the same host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      try {
        await Axios.get(`${host}/test`);
        await Axios.get(`${host}/non-matching`);
      } catch (exception) {
        expect((exception as Error).message).to.match(/http:\/\/localhost\/non-matching/);
        mock.verifyAndRestore();
      }
    });

    it('should not throw exception if request sent to a non-matching interceptor on the same host, but unmocked flag is allowed', async () => { // tslint:disable-line max-line-length
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host, { allowUnmocked: true });

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      try {
        await Axios.get(`${host}/test`);
        await Axios.get(`${host}/non-matching`);
      } catch (exception) {
        expect((exception as Error).message).to.not.match(/http:\/\/localhost\/non-matching/);
        mock.verifyAndRestore();
      }
    });

    it('should not throw exception message if interceptor is unregistered', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock.whenGET({ path: '/test' });
      mock.verifyAndRestore();
    });

    it('should reset resolved interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      await Axios.get(`${host}/test`);
      mock.verifyAndRestore();

      mock
        .whenPOST({ path: '/test' })
        .respondWith({ statusCode: HttpStatusCodes.OK });

      const expectedMesssage = /GET http:\/\/localhost:80\/test/;
      expect(() => mock.verifyAndRestore()).to.not.throw(expectedMesssage);
    });

  });

});
