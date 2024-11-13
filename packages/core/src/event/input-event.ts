import { NanoEvent } from './event';
import { NanoEventType } from './type';

export type NanoInputEventType =
  | NanoEventType.Input
  | NanoEventType.BeforeInput;

interface Options<T> {
  type: NanoInputEventType;
  target: T;
}

export class NanoInputEvent<T> extends NanoEvent<T> {
  constructor(options: Options<T>) {
    super(options);
  }

  static fromNative(nativeEvent: InputEvent): NanoInputEvent<unknown> {
    return new NanoInputEvent({
      target: nativeEvent.target,
      type: NanoInputEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): NanoInputEventType {
    switch (type) {
      case 'input':
        return NanoEventType.Input;
      case 'beforeinput':
        return NanoEventType.BeforeInput;
      default:
        throw new Error(`Event type ${type} is not a input event`);
    }
  }
}
