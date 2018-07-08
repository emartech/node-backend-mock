import { BackendMockError } from './backend-mock-error';
import { expect } from 'chai';

/* tslint:disable no-unbound-method */

describe('Backend Mock Error', () => {

  context('@name', () => {

    it('should return class name', () => {
      const interceptors = ['http://domain.com'];
      const error = new BackendMockError(interceptors);
      expect(error.name).to.eql('BackendMockError');
    });

  });

  context('@message', () => {

    it('should return easily understandable message about the error', () => {
      const interceptors = ['http://domain.com'];
      const error = new BackendMockError(interceptors);
      expect(error.message).to.contain('There are unresolved interceptors!');
    });

    it('should include domain for interceptor', () => {
      const interceptors = ['http://domain.com'];
      const error = new BackendMockError(interceptors);
      expect(error.message).to.contain('http://domain.com');
    });

  });

  context('@stack', () => {

    it('should include error class and message if stack trace capture is exist', () => {
      const interceptors = ['http://domain.com'];
      const error = new BackendMockError(interceptors);
      expect(error.stack).to.contain('BackendMockError: There are unresolved interceptors!');
    });

    it('should include error class and message if stack trace capture is not exist', () => {
      const captureStackTrace = Error.captureStackTrace;
      (Error as any).captureStackTrace = undefined;

      const interceptors = ['http://domain.com'];
      const error = new BackendMockError(interceptors);
      expect(error.stack).to.contain('Error: There are unresolved interceptors!');

      Error.captureStackTrace = captureStackTrace;
    });

  });

});
