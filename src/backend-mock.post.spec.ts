import { BackendMock } from './backend-mock';
import { expect } from 'chai';

import axios from 'axios';

/* tslint:disable no-unused-expression */

describe('Backend Mock', () => {

  context('when POST request mocked', () => {

    it('should respond to the issued request on the specified host on http protocol', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST()
        .respondWith();

      const response = await axios.post(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host on https protocol', async () => {
      const host = 'https://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST()
        .respondWith();

      const response = await axios.post(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST({ path })
        .respondWith();

      const response = await axios.post(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and matching path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST({ path: /test$/ })
        .respondWith();

      const response = await axios.post(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request with expected query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST({ query: { param: 'value' } })
        .respondWith();

      const response = await axios.post(`${host}?param=value`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request with matching query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST({ query: { param: 'value' } })
        .respondWith();

      const response = await axios.post(`${host}?param=value&extra=true`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await axios.post(host);

      expect(status).to.eql(expectedStatus);

      mock.clean();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST()
        .respondWith({ body: expectedBody });

      const { data } = await axios.post(host);

      expect(data).to.eql(expectedBody);

      mock.clean();
    });

    it('should respond to the issued request on the specified host with expected request body', async () => {
      const requestBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST({ body: requestBody })
        .respondWith();

      const response = await axios.post(host, requestBody);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host with matching request body', async () => {
      const requestBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPOST({ body: requestBody })
        .respondWith();

      const response = await axios.post(host, { ...requestBody, extra: 'value' });

      expect(response).to.not.undefined;

      mock.clean();
    });

  });

});
