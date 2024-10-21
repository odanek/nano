import { NanoEvent } from './event';
import { NanoEventType } from './event-type';

type NanoPointerEventType =
  | NanoEventType.PointerDown
  | NanoEventType.PointerUp
  | NanoEventType.PointerEnter
  | NanoEventType.PointerLeave
  | NanoEventType.PointerMove
  | NanoEventType.PointerClick;

interface Options {
  type: NanoPointerEventType;
  target: EventTarget | null;
}

export class NanoPointerEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: PointerEvent) {
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
      case 'pointermove':
        return NanoEventType.PointerMove;
      case 'pointerclick':
        return NanoEventType.PointerClick;
      default:
        throw new Error(`Event type ${type} is not a pointer event`);
    }
  }
}
