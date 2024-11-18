import { NanoModifierKey } from './type';
import { NanoUiEvent } from './ui-event';

export class NanoKeyboardEvent<T> extends NanoUiEvent<KeyboardEvent, T> {
  public readonly altKey: boolean;
  /** @deprecated */
  public readonly charCode: number;
  public readonly ctrlKey: boolean;
  public readonly code: string;
  public readonly key: string;
  /** @deprecated */
  public readonly keyCode: number;
  public readonly location: number;
  public readonly metaKey: boolean;
  public readonly repeat: boolean;
  public readonly shiftKey: boolean;
  /** @deprecated */
  public readonly which: number;

  constructor(event: KeyboardEvent) {
    super(event);
    this.altKey = event.altKey;
    this.charCode = event.charCode;
    this.ctrlKey = event.ctrlKey;
    this.code = event.code;
    this.key = event.key;
    this.keyCode = event.keyCode;
    this.location = event.location;
    this.metaKey = event.metaKey;
    this.repeat = event.repeat;
    this.shiftKey = event.shiftKey;
    this.which = event.which;
  }

  public getModifierState(key: NanoModifierKey): boolean {
    return this.nativeEvent.getModifierState(key);
  }
}
