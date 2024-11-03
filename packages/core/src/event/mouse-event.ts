import { NanoEvent } from './event';
import { NanoEventType } from './event-type';

type NanoMouseEventType = NanoEventType.DblClick;

interface Options {
  type: NanoMouseEventType;
  target: EventTarget | null;
}

export class NanoMouseEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: MouseEvent): NanoMouseEvent {
    return new NanoMouseEvent({
      target: nativeEvent.target,
      type: NanoMouseEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): NanoMouseEventType {
    switch (type) {
      case 'dblclick':
        return NanoEventType.DblClick;
      default:
        throw new Error(`Event type ${type} is not a mouse event`);
    }
  }
}
