import { NanoEvent } from './event';
import { NanoEventType } from './event-type';

type NanoFocusEventType = NanoEventType.FocusIn | NanoEventType.FocusOut;

interface Options {
  type: NanoFocusEventType;
  target: EventTarget | null;
}

export class NanoFocusEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: FocusEvent) {
    return new NanoFocusEvent({
      target: nativeEvent.target,
      type: NanoFocusEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): NanoFocusEventType {
    switch (type) {
      case 'focusin':
        return NanoEventType.FocusIn;
      case 'focusout':
        return NanoEventType.FocusOut;
      default:
        throw new Error(`Event type ${type} is not a focus event`);
    }
  }
}
