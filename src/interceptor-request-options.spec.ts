import { InterceptorRequestOptions } from './interceptor-request-options';
import { expect } from 'chai';

describe('Interceptor Request Options', () => {

  context('getters', () => {

    context('@method', () => {

      it('should return GET as default http method', () => {
        const description = new InterceptorRequestOptions();
        const result = description.method;
        expect(result).to.eql('GET');
      });

    });

    context('@path', () => {

      it('should return / as default path value', () => {
        const description = new InterceptorRequestOptions();
        const result = description.path;
        expect(result).to.eql('/');
      });

    });

    context('@headers', () => {

      it('should return empty object as default path value', () => {
        const description = new InterceptorRequestOptions();
        const result = description.headers;
        expect(result).to.eql({});
      });

    });

    context('@query', () => {

      it('should return empty object as default request query', () => {
        const description = new InterceptorRequestOptions();
        const result = description.query;
        expect(result).to.eql({});
      });

    });

    context('@body', () => {

      it('should return empty object as default request body', () => {
        const description = new InterceptorRequestOptions();
        const result = description.body;
        expect(result).to.eql({});
      });

    });

  });

  context('methods', () => {

    context('#setMethod', () => {

      it('should set given method', () => {
        const description = new InterceptorRequestOptions();
        description.setMethod('POST');
        expect(description.method).to.eql('POST');
      });

    });

    context('#setPath', () => {

      it('should set given path', () => {
        const description = new InterceptorRequestOptions();
        description.setPath('/path');
        expect(description.path).to.eql('/path');
      });

    });

    context('#setHeaders', () => {

      it('should set given headers', () => {
        const description = new InterceptorRequestOptions();
        description.setHeaders({ 'Application-Type': 'text/json' });
        expect(description.headers).to.eql({ 'Application-Type': 'text/json' });
      });

    });

    context('#setQuery', () => {

      it('should set given query', () => {
        const description = new InterceptorRequestOptions();
        description.setQuery({ parameter: 1 });
        expect(description.query).to.eql({ parameter: 1 });
      });

    });

    context('#setBody', () => {

      it('should set given request body', () => {
        const description = new InterceptorRequestOptions();
        description.setBody({ data: {} });
        expect(description.body).to.eql({ data: {} });
      });

    });

  });

});
