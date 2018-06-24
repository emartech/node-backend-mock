import { InterceptorResponseOptions } from './interceptor-response-options';
import { expect } from 'chai';

describe('Interceptor Response Options', () => {

  context('getters', () => {

    context('@statusCode', () => {

      it('should return ok as default status code value', () => {
        const description = new InterceptorResponseOptions();
        const result = description.statusCode;
        expect(result).to.eql(200);
      });

    });

    context('@body', () => {

      it('should return empty object as default response body', () => {
        const description = new InterceptorResponseOptions();
        const result = description.body;
        expect(result).to.eql({});
      });

    });

    context('@repeat', () => {

      it('should return zero as default response repeat', () => {
        const description = new InterceptorResponseOptions();
        const result = description.repeat;
        expect(result).to.eql(0);
      });

    });

  });

  context('methods', () => {

    context('#setStatusCode', () => {

      it('should set given response status code', () => {
        const description = new InterceptorResponseOptions();
        description.setStatusCode(401);
        expect(description.statusCode).to.eql(401);
      });

    });

    context('#setBody', () => {

      it('should set given response body', () => {
        const description = new InterceptorResponseOptions();
        description.setBody({ data: {} });
        expect(description.body).to.eql({ data: {} });
      });

    });

    context('#setRepeat', () => {

      it('should set given response repeat', () => {
        const description = new InterceptorResponseOptions();
        description.setRepeat(5);
        expect(description.repeat).to.eql(5);
      });

    });

  });

});
