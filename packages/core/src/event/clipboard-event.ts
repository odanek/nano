import { NanoEvent } from './event';

export class NanoClipboardEvent<T> extends NanoEvent<ClipboardEvent, T> {
  public readonly clipboardData: DataTransfer | null;

  constructor(event: ClipboardEvent) {
    super(event);
    this.clipboardData = event.clipboardData;
  }
}
