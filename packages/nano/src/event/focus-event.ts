import { NanoEvent } from './event';
export class NanoFocusEvent<T> extends NanoEvent<FocusEvent, T> {
  public readonly relatedTarget: EventTarget | null;

  constructor(event: FocusEvent) {
    super(event);
    this.relatedTarget = event.relatedTarget;
  }
}
