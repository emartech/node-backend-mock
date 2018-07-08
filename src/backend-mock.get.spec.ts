import { BackendMock } from './backend-mock';
import { range } from './utils';
import { expect } from 'chai';

import Axios from 'axios';

/* tslint:disable no-unused-expression */

describe('Backend Mock', () => {

  context('when GET request mocked', () => {

    it('should respond to the issued request on the specified host on http protocol', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET()
        .respondWith();

      const response = await Axios.get(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host on https protocol', async () => {
      const host = 'https://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET()
        .respondWith();

      const response = await Axios.get(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path })
        .respondWith();

      const response = await Axios.get(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and matching path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ path: /test$/ })
        .respondWith();

      const response = await Axios.get(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request with expected query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ query: { param: 'value' } })
        .respondWith();

      const response = await Axios.get(`${host}?param=value`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request with matching query on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET({ query: { param: 'value' } })
        .respondWith();

      const response = await Axios.get(`${host}?param=value&extra=true`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await Axios.get(host);

      expect(status).to.eql(expectedStatus);

      mock.clean();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenGET()
        .respondWith({ body: expectedBody });

      const { data } = await Axios.get(host);

      expect(data).to.eql(expectedBody);

      mock.clean();
    });

    it('should respond as many times as repeat count given', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);
      const repeat = 10;

      mock
        .whenGET()
        .respondWith({ repeat });

      for (const _ of range(repeat)) {
        await Axios.get(host);
      }

      mock.clean();
    });

  });

});
