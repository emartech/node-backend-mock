import { BackendMock } from './backend-mock';

import Axios from 'axios';

describe('Backend Mock Examples', () => {

  it('should be able to mock request to the expected host without any specialization', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST()
      .respondWith();

    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
    await Axios.post(host, requestBody, requestHeaders);

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

    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };

    await Axios.post(host, requestBody, requestHeaders);
    await Axios.get(host, requestHeaders);
    await Axios.head(host, requestHeaders);

    mock.verifyAndRestore();
  });

  it('should be able to mock request to the expected host with expected path', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck' })
      .respondWith();

    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
    await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

    mock.verifyAndRestore();
  });

  it('should be able to mock request to the expected host with matching path', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: /\/[a-z]+\/healthcheck/ })
      .respondWith();

    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
    await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

    mock.verifyAndRestore();
  });

  it('should be able to mock request with expected request body', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck', body: { shouldCheck: true } })
      .respondWith();

    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
    await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

    mock.verifyAndRestore();
  });

  it('should be able to mock request with expected request header', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck', headers: { 'Content-Type': 'text/html; charset=utf-8' } })
      .respondWith();

    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
    await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

    mock.verifyAndRestore();
  });

  it('should be able to mock request with specified response', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck' })
      .respondWith({ statusCode: 201, body: { id: 1000 } });

    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
    await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

    mock.verifyAndRestore();
  });

  it('should be able to mock request with repeated response', async () => {
    const host = 'https://service.example.net';
    const mock = BackendMock.createFor(host);

    mock
      .whenPOST({ path: '/api/healthcheck' })
      .respondWith({ repeat: 2 });

    const requestBody = { shouldCheck: true };
    const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
    await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);
    await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

    mock.verifyAndRestore();
  });

});
