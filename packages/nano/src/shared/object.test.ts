import { describe, expect, it } from 'vitest';
import { emptyObject, objectEquals, objectHasOwnProperty } from './object';

describe('object.ts', () => {
  describe('emptyObject', () => {
    it('is an empty frozen object', () => {
      expect(Object.keys(emptyObject)).toEqual([]);
      expect(Object.isFrozen(emptyObject)).toBe(true);
    });
  });

  describe('objectEquals', () => {
    it('returns true for the same instance', () => {
      const object = { a: 1 };

      expect(objectEquals(object, object)).toBe(true);
    });

    it('returns true for objects with strictly equal values', () => {
      const value = { id: 1 };

      expect(objectEquals({ a: 1, b: value }, { b: value, a: 1 })).toBe(true);
      expect(objectEquals({}, {})).toBe(true);
    });

    it('returns false for objects with a different number of keys', () => {
      expect(objectEquals({ a: 1 }, { a: 1, b: 2 })).toBe(false);
      expect(objectEquals({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    it('returns false when a value differs', () => {
      expect(objectEquals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });

    it('returns false when the keys differ', () => {
      expect(objectEquals({ a: 1 }, { b: 1 })).toBe(false);
    });

    it('distinguishes a missing key from an undefined value', () => {
      expect(objectEquals({ a: undefined }, { b: undefined })).toBe(false);
    });

    it('ignores inherited properties of the right object', () => {
      const right = Object.create({ a: 1 }) as Record<string, unknown>;
      right['b'] = 2;

      expect(objectEquals({ a: 1 }, right)).toBe(false);
    });

    it('compares values by reference, not deeply', () => {
      expect(objectEquals({ a: { id: 1 } }, { a: { id: 1 } })).toBe(false);
    });
  });

  describe('objectHasOwnProperty', () => {
    it('returns true for own properties', () => {
      expect(objectHasOwnProperty({ a: undefined }, 'a')).toBe(true);
      expect(objectHasOwnProperty(['x'], 0)).toBe(true);
    });

    it('returns false for missing and inherited properties', () => {
      const object = Object.create({ inherited: true }) as object;

      expect(objectHasOwnProperty(object, 'inherited')).toBe(false);
      expect(objectHasOwnProperty({}, 'missing')).toBe(false);
      expect(objectHasOwnProperty({}, 'toString')).toBe(false);
    });

    it('works for objects without a prototype', () => {
      const object = Object.create(null) as Record<string, unknown>;
      object['a'] = 1;

      expect(objectHasOwnProperty(object, 'a')).toBe(true);
      expect(objectHasOwnProperty(object, 'b')).toBe(false);
    });

    it('works for objects shadowing hasOwnProperty', () => {
      const object = { hasOwnProperty: (): boolean => false, a: 1 };

      expect(objectHasOwnProperty(object, 'a')).toBe(true);
    });
  });
});
