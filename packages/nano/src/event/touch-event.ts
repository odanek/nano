import { NanoUiEvent } from './ui-event';

export class NanoTouchEvent<T> extends NanoUiEvent<TouchEvent, T> {
  public readonly altKey: boolean;
  public readonly changedTouches: TouchList;
  public readonly ctrlKey: boolean;
  public readonly metaKey: boolean;
  public readonly shiftKey: boolean;
  public readonly targetTouches: TouchList;
  public readonly touches: TouchList;

  constructor(event: TouchEvent) {
    super(event);
    this.altKey = event.altKey;
    this.changedTouches = event.changedTouches;
    this.ctrlKey = event.ctrlKey;
    this.metaKey = event.metaKey;
    this.shiftKey = event.shiftKey;
    this.targetTouches = event.targetTouches;
    this.touches = event.touches;
  }
}
