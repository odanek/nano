import type { Ref } from '../api/ref';

class RefImpl<T = unknown> implements Ref<T> {
  public current: T;

  constructor(initialValue: T) {
    this.current = initialValue;
  }
}

export function createRef<T>(initialValue: T): Ref<T> {
  return new RefImpl(initialValue);
}
