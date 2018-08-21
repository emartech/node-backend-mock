import { BackendMock } from './backend-mock';
import { range } from './utils';
import { expect } from 'chai';

import Axios from 'axios';

/* tslint:disable no-unused-expression */

describe('Backend Mock', () => {

  context('when PUT request mocked', () => {

    it('should respond to the issued request on the specified host on http protocol', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT()
        .respondWith();

      const response = await Axios.put(host);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host on https protocol', async () => {
      const host = 'https://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT()
        .respondWith();

      const response = await Axios.put(host);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT({ path })
        .respondWith();

      const response = await Axios.put(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host and matching path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT({ path: /test$/ })
        .respondWith();

      const response = await Axios.put(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request with expected query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT({ query: { param: 'value' } })
        .respondWith();

      const response = await Axios.put(`${host}?param=value`);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request with matching query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT({ query: { param: 'value' } })
        .respondWith();

      const response = await Axios.put(`${host}?param=value&extra=true`);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await Axios.put(host);

      expect(status).to.eql(expectedStatus);

      mock.verifyAndRestore();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT()
        .respondWith({ body: expectedBody });

      const { data } = await Axios.put(host);

      expect(data).to.eql(expectedBody);

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host with expected request body', async () => {
      const requestBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT({ body: requestBody })
        .respondWith();

      const response = await Axios.put(host, requestBody);

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond to the issued request on the specified host with matching request body', async () => {
      const requestBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT({ body: requestBody })
        .respondWith();

      const response = await Axios.put(host, { ...requestBody, extra: 'value' });

      expect(response).to.not.undefined;

      mock.verifyAndRestore();
    });

    it('should respond as many times as repeat count given', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);
      const repeat = 10;

      mock
        .whenPUT()
        .respondWith({ repeat });

      for (const _ of range(repeat)) {
        await Axios.put(host);
      }

      mock.verifyAndRestore();
    });

  });

});
