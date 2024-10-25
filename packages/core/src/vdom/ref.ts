export class NanoRef<T = unknown> {
  public current: T | null;

  constructor() {
    this.current = null;
  }
}
