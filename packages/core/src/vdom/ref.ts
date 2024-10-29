export class NanoRef<T = unknown> {
  public current: T;

  constructor(initialValue: T) {
    this.current = initialValue;
  }
}
