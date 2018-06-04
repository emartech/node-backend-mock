import { BackendMockError } from './backend-mock-error';
import { BackendMock } from './backend-mock';
import { expect } from 'chai';

import axios from 'axios';

/* tslint:disable no-unused-expression */

describe('Backend Mock', () => {

  context('when GET request mocked', () => {

    it('should respond to the issued request on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

      mock
        .whenGET()
        .respondWith();

      const response = await axios.get(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

      mock
        .whenGET({ path })
        .respondWith();

      const response = await axios.get(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

      mock
        .whenGET()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await axios.get(host);

      expect(status).to.eql(expectedStatus);

      mock.clean();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

      mock
        .whenGET()
        .respondWith({ body: expectedBody });

      const { data } = await axios.get(host);

      expect(data).to.eql(expectedBody);

      mock.clean();
    });

  });

  context('when POST request mocked', () => {

    it('should respond to the issued request on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

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
      const mock = BackendMock.create({ host });

      mock
        .whenPOST({ path })
        .respondWith();

      const response = await axios.post(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

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
      const mock = BackendMock.create({ host });

      mock
        .whenPOST()
        .respondWith({ body: expectedBody });

      const { data } = await axios.post(host);

      expect(data).to.eql(expectedBody);

      mock.clean();
    });

  });

  context('#clean', () => {

    it('should throw exception if there is unresovled interceptor', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

      mock
        .whenGET()
        .respondWith();

      const expectedMesssage = /GET http:\/\/localhost:80\//;
      expect(() => mock.clean()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should throw exception if there are multiple unresovled interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

      mock
        .whenGET()
        .respondWith();

      mock
        .whenPOST()
        .respondWith();

      const expectedMesssage = /GET http:\/\/localhost:80\/(.|\n)+POST http:\/\/localhost:80\//;
      expect(() => mock.clean()).to.throw(BackendMockError, expectedMesssage);
    });

    it('should reset interceptors', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.create({ host });

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
