import { NanoEvent } from './event';

export class NanoKeyboardEvent<T> extends NanoEvent<KeyboardEvent, T> {
  public key: string;

  constructor(event: KeyboardEvent) {
    super(event);
    this.key = event.key;
  }
}
