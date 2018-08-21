import { BackendMock } from './backend-mock';
import { range } from './utils';
import { expect } from 'chai';

import Axios from 'axios';

/* tslint:disable no-unused-expression */

describe('Backend Mock', () => {

  context('when DELETE request mocked', () => {

    it('should respond to the issued request on the specified host on http protocol', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE()
        .respondWith();

      const response = await Axios.delete(host);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host on https protocol', async () => {
      const host = 'https://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE()
        .respondWith();

      const response = await Axios.delete(host);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE({ path })
        .respondWith();

      const response = await Axios.delete(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host and matching path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE({ path: /test$/ })
        .respondWith();

      const response = await Axios.delete(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request with expected query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE({ query: { param: 'value' } })
        .respondWith();

      const response = await Axios.delete(`${host}?param=value`);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request with matching query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE({ query: { param: 'value' } })
        .respondWith();

      const response = await Axios.delete(`${host}?param=value&extra=true`);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await Axios.delete(host);

      expect(status).to.eql(expectedStatus);

      mock.verifyAndRestore();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE()
        .respondWith({ body: expectedBody });

      const { data } = await Axios.delete(host);

      expect(data).to.eql(expectedBody);

      mock.verifyAndRestore();
    });

    it('should respond as many times as repeat count given', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);
      const repeat = 10;

      mock
        .whenDELETE()
        .respondWith({ repeat });

      for (const _ of range(repeat)) {
        await Axios.delete(host);
      }

      mock.verifyAndRestore();
    });

  });

});
