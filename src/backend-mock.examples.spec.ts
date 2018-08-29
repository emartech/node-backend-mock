import { HttpStatusCodes } from './http-status-codes';
import { BackendMock } from './backend-mock';

import Axios from 'axios';

describe('Backend Mock Examples', () => {

  it('should be able to mock request to the expected host without any specialization', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST()
      .respondWith();

    await Axios.post(host);

    mock.verifyAndRestore();
  });

  it('should be able to mock multiple requests to the expected host without any specialization', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST()
      .whenGET()
      .whenHEAD()
      .respondWith();

    await Axios.post(host);
    await Axios.get(host);
    await Axios.head(host);

    mock.verifyAndRestore();
  });

  it('should be able to mock request to the expected host with expected or matching path', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck' })
      .whenDELETE({ path: /\/[a-z]+\/healthcheck/ })
      .respondWith();

    await Axios.post(`${host}/api/healthcheck`);
    await Axios.delete(`${host}/api/healthcheck`);

    mock.verifyAndRestore();
  });

  it('should be able to mock request with expected request body and/or header', async () => {
    const host = 'https://service.example.net';
    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck', body: requestBody, ...requestHeaders })
      .respondWith();

    await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

    mock.verifyAndRestore();
  });

  it('should be able to mock request with specified response', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck' })
      .respondWith({ statusCode: HttpStatusCodes.CREATED, body: { id: 1000 } });

    await Axios.post(`${host}/api/healthcheck`);

    mock.verifyAndRestore();
  });

  it('should be able to mock request with repeated response', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck' })
      .respondWith({ repeat: 2 });

    await Axios.post(`${host}/api/healthcheck`);
    await Axios.post(`${host}/api/healthcheck`);

    mock.verifyAndRestore();
  });

});
