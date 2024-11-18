import { NanoMouseEvent } from './mouse-event';

export class NanoWheelEvent<T> extends NanoMouseEvent<WheelEvent, T> {
  public readonly deltaMode: number;
  public readonly deltaX: number;
  public readonly deltaY: number;
  public readonly deltaZ: number;

  constructor(event: WheelEvent) {
    super(event);
    this.deltaMode = event.deltaMode;
    this.deltaX = event.deltaX;
    this.deltaY = event.deltaY;
    this.deltaZ = event.deltaZ;
  }
}
