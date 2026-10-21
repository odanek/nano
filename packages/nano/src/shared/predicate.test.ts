import { describe, expect, it } from 'vitest';
import {
  isArray,
  isFunction,
  isIterable,
  isNumber,
  isString,
  isValue,
} from './predicate';

describe('predicate.ts', () => {
  describe('isValue', () => {
    it('returns false for null and undefined', () => {
      expect(isValue(null)).toBe(false);
      expect(isValue(undefined)).toBe(false);
    });

    it('returns true for other values, including falsy ones', () => {
      for (const value of [0, '', false, NaN, {}, [], (): void => {}]) {
        expect(isValue(value)).toBe(true);
      }
    });
  });

  describe('isString', () => {
    it('returns true for primitive strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('text')).toBe(true);
    });

    it('returns false for non-strings', () => {
      for (const value of [
        null,
        undefined,
        1,
        ['a'],
        { toString: (): string => 'a' },
        // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
        new String('a') as String,
      ]) {
        expect(isString(value)).toBe(false);
      }
    });
  });

  describe('isNumber', () => {
    it('returns true for finite numbers', () => {
      for (const value of [0, -0, 1, -1.5, Number.MAX_VALUE]) {
        expect(isNumber(value)).toBe(true);
      }
    });

    it('returns false for non-finite numbers', () => {
      for (const value of [NaN, Infinity, -Infinity]) {
        expect(isNumber(value)).toBe(false);
      }
    });

    it('returns false for non-numbers', () => {
      for (const value of [null, undefined, '1', true, 1n, new Number(1)]) {
        expect(isNumber(value)).toBe(false);
      }
    });
  });

  describe('isFunction', () => {
    it('returns true for functions', () => {
      for (const value of [
        (): void => {},
        function named(): void {},
        async (): Promise<void> => {},
        class {},
        Math.max,
      ]) {
        expect(isFunction(value)).toBe(true);
      }
    });

    it('returns false for non-functions', () => {
      for (const value of [null, undefined, {}, [], 'function']) {
        expect(isFunction(value)).toBe(false);
      }
    });
  });

  describe('isArray', () => {
    it('returns true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2])).toBe(true);
      expect(isArray(Object.freeze([]))).toBe(true);
    });

    it('returns false for array-like objects and other iterables', () => {
      for (const value of [
        null,
        undefined,
        'abc',
        { length: 0 },
        new Set([1]),
        new Uint8Array(1),
      ]) {
        expect(isArray(value)).toBe(false);
      }
    });
  });

  describe('isIterable', () => {
    it('returns true for iterables', () => {
      function* generator(): Generator<number> {
        yield 1;
      }

      for (const value of [
        [],
        'abc',
        new Set(),
        new Map(),
        generator(),
        { [Symbol.iterator]: (): Iterator<never> => [][Symbol.iterator]() },
      ]) {
        expect(isIterable(value)).toBe(true);
      }
    });

    it('returns false for non-iterables', () => {
      for (const value of [
        null,
        undefined,
        1,
        true,
        {},
        { length: 0 },
        { [Symbol.iterator]: 'not a function' },
      ]) {
        expect(isIterable(value)).toBe(false);
      }
    });
  });
});
