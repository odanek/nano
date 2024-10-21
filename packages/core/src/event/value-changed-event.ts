import { NanoEvent } from './event';
import { NanoEventType } from './event-type';

type NanoValueChangedEventType = NanoEventType.Input;

interface Options {
  type: NanoValueChangedEventType;
  target: EventTarget | null;
}

export class NanoValueChangedEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: FocusEvent) {
    return new NanoValueChangedEvent({
      target: nativeEvent.target,
      type: NanoValueChangedEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): NanoValueChangedEventType {
    switch (type) {
      case 'input':
        return NanoEventType.Input;
      default:
        throw new Error(`Event type ${type} is not a focus event`);
    }
  }
}
