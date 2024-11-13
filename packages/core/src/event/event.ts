import { NanoEventType } from './type';

interface Options<T> {
  type: NanoEventType;
  target: T;
}
export class NanoEvent<T> {
  public type: NanoEventType;
  public target: T;

  constructor({ type, target }: Options<T>) {
    this.type = type;
    this.target = target;
  }
}
