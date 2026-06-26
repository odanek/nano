import { NanoEvent } from './event';

export class NanoClipboardEvent<T extends EventTarget> extends NanoEvent<
  T,
  ClipboardEvent
> {
  public readonly clipboardData: DataTransfer | null;

  constructor(event: ClipboardEvent) {
    super(event);
    this.clipboardData = event.clipboardData;
  }
}
