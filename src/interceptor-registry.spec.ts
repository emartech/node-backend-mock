import { InterceptorRegistry } from './interceptor-registry';
import { InterceptorFactory } from './interceptor-factory';
import { InterceptorStatus } from './interceptor';
import { expect } from 'chai';

const HOST = 'http://localhost';

describe('Interceptor Registry', () => {

  context('@unregistereds', () => {

    it('should return empty array by default', () => {
      const registry = new InterceptorRegistry();
      const result = registry.unregistereds;
      expect(result).to.eql([]);
    });

    it('should return empty array if there is no unregistered interceptor', () => {
      const registeredInterceptor = InterceptorFactory.createForGET(HOST, {});
      registeredInterceptor.setStatus(InterceptorStatus.REGISTERED);

      const registry = new InterceptorRegistry();
      registry.addInterceptor(registeredInterceptor);

      expect(registry.unregistereds).to.eql([]);
    });

    it('should return unregistered interceptors', () => {
      const unregisteredInterceptor = InterceptorFactory.createForGET(HOST, {});
      unregisteredInterceptor.setStatus(InterceptorStatus.UNREGISTERED);

      const registry = new InterceptorRegistry();
      registry.addInterceptor(unregisteredInterceptor);

      expect(registry.unregistereds).to.eql([unregisteredInterceptor]);
    });

  });

  context('#addInterceptor', () => {

    it('should add given interceptor', () => {
      const interceptor = InterceptorFactory.createForGET(HOST, {});

      const registry = new InterceptorRegistry();
      registry.addInterceptor(interceptor);

      expect(registry.unregistereds).to.eql([interceptor]);
    });

  });

  context('#clear', () => {

    it('should remove interceptors', () => {
      const interceptor = InterceptorFactory.createForGET(HOST, {});

      const registry = new InterceptorRegistry();
      registry.addInterceptor(interceptor);
      registry.clear();

      expect(registry.unregistereds).to.eql([]);
    });

  });

});
