import { describe, expect, it } from 'vitest';
import { NanoElement } from '../vdom/element';
import { NanoRef } from '../vdom/ref';
import { jsx } from './factory';

describe('factory.ts', () => {
  describe('jsx', () => {
    it('creates host elements and separates refs from props', () => {
      const ref = new NanoRef<HTMLButtonElement | null>(null);

      const element = jsx(
        'button',
        { children: 'Save', className: 'primary', ref },
        'save',
      );

      expect(element).toBeInstanceOf(NanoElement);
      expect(element.type).toBe('button');
      expect(element.key).toBe('save');
      expect(element.ref).toBe(ref);
      expect(element.props).toEqual({ children: 'Save', className: 'primary' });
    });

    it('creates function-component elements with their props', () => {
      const Button = (): NanoElement => jsx('button', { children: 'Save' });

      const element = jsx(Button, { label: 'Save' });

      expect(element.type).toBe(Button);
      expect(element.props).toEqual({ label: 'Save' });
      expect(element.ref).toBeNull();
    });
  });
});
