import { NanoEventType } from './event-type';

export class NanoEvent {
  public type: NanoEventType;
  public target: EventTarget | null;

  constructor(type: NanoEventType, target: EventTarget | null) {
    this.type = type;
    this.target = target;
  }
}
