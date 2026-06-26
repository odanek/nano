import { NanoEvent } from './event';
export class NanoFocusEvent<T extends EventTarget> extends NanoEvent<
  T,
  FocusEvent
> {
  public readonly relatedTarget: EventTarget | null;

  constructor(event: FocusEvent) {
    super(event);
    this.relatedTarget = event.relatedTarget;
  }
}
