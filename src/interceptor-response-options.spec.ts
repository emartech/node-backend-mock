import { InterceptorResponseOptions } from './interceptor-response-options';
import { HttpStatusCodes } from './http-status-codes';
import { expect } from 'chai';

describe('Interceptor Response Options', () => {

  context('getters', () => {

    context('@statusCode', () => {

      it('should return ok as default status code value', () => {
        const description = new InterceptorResponseOptions();
        const result = description.statusCode;
        expect(result).to.eql(HttpStatusCodes.OK);
      });

    });

    context('@headers', () => {

      it('should return empty object as default response headers', () => {
        const description = new InterceptorResponseOptions();
        const result = description.headers;
        expect(result).to.eql({});
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
        description.setStatusCode(HttpStatusCodes.UNAUTHORIZED);
        expect(description.statusCode).to.eql(HttpStatusCodes.UNAUTHORIZED);
      });

      it('should return interceptor response options instance', () => {
        const description = new InterceptorResponseOptions();
        const instance = description.setStatusCode(HttpStatusCodes.UNAUTHORIZED);
        expect(instance).to.instanceOf(InterceptorResponseOptions);
      });

    });

    context('#setHeaders', () => {

      it('should set given response headers', () => {
        const description = new InterceptorResponseOptions();
        description.setHeaders({ 'Content-Type': 'text/html; charset=utf-8' });
        expect(description.headers).to.eql({ 'Content-Type': 'text/html; charset=utf-8' });
      });

      it('should return interceptor response options instance', () => {
        const description = new InterceptorResponseOptions();
        const instance = description.setHeaders({ 'Content-Type': 'text/html; charset=utf-8' });
        expect(instance).to.instanceOf(InterceptorResponseOptions);
      });

    });

    context('#setBody', () => {

      it('should set given response body', () => {
        const description = new InterceptorResponseOptions();
        description.setBody({ data: {} });
        expect(description.body).to.eql({ data: {} });
      });

      it('should return interceptor response options instance', () => {
        const description = new InterceptorResponseOptions();
        const instance = description.setBody({ data: {} });
        expect(instance).to.instanceOf(InterceptorResponseOptions);
      });

    });

    context('#setRepeat', () => {

      it('should set given response repeat', () => {
        const expectedRepeats = 5;
        const description = new InterceptorResponseOptions();
        description.setRepeat(expectedRepeats);
        expect(description.repeat).to.eql(expectedRepeats);
      });

      it('should return interceptor response options instance', () => {
        const repeats = 5;
        const description = new InterceptorResponseOptions();
        const instance = description.setRepeat(repeats);
        expect(instance).to.instanceOf(InterceptorResponseOptions);
      });

    });

  });

});
