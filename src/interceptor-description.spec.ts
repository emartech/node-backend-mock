import { InterceptorDescription } from './interceptor-description';
import { expect } from 'chai';

const HOST = 'http://domain.com';

describe('Interceptor Description', () => {

  context('getters', () => {

    context('@host', () => {

      it('should return given host', () => {
        const description = new InterceptorDescription(HOST);
        const result = description.host;
        expect(result).to.eql(HOST);
      });

    });

    context('@method', () => {

      it('should return GET as default method value', () => {
        const description = new InterceptorDescription(HOST);
        const result = description.method;
        expect(result).to.eql('GET');
      });

    });

    context('@path', () => {

      it('should return / as default path value', () => {
        const description = new InterceptorDescription(HOST);
        const result = description.path;
        expect(result).to.eql('/');
      });

    });

    context('@query', () => {

      it('should return {} as default query value', () => {
        const description = new InterceptorDescription(HOST);
        const result = description.query;
        expect(result).to.eql({});
      });

    });

    context('@requestBody', () => {

      it('should return {} as default requestBody value', () => {
        const description = new InterceptorDescription(HOST);
        const result = description.requestBody;
        expect(result).to.eql({});
      });

    });

    context('@responseStatusCode', () => {

      it('should return 200 as default responseStatusCode value', () => {
        const description = new InterceptorDescription(HOST);
        const result = description.responseStatusCode;
        expect(result).to.eql(200);
      });

    });

    context('@responseBody', () => {

      it('should return {} as default responseBody value', () => {
        const description = new InterceptorDescription(HOST);
        const result = description.responseBody;
        expect(result).to.eql({});
      });

    });

    context('@options', () => {

      it('should return default options value', () => {
        const description = new InterceptorDescription(HOST);
        const result = description.options;
        expect(result).to.eql({ allowUnmocked: false, badheaders: [] });
      });

    });

  });

  context('methods', () => {

    context('#setMethod', () => {

      it('should set given method', () => {
        const description = new InterceptorDescription(HOST);
        description.setMethod('POST');
        expect(description.method).to.eql('POST');
      });

    });

    context('#setPath', () => {

      it('should set given path', () => {
        const description = new InterceptorDescription(HOST);
        description.setPath('/path');
        expect(description.path).to.eql('/path');
      });

    });

    context('#setQuery', () => {

      it('should set given query', () => {
        const description = new InterceptorDescription(HOST);
        description.setQuery({ parameter: 1 });
        expect(description.query).to.eql({ parameter: 1 });
      });

    });

    context('#setRequestBody', () => {

      it('should set given request body', () => {
        const description = new InterceptorDescription(HOST);
        description.setRequestBody({ data: {} });
        expect(description.requestBody).to.eql({ data: {} });
      });

    });

    context('#setResponseStatusCode', () => {

      it('should set given response status code', () => {
        const description = new InterceptorDescription(HOST);
        description.setResponseStatusCode(401);
        expect(description.responseStatusCode).to.eql(401);
      });

    });

    context('#setResponseBody', () => {

      it('should set given response body', () => {
        const description = new InterceptorDescription(HOST);
        description.setResponseBody({ data: {} });
        expect(description.responseBody).to.eql({ data: {} });
      });

    });

  });

});
