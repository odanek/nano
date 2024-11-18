import { NanoEvent } from './event';

export class NanoWheelEvent<T> extends NanoEvent<WheelEvent, T> {
  constructor(event: WheelEvent) {
    super(event);
  }
}
