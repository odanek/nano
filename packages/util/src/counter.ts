export class Counter {
  public value: number;

  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }

  next(): number {
    return ++this.value;
  }
}
