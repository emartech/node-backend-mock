import { BackendMockError } from './backend-mock-error';
import { BackendMock } from './backend-mock';
import { expect } from 'chai';

import axios from 'axios';

/* tslint:disable no-unused-expression */

describe('Backend Mock', () => {

  context('when GET request mocked', () => {

    it('should respond to the issued request on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

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
      const mock = BackendMock.createFor(host);

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
      const mock = BackendMock.createFor(host);

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
      const mock = BackendMock.createFor(host);

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

  });

  context('when PUT request mocked', () => {

    it('should respond to the issued request on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT()
        .respondWith();

      const response = await axios.put(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT({ path })
        .respondWith();

      const response = await axios.put(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await axios.put(host);

      expect(status).to.eql(expectedStatus);

      mock.clean();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPUT()
        .respondWith({ body: expectedBody });

      const { data } = await axios.put(host);

      expect(data).to.eql(expectedBody);

      mock.clean();
    });

  });

  context('when PATCH request mocked', () => {

    it('should respond to the issued request on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPATCH()
        .respondWith();

      const response = await axios.patch(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPATCH({ path })
        .respondWith();

      const response = await axios.patch(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPATCH()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await axios.patch(host);

      expect(status).to.eql(expectedStatus);

      mock.clean();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenPATCH()
        .respondWith({ body: expectedBody });

      const { data } = await axios.patch(host);

      expect(data).to.eql(expectedBody);

      mock.clean();
    });

  });

  context('when DELETE request mocked', () => {

    it('should respond to the issued request on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE()
        .respondWith();

      const response = await axios.delete(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE({ path })
        .respondWith();

      const response = await axios.delete(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await axios.delete(host);

      expect(status).to.eql(expectedStatus);

      mock.clean();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenDELETE()
        .respondWith({ body: expectedBody });

      const { data } = await axios.delete(host);

      expect(data).to.eql(expectedBody);

      mock.clean();
    });

  });

  context('when HEAD request mocked', () => {

    it('should respond to the issued request on the specified host', async () => {
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenHEAD()
        .respondWith();

      const response = await axios.head(host);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond to the issued request on the specified host and given path', async () => {
      const path = '/test';
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenHEAD({ path })
        .respondWith();

      const response = await axios.head(`${host}${path}`);

      expect(response).to.not.undefined;

      mock.clean();
    });

    it('should respond with given status to the issued request on the specified host', async () => {
      const expectedStatus = 200;
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenHEAD()
        .respondWith({ statusCode: expectedStatus });

      const { status } = await axios.head(host);

      expect(status).to.eql(expectedStatus);

      mock.clean();
    });

    it('should respond with given body to the issued request on the specified host', async () => {
      const expectedBody = { irrelevant: true };
      const host = 'http://localhost';
      const mock = BackendMock.createFor(host);

      mock
        .whenHEAD()
        .respondWith({ body: expectedBody });

      const { data } = await axios.head(host);

      expect(data).to.eql(expectedBody);

      mock.clean();
    });

  });

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
