import { NanoMouseEvent } from './mouse-event';
import { NanoEventType } from './type';

export type NanoPointerEventType =
  | NanoEventType.PointerDown
  | NanoEventType.PointerUp
  | NanoEventType.PointerEnter
  | NanoEventType.PointerLeave
  | NanoEventType.PointerOver
  | NanoEventType.PointerOut
  | NanoEventType.PointerMove
  | NanoEventType.Click
  | NanoEventType.ContextMenu;

export class NanoPointerEvent<T> extends NanoMouseEvent<PointerEvent, T> {
  constructor(event: PointerEvent) {
    super(event);
  }
}
