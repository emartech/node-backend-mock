import { isFunction, isEmpty, not, unique } from './utils';
import { expect } from 'chai';

describe('Utils', () => {

  context('#isFunction', () => {

    it('should return true if given parameter is a function object', () => {
      const result = isFunction(new Function());
      expect(result).to.eql(true);
    });

    it('should return true if given parameter is a fat arrow function', () => {
      const result = isFunction(() => { return; });
      expect(result).to.eql(true);
    });

    it('should return true if given parameter is a simple function', () => {
      const result = isFunction(function given() { return; });
      expect(result).to.eql(true);
    });

    it('should return true if given parameter is an async function', () => {
      const result = isFunction(async function given() { return; });
      expect(result).to.eql(true);
    });

    it('should return true if given parameter is a generator function', () => {
      const result = isFunction(function * given() { yield; });
      expect(result).to.eql(true);
    });

    it('should return false if given parameter is not a function-like object', () => {
      const result = isFunction({ simple: true });
      expect(result).to.eql(false);
    });

  });

  context('#isEmpty', () => {

    it('should return true if given array has zero elements', () => {
      const result = isEmpty([]);
      expect(result).to.eql(true);
    });

    it('should return false if given array has elements', () => {
      const result = isEmpty([1, 2, 3]);
      expect(result).to.eql(false);
    });

    it('should return true if given object has zero fields', () => {
      const result = isEmpty({});
      expect(result).to.eql(true);
    });

    it('should return false if given object has fields', () => {
      const result = isEmpty({ field: 'value' });
      expect(result).to.eql(false);
    });

  });

  context('#not', () => {

    it('should return true if given value is false', () => {
      const result = not(false);
      expect(result).to.eql(true);
    });

    it('should return false if given value is true', () => {
      const result = not(true);
      expect(result).to.eql(false);
    });

  });

  context('#unique', () => {

    it('should return given array if it empty', () => {
      const result = unique([]);
      expect(result).to.eql([]);
    });

    it('should return given array if it does not contain duplications', () => {
      const result = unique([1, 2, 3]);
      expect(result).to.eql([1, 2, 3]);
    });

    it('should return given array without duplications', () => {
      const result = unique([1, 1, 2, 2, 3]);
      expect(result).to.eql([1, 2, 3]);
    });

  });

});
