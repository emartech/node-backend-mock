import { InterceptorDescriptionRegistry } from './interceptor-description-registry';
import { InterceptorDescription } from './interceptor-description';
import { expect } from 'chai';

describe('Interceptor Description Registry', () => {

  context('#getUnregistereds', () => {

    it('should return only unregistered interceptor descriptions', async () => {
      const description = new InterceptorDescription('');
      const registry = new InterceptorDescriptionRegistry();

      registry.addDescription(description);
      registry.addDescription(description);
      registry.addDescription(description);
      registry.addDescription(description);
      registry.registerDescription(0);
      registry.registerDescription(2);

      expect(registry.getUnregistereds()).to.eql([
        { description, index: 1, registered: false },
        { description, index: 3, registered: false },
      ]);
    });

  });

  context('#addDescription', () => {

    it('should add descriptions with the right index and as unregistered', async () => {
      const description = new InterceptorDescription('');
      const registry = new InterceptorDescriptionRegistry();

      registry.addDescription(description);
      registry.addDescription(description);

      expect(registry.getUnregistereds()).to.eql([
        { description, index: 0, registered: false },
        { description, index: 1, registered: false },
      ]);
    });

  });

  context('#registerDescription', () => {

    it('should register interceptor description on given index', async () => {
      const description = new InterceptorDescription('');
      const registry = new InterceptorDescriptionRegistry();

      registry.addDescription(description);
      registry.addDescription(description);
      registry.registerDescription(0);

      expect(registry.getUnregistereds()).to.eql([
        { description, index: 1, registered: false },
      ]);
    });

  });

  context('#clean', () => {

    it('should remove every description', async () => {
      const description = new InterceptorDescription('');
      const registry = new InterceptorDescriptionRegistry();

      registry.addDescription(description);
      registry.addDescription(description);
      registry.clear();

      expect(registry.getUnregistereds()).to.eql([]);
    });

  });

});
