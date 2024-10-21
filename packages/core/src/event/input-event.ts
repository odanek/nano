import { NanoEvent } from './event';
import { NanoEventType } from './event-type';

type NanoInputEventType = NanoEventType.Input;

interface Options {
  type: NanoInputEventType;
  target: EventTarget | null;
}

export class NanoInputEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: InputEvent) {
    return new NanoInputEvent({
      target: nativeEvent.target,
      type: NanoInputEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): NanoInputEventType {
    switch (type) {
      case 'input':
        return NanoEventType.Input;
      default:
        throw new Error(`Event type ${type} is not a input event`);
    }
  }
}
