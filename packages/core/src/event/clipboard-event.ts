import { NanoEvent } from './event';
import { NanoEventType } from './type';

type NanoClipboardEventType =
  | NanoEventType.Cut
  | NanoEventType.Copy
  | NanoEventType.Paste;

interface Options<T> {
  type: NanoClipboardEventType;
  target: T;
}

export class NanoClipboardEvent<T> extends NanoEvent<T> {
  constructor(options: Options<T>) {
    super(options.type, options.target);
  }

  static fromNative(nativeEvent: ClipboardEvent): NanoClipboardEvent<unknown> {
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
