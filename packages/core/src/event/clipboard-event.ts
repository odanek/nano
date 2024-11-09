import { NanoEvent } from './event';
import { NanoEventType } from './type';

type NanoClipboardEventType =
  | NanoEventType.Cut
  | NanoEventType.Copy
  | NanoEventType.Paste;

interface Options {
  type: NanoClipboardEventType;
  target: EventTarget | null;
}

export class NanoClipboardEvent extends NanoEvent {
  constructor(options: Options) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: ClipboardEvent): NanoClipboardEvent {
    return new NanoClipboardEvent({
      target: nativeEvent.target,
      type: NanoClipboardEvent.getType(nativeEvent.type),
    });
  }

  static getType(type: string): NanoClipboardEventType {
    switch (type) {
      case 'cut':
        return NanoEventType.Cut;
      case 'copy':
        return NanoEventType.Copy;
      case 'paste':
        return NanoEventType.Paste;
      default:
        throw new Error(`Event type ${type} is not a clipboard event`);
    }
  }
}
