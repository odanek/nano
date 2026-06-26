import { NanoEvent } from './event';

export class NanoUiEvent<
  T extends EventTarget,
  E extends UIEvent,
> extends NanoEvent<T, E> {
  public readonly detail: number;
  public readonly view: Window | null;

  constructor(event: E) {
    super(event);
    this.detail = event.detail;
    this.view = event.view;
  }
}
