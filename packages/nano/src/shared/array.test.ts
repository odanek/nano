import { describe, expect, it } from 'vitest';
import { arrayEquals, emptyArray } from './array';

describe('array.ts', () => {
  describe('emptyArray', () => {
    it('is an empty frozen array', () => {
      expect(emptyArray).toEqual([]);
      expect(Object.isFrozen(emptyArray)).toBe(true);
    });
  });

  describe('arrayEquals', () => {
    it('returns true for the same instance', () => {
      const array = [1, 2, 3];

      expect(arrayEquals(array, array)).toBe(true);
    });

    it('returns true for arrays with strictly equal items', () => {
      const item = { id: 1 };

      expect(arrayEquals([1, 'a', item], [1, 'a', item])).toBe(true);
      expect(arrayEquals([], emptyArray)).toBe(true);
    });

    it('returns false for arrays of different lengths', () => {
      expect(arrayEquals([1, 2], [1, 2, 3])).toBe(false);
      expect(arrayEquals([1, 2, 3], [1, 2])).toBe(false);
    });

    it('returns false when an item differs', () => {
      expect(arrayEquals([1, 2, 3], [1, 4, 3])).toBe(false);
    });

    it('compares items by reference, not deeply', () => {
      expect(arrayEquals([{ id: 1 }], [{ id: 1 }])).toBe(false);
    });

    it('treats NaN items as not equal', () => {
      expect(arrayEquals([NaN], [NaN])).toBe(false);
    });
  });
});
