import { NanoEventType } from './type';

export class NanoEvent<T> {
  public type: NanoEventType;
  public target: T;

  constructor(type: NanoEventType, target: T) {
    this.type = type;
    this.target = target;
  }
}
