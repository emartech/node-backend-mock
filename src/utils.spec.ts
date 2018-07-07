import { isFunction, isEmpty, not, matchObjects, add, set, range } from './utils';
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
      const result = isEmpty([1, 2, 3]); // tslint:disable-line no-magic-numbers
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

  context('#matchObjects', () => {

    it('should return true if both objects are empty', () => {
      const result = matchObjects({})({});
      expect(result).to.eql(true);
    });

    it('should return true if matched object is empty', () => {
      const result = matchObjects({})({ field: 'value', extra: true });
      expect(result).to.eql(true);
    });

    it('should return true if matched object has fields from target', () => {
      const result = matchObjects({ field: 'value' })({ field: 'value', extra: true });
      expect(result).to.eql(true);
    });

    it('should return true if matched object has the same fields from target', () => {
      const result = matchObjects({ field: 'value', extra: true })({ field: 'value', extra: true });
      expect(result).to.eql(true);
    });

    it('should return false if matched object has more fields than target', () => {
      const result = matchObjects({ field: 'value', extra: true })({ field: 'value' });
      expect(result).to.eql(false);
    });

    it('should return false if matched object has same fields with different values', () => {
      const result = matchObjects({ field: 'value', extra: false })({ field: 'value', extra: true });
      expect(result).to.eql(false);
    });

  });

  context('#add', () => {

    it('should add an element to given empty array', () => {
      const array = [] as any[];
      const element = { data: true };
      const result = add(array)(element);
      expect(result).to.eql([element]);
    });

    it('should add new element to the end of given array', () => {
      const array = [{ data: false }];
      const element = { data: true };
      const result = add(array)(element);
      expect(result).to.eql([{ data: false }, element]);
    });

  });

  context('#set', () => {

    it('should return given array if empty array and zero index given', () => {
      const array = [] as any[];
      const index = 0;
      const element = { data: true };
      const result = set(array)(index)(element);
      expect(result).to.eql(array);
    });

    it('should return given array if too large index given', () => {
      const array = [{ data: false }] as any[];
      const index = 10;
      const element = { data: true };
      const result = set(array)(index)(element);
      expect(result).to.eql(array);
    });

    it('should return given array if too small index given', () => {
      const array = [{ data: false }] as any[];
      const index = -1;
      const element = { data: true };
      const result = set(array)(index)(element);
      expect(result).to.eql(array);
    });

    it('should reset element if array with only element given with the right index', () => {
      const array = [{ data: false }] as any[];
      const index = 0;
      const element = { data: true };
      const result = set(array)(index)(element);
      expect(result).to.eql([element]);
    });

    it('should reset element if array with many elements given with the right index', () => {
      const array = [{ data: true }, { data: false }, { data: true }] as any[];
      const index = 1;
      const element = { data: true };
      const result = set(array)(index)(element);
      expect(result).to.eql([element, element, element]);
    });

    it('should reset element if array with many elements given with the head index', () => {
      const array = [{ data: false }, { data: true }, { data: true }] as any[];
      const index = 0;
      const element = { data: true };
      const result = set(array)(index)(element);
      expect(result).to.eql([element, element, element]);
    });

    it('should reset element if array with many elements given with the last index', () => {
      const array = [{ data: true }, { data: true }, { data: false }] as any[];
      const index = 2;
      const element = { data: true };
      const result = set(array)(index)(element);
      expect(result).to.eql([element, element, element]);
    });

  });

  context('#range', () => {

    it('should return zero length array if zero given', () => {
      const result = range(0);
      expect(result).to.have.length(0);
    });

    it('should return N length array if N given', () => {
      const rangeSize = 5;
      const result = range(rangeSize);
      expect(result).to.have.length(rangeSize);
    });

  });

});
