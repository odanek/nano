import { NanoEvent } from './event';
import { NanoEventType } from './type';

type NanoPointerEventType =
  | NanoEventType.PointerDown
  | NanoEventType.PointerUp
  | NanoEventType.PointerEnter
  | NanoEventType.PointerLeave
  | NanoEventType.PointerOver
  | NanoEventType.PointerOut
  | NanoEventType.PointerMove
  | NanoEventType.Click;

interface Options<T> {
  type: NanoPointerEventType;
  target: T;
}

export class NanoPointerEvent<T> extends NanoEvent<T> {
  constructor(options: Options<T>) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: PointerEvent): NanoPointerEvent<unknown> {
    return new NanoPointerEvent({
      target: nativeEvent.target,
      type: NanoPointerEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): NanoPointerEventType {
    switch (type) {
      case 'pointerdown':
        return NanoEventType.PointerDown;
      case 'pointerup':
        return NanoEventType.PointerUp;
      case 'pointerenter':
        return NanoEventType.PointerEnter;
      case 'pointerleave':
        return NanoEventType.PointerLeave;
      case 'pointerover':
        return NanoEventType.PointerOver;
      case 'pointerout':
        return NanoEventType.PointerOut;
      case 'pointermove':
        return NanoEventType.PointerMove;
      case 'click':
        return NanoEventType.Click;
      default:
        throw new Error(`Event type ${type} is not a pointer event`);
    }
  }
}
