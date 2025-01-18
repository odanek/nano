import { type NanoModifierKey } from './type';
import { NanoUiEvent } from './ui-event';

export class NanoMouseEvent<E extends MouseEvent, T> extends NanoUiEvent<E, T> {
  public readonly altKey: boolean;
  public readonly button: number;
  public readonly buttons: number;
  public readonly clientX: number;
  public readonly clientY: number;
  public readonly ctrlKey: boolean;
  public readonly metaKey: boolean;
  public readonly movementX: number;
  public readonly movementY: number;
  public readonly pageX: number;
  public readonly pageY: number;
  public readonly relatedTarget: EventTarget | null;
  public readonly screenX: number;
  public readonly screenY: number;
  public readonly shiftKey: boolean;

  constructor(event: E) {
    super(event);
    this.altKey = event.altKey;
    this.button = event.button;
    this.buttons = event.buttons;
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    this.ctrlKey = event.ctrlKey;
    this.metaKey = event.metaKey;
    this.movementX = event.movementX;
    this.movementY = event.movementY;
    this.pageX = event.pageX;
    this.pageY = event.pageY;
    this.relatedTarget = event.relatedTarget;
    this.screenX = event.screenX;
    this.screenY = event.screenY;
    this.shiftKey = event.shiftKey;
  }

  public getModifierState(key: NanoModifierKey): boolean {
    return this.nativeEvent.getModifierState(key);
  }
}
