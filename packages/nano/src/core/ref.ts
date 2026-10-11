export interface Ref<T = unknown> {
  current: T;
}

export type PropsWithRef<P = unknown> = P & {
  ref?: Ref | undefined;
};

class RefImpl<T = unknown> implements Ref<T> {
  public current: T;

  constructor(initialValue: T) {
    this.current = initialValue;
  }
}

export function createRef<T>(initialValue: T): Ref<T> {
  return new RefImpl(initialValue);
}
