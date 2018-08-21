import { BackendMockError } from './backend-mock-error';
import { BackendMock } from './backend-mock';
import { expect } from 'chai';

import Axios from 'axios';

const unresolvedInterceptors = (str: string) => str
  .split('\n')
  .filter((value: string) => value.match(/http:\/\/localhost:80\//));

/* tslint:disable no-unused-expression max-line-length */

describe('Backend Mock', () => {

  context('#clean', () => {

    it('should throw exception if there is an unresovled interceptor', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: 200 });

      const expectedMesssage = /GET http:\/\/localhost:80\/test/;
      expect(() => mock.clean()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception if there are multiple unresovled interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: 200 });

      mock
        .whenPOST({ path: '/test' })
        .respondWith({ statusCode: 200 });

      const expectedMesssage = /GET http:\/\/localhost:80\/test(.|\n)+POST http:\/\/localhost:80\/test/;
      expect(() => mock.clean()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception if there are multiple unresovled batched interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .whenPOST({ path: '/test' })
        .respondWith({ statusCode: 200 });

      const expectedMesssage = /GET http:\/\/localhost:80\/test(.|\n)+POST http:\/\/localhost:80\/test/;
      expect(() => mock.clean()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception message with exactly the same number of unresolved interceptors', async () => {
      const expectedUnresolvedInterceptors = 2;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .whenPOST({ path: '/test' })
        .respondWith({ statusCode: 200 });

      try {
        mock.clean();
      } catch (exception) {
        expect(unresolvedInterceptors((exception as Error).message)).to.have.length(expectedUnresolvedInterceptors);
      }
    });

    it('should throw exception if request sent to a non-matching interceptor on the same host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: 200 });

      try {
        await Axios.get(`${host}/test`);
        await Axios.get(`${host}/non-matching`);
      } catch (exception) {
        expect((exception as Error).message).to.match(/http:\/\/localhost\/non-matching/);
        mock.clean();
      }
    });

    it('should not throw exception if request sent to a non-matching interceptor on the same host, but unmocked flag is allowed', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host, { allowUnmocked: true });

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: 200 });

      try {
        await Axios.get(`${host}/test`);
        await Axios.get(`${host}/non-matching`);
      } catch (exception) {
        expect((exception as Error).message).to.not.match(/http:\/\/localhost\/non-matching/);
        mock.clean();
      }
    });

    it('should not throw exception message if interceptor is unregistered', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock.whenGET({ path: '/test' });
      mock.clean();
    });

    it('should reset resolved interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: '/test' })
        .respondWith({ statusCode: 200 });

      await Axios.get(`${host}/test`);
      mock.clean();

      mock
        .whenPOST({ path: '/test' })
        .respondWith({ statusCode: 200 });

      const expectedMesssage = /GET http:\/\/localhost:80\/test/;
      expect(() => mock.clean()).to.not.throw(expectedMesssage);
    });

  });

});
