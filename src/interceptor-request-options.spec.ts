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

      it('should return interceptor request options instance', () => {
        const description = new InterceptorRequestOptions();
        const instance = description.setMethod('POST');
        expect(instance).to.instanceOf(InterceptorRequestOptions);
      });

    });

    context('#setPath', () => {

      it('should set given path', () => {
        const description = new InterceptorRequestOptions();
        description.setPath('/path');
        expect(description.path).to.eql('/path');
      });

      it('should return interceptor request options instance', () => {
        const description = new InterceptorRequestOptions();
        const instance = description.setPath('/path');
        expect(instance).to.instanceOf(InterceptorRequestOptions);
      });

    });

    context('#setHeaders', () => {

      it('should set given headers', () => {
        const description = new InterceptorRequestOptions();
        description.setHeaders({ 'Application-Type': 'text/json' });
        expect(description.headers).to.eql({ 'Application-Type': 'text/json' });
      });

      it('should return interceptor request options instance', () => {
        const description = new InterceptorRequestOptions();
        const instance = description.setHeaders({ 'Application-Type': 'text/json' });
        expect(instance).to.instanceOf(InterceptorRequestOptions);
      });

    });

    context('#setQuery', () => {

      it('should set given query', () => {
        const description = new InterceptorRequestOptions();
        description.setQuery({ parameter: 1 });
        expect(description.query).to.eql({ parameter: 1 });
      });

      it('should return interceptor request options instance', () => {
        const description = new InterceptorRequestOptions();
        const instance = description.setQuery({ parameter: 1 });
        expect(instance).to.instanceOf(InterceptorRequestOptions);
      });

    });

    context('#setBody', () => {

      it('should set given request body', () => {
        const description = new InterceptorRequestOptions();
        description.setBody({ data: {} });
        expect(description.body).to.eql({ data: {} });
      });

      it('should return interceptor request options instance', () => {
        const description = new InterceptorRequestOptions();
        const instance = description.setBody({ data: {} });
        expect(instance).to.instanceOf(InterceptorRequestOptions);
      });

    });

  });

});
