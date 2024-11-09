import { NanoEvent } from './event';
import { NanoEventType } from './type';

type NanoKeyboardEventType =
  | NanoEventType.KeyDown
  | NanoEventType.KeyUp
  | NanoEventType.KeyPress;

interface Options<T> {
  type: NanoKeyboardEventType;
  target: T;
  key: string;
}

export class NanoKeyboardEvent<T> extends NanoEvent<T> {
  constructor(options: Options<T>) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: KeyboardEvent): NanoKeyboardEvent<unknown> {
    return new NanoKeyboardEvent({
      target: nativeEvent.target,
      type: NanoKeyboardEvent.getType(nativeEvent.type),
      key: nativeEvent.key,
    });
  }

  static getType(type: string): NanoKeyboardEventType {
    switch (type) {
      case 'keydown':
        return NanoEventType.KeyDown;
      case 'keyup':
        return NanoEventType.KeyUp;
      case 'keypress':
        return NanoEventType.KeyPress;
      default:
        throw new Error(`Event type ${type} is not a keyboard event`);
    }
  }
}
