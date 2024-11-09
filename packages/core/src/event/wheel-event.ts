import { NanoEvent } from './event';
import { NanoEventType } from './type';

type NanoWheelEventType = NanoEventType.Wheel;

interface Options {
  type: NanoWheelEventType;
  target: EventTarget | null;
}

export class NanoWheelEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: WheelEvent): NanoWheelEvent {
    return new NanoWheelEvent({
      target: nativeEvent.target,
      type: NanoWheelEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): NanoWheelEventType {
    switch (type) {
      case 'wheel':
        return NanoEventType.Wheel;
      default:
        throw new Error(`Event type ${type} is not a wheel event`);
    }
  }
}
