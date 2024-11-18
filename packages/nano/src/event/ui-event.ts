import { NanoEvent } from './event';

export class NanoUiEvent<E extends UIEvent, T> extends NanoEvent<E, T> {
  public readonly detail: number;
  public readonly view: Window | null;

  constructor(event: E) {
    super(event);
    this.detail = event.detail;
    this.view = event.view;
  }
}
