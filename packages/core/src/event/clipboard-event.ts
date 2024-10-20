import { NanoEvent } from './event';
import { NanoEventType } from './event-type';

type ClipboardEventType = NanoEventType.Cut | NanoEventType.Paste;

interface Options {
  type: ClipboardEventType;
  target: EventTarget | null;
}

export class ClipboardEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: Event) {
    return new ClipboardEvent({
      target: nativeEvent.target,
      type: ClipboardEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): ClipboardEventType {
    switch (type) {
      case 'cut':
        return NanoEventType.Cut;
      case 'paste':
        return NanoEventType.Paste;
      default:
        throw new Error(`Event type ${type} is not a clipboard event`);
    }
  }
}
