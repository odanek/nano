import { NanoEvent } from './event';
import { NanoEventType } from './type';

export type NanoFocusEventType = NanoEventType.FocusIn | NanoEventType.FocusOut;

interface Options<T> {
  type: NanoFocusEventType;
  target: T;
}

export class NanoFocusEvent<T> extends NanoEvent<T> {
  constructor(options: Options<T>) {
    super(options);
  }

  static fromNative(nativeEvent: FocusEvent): NanoFocusEvent<unknown> {
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
