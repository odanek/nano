import { describe, expect, it } from 'vitest';
import { capitalizeFirstLetter, emptyString } from './string';

describe('string.ts', () => {
  describe('emptyString', () => {
    it('is an empty string', () => {
      expect(emptyString).toBe('');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('upper-cases the first character', () => {
      expect(capitalizeFirstLetter('click')).toBe('Click');
      expect(capitalizeFirstLetter('a')).toBe('A');
    });

    it('leaves the rest of the string unchanged', () => {
      expect(capitalizeFirstLetter('mouseDown')).toBe('MouseDown');
      expect(capitalizeFirstLetter('aBC')).toBe('ABC');
    });

    it('returns strings that cannot be capitalized as is', () => {
      expect(capitalizeFirstLetter('')).toBe('');
      expect(capitalizeFirstLetter('Click')).toBe('Click');
      expect(capitalizeFirstLetter('1st')).toBe('1st');
    });
  });
});
