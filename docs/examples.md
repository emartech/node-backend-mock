# Examples

### Intercept request without any specific expectation

```typescript
const host = 'https://service.example.net';
const mock = BackendMock.createFor(host);

mock
  .whenPOST()
  .respondWith();

const requestBody = { shouldCheck: true };
const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
await Axios.post(host, requestBody, requestHeaders);

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

const requestBody = { shouldCheck: true };
const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };

await Axios.post(host, requestBody, requestHeaders);
await Axios.get(host, requestHeaders);
await Axios.head(host, requestHeaders);

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

const requestBody = { shouldCheck: true };
const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);
await Axios.delete(`${host}/api/healthcheck`);

mock.verifyAndRestore();
```

### Intercept request to the given host with matching body and/or headers

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

const requestBody = { shouldCheck: true };
const requestHeaders = { headers: { 'Content-Type': 'text/html; charset=utf-8' } };
await Axios.post(`${host}/api/healthcheck`, requestBody, requestHeaders);

mock.verifyAndRestore();
```
