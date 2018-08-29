# Examples

- [Intercept request without any specific expectation](#intercept-request-without-any-specific-expectation)
- [Intercept multiple requests to the same host and with the same response](#intercept-multiple-requests-to-the-same-host-and-with-the-same-response)
- [Intercept request to the given host with expected or matching path](#intercept-request-to-the-given-host-with-expected-or-matching-path)
- [Intercept request to the given host with matching body and/or headers](#intercept-request-to-the-given-host-with-matching-body-and-headers)
- [Intercept request to the given host with customized response](#intercept-request-to-the-given-host-with-customized-response)
- [Intercept requests to the given host with the same response multiple times](#intercept-requests-to-the-given-host-with-the-same-response-multiple-times)

### Intercept request without any specific expectation

```typescript
const host = 'https://service.example.net';
const mock = BackendMock.createFor(host);

mock
  .whenPOST()
  .respondWith();

await Axios.post(host);

mock.verifyAndRestore();
```

### Intercept multiple requests to the same host and with the same response

```typescript
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
```

### Intercept request to the given host with expected or matching path

```typescript
const host = 'https://service.example.net';
const mock = BackendMock.createFor(host);

mock
  .whenPOST({ path: '/api/healthcheck' })
  .whenDELETE({ path: /\/[a-z]+\/healthcheck/ })
  .respondWith();

await Axios.post(`${host}/api/healthcheck`);
await Axios.delete(`${host}/api/healthcheck`);

mock.verifyAndRestore();
```

### Intercept request to the given host with matching body and headers

```typescript
const host = 'https://service.example.net';
const requestBody = { shouldCheck: true };
const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
const mock = BackendMock.createFor(host);

mock
  .whenPOST({ path: '/api/healthcheck', body: requestBody, ...requestHeaders })
  .respondWith();

await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

mock.verifyAndRestore();
```

### Intercept request to the given host with customized response

```typescript
const host = 'https://service.example.net';
const mock = BackendMock.createFor(host);

mock
  .whenPOST({ path: '/api/healthcheck' })
  .respondWith({ statusCode: 201, body: { id: 1000 } });

await Axios.post(`${host}/api/healthcheck`);

mock.verifyAndRestore();
```

### Intercept requests to the given host with the same response multiple times

```typescript
const host = 'https://service.example.net';
const mock = BackendMock.createFor(host);

mock
  .whenPOST({ path: '/api/healthcheck' })
  .respondWith({ repeat: 2 });

await Axios.post(`${host}/api/healthcheck`);
await Axios.post(`${host}/api/healthcheck`);

mock.verifyAndRestore();
```
