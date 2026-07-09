import { NanoMouseEvent } from './mouse-event';
import { type NanoPointerType } from './type';

export class NanoPointerEvent<
  T extends EventTarget = EventTarget,
> extends NanoMouseEvent<T, PointerEvent> {
  public readonly pointerId: number;
  public readonly pressure: number;
  public readonly tangentialPressure: number;
  public readonly tiltX: number;
  public readonly tiltY: number;
  public readonly twist: number;
  public readonly width: number;
  public readonly height: number;
  public readonly pointerType: NanoPointerType;
  public readonly isPrimary: boolean;

  constructor(event: PointerEvent) {
    super(event);
    this.pointerId = event.pointerId;
    this.pressure = event.pressure;
    this.tangentialPressure = event.tangentialPressure;
    this.tiltX = event.tiltX;
    this.tiltY = event.tiltY;
    this.twist = event.twist;
    this.width = event.width;
    this.height = event.height;
    this.pointerType = event.pointerType as NanoPointerType;
    this.isPrimary = event.isPrimary;
  }
}
