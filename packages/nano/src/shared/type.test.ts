import { describe, expectTypeOf, it } from 'vitest';
import type { AnyFunction, PlainObject, ValueOf } from './type';

describe('type.ts', () => {
  describe('AnyFunction', () => {
    it('accepts functions of any signature', () => {
      expectTypeOf<() => void>().toExtend<AnyFunction>();
      expectTypeOf<(a: number, b: string) => boolean>().toExtend<AnyFunction>();
      expectTypeOf<
        (...args: unknown[]) => Promise<void>
      >().toExtend<AnyFunction>();
    });

    it('rejects non-functions', () => {
      expectTypeOf<string>().not.toExtend<AnyFunction>();
      expectTypeOf<object>().not.toExtend<AnyFunction>();
    });
  });

  describe('PlainObject', () => {
    it('is a record of unknown values keyed by strings', () => {
      expectTypeOf<PlainObject>().toEqualTypeOf<Record<string, unknown>>();
      expectTypeOf<{ a: number; b: string }>().toExtend<PlainObject>();
    });
  });

  describe('ValueOf', () => {
    it('is the union of property value types', () => {
      expectTypeOf<ValueOf<{ Begin: 1; End: 2 }>>().toEqualTypeOf<1 | 2>();
      expectTypeOf<ValueOf<{ a: number; b: string }>>().toEqualTypeOf<
        number | string
      >();
    });
  });
});
