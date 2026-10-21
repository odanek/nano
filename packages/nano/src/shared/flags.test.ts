import { describe, expect, it } from 'vitest';
import { isFlag } from './flags';

describe('flags.ts', () => {
  describe('isFlag', () => {
    const A = 0b001;
    const B = 0b010;
    const C = 0b100;

    it('returns true when the flag is set', () => {
      expect(isFlag(A | C, A)).toBe(true);
      expect(isFlag(A | C, C)).toBe(true);
    });

    it('returns false when the flag is not set', () => {
      expect(isFlag(A | C, B)).toBe(false);
      expect(isFlag(0, A)).toBe(false);
    });

    it('requires every bit of a combined flag to be set', () => {
      expect(isFlag(A | B | C, A | B)).toBe(true);
      expect(isFlag(A | C, A | B)).toBe(false);
    });

    it('treats an empty flag as always set', () => {
      expect(isFlag(0, 0)).toBe(true);
      expect(isFlag(A, 0)).toBe(true);
    });
  });
});
