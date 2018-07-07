import { InterceptorResponseOptions } from './interceptor-response-options';
import { InterceptorRequestOptions } from './interceptor-request-options';
import { Interceptor, InterceptorStatus } from './interceptor';
import { HttpStatusCodes } from './http-status-codes';
import { expect } from 'chai';

const HOST = 'http://localhost';

describe('Interceptor', () => {

  context('@host', () => {

    it('should return with given host', () => {
      const interceptor = new Interceptor(HOST);
      const result = interceptor.host;
      expect(result).to.eql(HOST);
    });

  });

  context('@settings', () => {

    it('should return with default settings if not given', () => {
      const interceptor = new Interceptor(HOST);
      const result = interceptor.settings;
      expect(result).to.eql({ allowUnmocked: false });
    });

    it('should return with given settings', () => {
      const expectedSettings = { allowUnmocked: true };
      const interceptor = new Interceptor(HOST, expectedSettings);
      const result = interceptor.settings;
      expect(result).to.eql(expectedSettings);
    });

  });

  context('@status', () => {

    it('should return with unregistered as default status', () => {
      const interceptor = new Interceptor(HOST);
      const result = interceptor.status;
      expect(result).to.eql(InterceptorStatus.UNREGISTERED);
    });

  });

  context('@requestOptions', () => {

    it('should return with default interceptor request options', () => {
      const expectedRequestOptions = new InterceptorRequestOptions();
      const interceptor = new Interceptor(HOST);
      const result = interceptor.requestOptions;
      expect(result).to.eql(expectedRequestOptions);
    });

  });

  context('@responseOptions', () => {

    it('should return with default interceptor response options', () => {
      const expectedResponseOptions = new InterceptorResponseOptions();
      const interceptor = new Interceptor(HOST);
      const result = interceptor.responseOptions;
      expect(result).to.eql(expectedResponseOptions);
    });

  });

  context('#setStatus', () => {

    it('should set status', () => {
      const expectedStatus = InterceptorStatus.REGISTERED;
      const interceptor = new Interceptor(HOST);
      interceptor.setStatus(expectedStatus);
      expect(interceptor.status).to.eql(expectedStatus);
    });

  });

  context('#setRequestOptions', () => {

    it('should set request options', () => {
      const expectedRequestOptions = new InterceptorRequestOptions();
      const interceptor = new Interceptor(HOST);

      expectedRequestOptions
        .setMethod('POST')
        .setPath('/path')
        .setQuery({ query: true })
        .setBody({ data: {} });

      interceptor.setRequestOptions(expectedRequestOptions);

      expect(interceptor.requestOptions).to.eql(expectedRequestOptions);
    });

  });

  context('#setResponseOptions', () => {

    it('should set response options', () => {
      const responseRepeats = 10;
      const expectedResponseOptions = new InterceptorResponseOptions();
      const interceptor = new Interceptor(HOST);

      expectedResponseOptions
        .setStatusCode(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .setBody({ data: {} })
        .setRepeat(responseRepeats);

      interceptor.setResponseOptions(expectedResponseOptions);

      expect(interceptor.responseOptions).to.eql(expectedResponseOptions);
    });

  });

});
