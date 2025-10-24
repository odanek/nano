import { NanoEventType, type NanoEventTypeValue } from './type';

export class NanoEvent<E extends Event, T> {
  public readonly nativeEvent: E;
  public readonly type: NanoEventTypeValue;
  public readonly target: T;
  public readonly bubbles: boolean;
  public readonly cancelable: boolean;
  public defaultPrevented: boolean;
  public propagationStopped: boolean;
  public readonly isTrusted: boolean;
  public readonly timeStamp: number;

  constructor(event: E) {
    this.nativeEvent = event;
    this.type = getType(event.type);
    this.target = event.target as T;
    this.bubbles = event.bubbles;
    this.cancelable = event.cancelable;
    this.defaultPrevented = false;
    this.propagationStopped = false;
    this.isTrusted = event.isTrusted;
    this.timeStamp = event.timeStamp;
  }

  public preventDefault(): void {
    this.defaultPrevented = true;
  }

  public isDefaultPrevented(): boolean {
    return this.defaultPrevented;
  }

  public stopPropagation(): void {
    this.propagationStopped = true;
  }

  public isPropagationStopped(): boolean {
    return this.propagationStopped;
  }
}

function getType(type: string): NanoEventTypeValue {
  switch (type) {
    case 'auxclic':
      return NanoEventType.AuxClick;
    case 'cut':
      return NanoEventType.Cut;
    case 'copy':
      return NanoEventType.Copy;
    case 'paste':
      return NanoEventType.Paste;
    case 'focusin':
      return NanoEventType.FocusIn;
    case 'focusout':
      return NanoEventType.FocusOut;
    case 'change':
      return NanoEventType.Change;
    case 'select':
      return NanoEventType.Select;
    case 'scroll':
      return NanoEventType.Scroll;
    case 'input':
      return NanoEventType.Input;
    case 'beforeinput':
      return NanoEventType.BeforeInput;
    case 'keydown':
      return NanoEventType.KeyDown;
    case 'keyup':
      return NanoEventType.KeyUp;
    case 'keypress':
      return NanoEventType.KeyPress;
    case 'dblclick':
      return NanoEventType.DblClick;
    case 'pointercancel':
      return NanoEventType.PointerCancel;
    case 'pointerdown':
      return NanoEventType.PointerDown;
    case 'pointerup':
      return NanoEventType.PointerUp;
    case 'pointerenter':
      return NanoEventType.PointerEnter;
    case 'pointerleave':
      return NanoEventType.PointerLeave;
    case 'pointerover':
      return NanoEventType.PointerOver;
    case 'pointerout':
      return NanoEventType.PointerOut;
    case 'pointermove':
      return NanoEventType.PointerMove;
    case 'click':
      return NanoEventType.Click;
    case 'contextmenu':
      return NanoEventType.ContextMenu;
    case 'wheel':
      return NanoEventType.Wheel;
    case 'touchcancel':
      return NanoEventType.TouchCancel;
    case 'touchstart':
      return NanoEventType.TouchStart;
    case 'touchmove':
      return NanoEventType.TouchMove;
    case 'touchend':
      return NanoEventType.TouchEnd;
    default:
      throw new Error(`Unexpected event type: ${type}`);
  }
}
