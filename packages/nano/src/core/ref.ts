export interface Ref<T = unknown> {
  current: T;
}

// TODO Where to put the impls?
export function createRef<T>(initialValue: T): Ref<T> {
  return new RefImpl(initialValue);
}

class RefImpl<T = unknown> implements Ref<T> {
  public current: T;

  constructor(initialValue: T) {
    this.current = initialValue;
  }
}
