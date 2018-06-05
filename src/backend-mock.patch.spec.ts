import { BackendMock } from './backend-mock';
import { expect } from 'chai';

import axios from 'axios';

/* tslint:disable no-unused-expression */

describe('Backend Mock', () => {

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

});
