import { NanoEvent } from './event';
import { NanoEventType } from './type';

export type NanoGenericEventType = NanoEventType.Change | NanoEventType.Select | NanoEventType.Scroll;

interface Options<T> {
  type: NanoEventType,
  target: T,
}

export class NanoGenericEvent<T> extends NanoEvent<T> {
  constructor(options: Options<T>) {
    super(options);
  }

  static fromNative(nativeEvent: Event): NanoGenericEvent<unknown> {
    return new NanoGenericEvent({
      target: nativeEvent.target,
      type: getType(nativeEvent.type),
    });
  }
}

function getType(type: string): NanoGenericEventType {
  switch (type) {
    case 'change':
      return NanoEventType.Change;
    case 'select':
      return NanoEventType.Select;
    case 'scroll':
      return NanoEventType.Scroll;
    default:
      throw new Error(`Event type ${type} is not a generic event`);
  }
}
