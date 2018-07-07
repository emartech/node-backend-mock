import { BackendMockError } from './backend-mock-error';
import { BackendMock } from './backend-mock';
import { expect } from 'chai';

import axios from 'axios';

const unresolvedInterceptors = (str: string) => {
  return str
    .split('\n')
    .filter((value: string) => value.match(/http:\/\/localhost:80\//));
};

/* tslint:disable no-unused-expression */

describe('Backend Mock', () => {

  context('#clean', () => {

    it('should throw exception if there is unresovled interceptor', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET()
        .respondWith();

      const expectedMesssage = /GET http:\/\/localhost:80\//;
      expect(() => mock.clean()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception if there are multiple unresovled interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET()
        .respondWith();

      mock
        .whenPOST()
        .respondWith();

      const expectedMesssage = /GET http:\/\/localhost:80\/(.|\n)+POST http:\/\/localhost:80\//;
      expect(() => mock.clean()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception message with exactly the same number of unresolved interceptors', async () => {
      const expectedUnresolvedInterceptors = 2;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET()
        .respondWith();

      mock
        .whenPOST()
        .respondWith();

      try {
        mock.clean();
      } catch (exception) {
        expect(unresolvedInterceptors((exception as Error).message)).to.have.length(expectedUnresolvedInterceptors);
      }
    });

    it('should not throw exception message if interceptor is unregistered', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock.whenGET();

      mock.clean();
    });

    it('should reset interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET()
        .respondWith();

      await axios.get(host);
      mock.clean();

      mock
        .whenPOST()
        .respondWith();

      const expectedMesssage = /GET http:\/\/localhost:80\//;
      expect(() => mock.clean()).to.not.throw(expectedMesssage);
    });

  });

});
