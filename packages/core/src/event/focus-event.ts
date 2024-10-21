import { NanoEvent } from './event';
import { NanoEventType } from './event-type';

type FocusEventType = NanoEventType.FocusIn | NanoEventType.FocusOut;

interface Options {
  type: FocusEventType;
  target: EventTarget | null;
}

export class FocusEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: Event) {
    return new FocusEvent({
      target: nativeEvent.target,
      type: FocusEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): FocusEventType {
    switch (type) {
      case 'focusin':
        return NanoEventType.FocusIn;
      case 'focusout':
        return NanoEventType.FocusOut;
      default:
        throw new Error(`Event type ${type} is not a clipboard event`);
    }
  }
}
