import { NanoEvent } from './event';
import { NanoEventType } from './type';

export type NanoMouseEventType = NanoEventType.DblClick;

interface Options<T> {
  type: NanoMouseEventType;
  target: T;
}

export class NanoMouseEvent<T> extends NanoEvent<T> {
  constructor(options: Options<T>) {
    super(options);
  }

  static fromNative(nativeEvent: MouseEvent): NanoMouseEvent<unknown> {
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
