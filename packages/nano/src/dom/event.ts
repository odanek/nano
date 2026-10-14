import type { PropsWithChildren, Renderable } from '../api/renderable';
import type { ValueOf } from '../shared/type';

export type DomEvent = globalThis.Event;
export type DomUiEvent = globalThis.UIEvent;
export type DomClipboardEvent = globalThis.ClipboardEvent;
export type DomFocusEvent = globalThis.FocusEvent;
export type DomInputEvent = globalThis.InputEvent;
export type DomKeyboardEvent = globalThis.KeyboardEvent;
export type DomMouseEvent = globalThis.MouseEvent;
export type DomPointerEvent = globalThis.PointerEvent;
export type DomTouchEvent = globalThis.TouchEvent;
export type DomWheelEvent = globalThis.WheelEvent;

export const EventType = {
  // Pointer events
  AuxClick: 'auxClick',
  PointerCancel: 'pointerCancel',
  PointerEnter: 'pointerEnter',
  PointerLeave: 'pointerLeave',
  PointerOver: 'pointerOver',
  PointerOut: 'pointerOut',
  PointerDown: 'pointerDown',
  PointerUp: 'pointerUp',
  PointerMove: 'pointerMove',
  Click: 'click',
  ContextMenu: 'contextMenu',
  // Mouse events
  DblClick: 'dblClick',
  // Wheel events
  Wheel: 'wheel',
  // Keyboard events
  KeyDown: 'keyDown',
  KeyUp: 'keyUp',
  KeyPress: 'keyPress',
  // Focus events
  FocusIn: 'focusIn',
  FocusOut: 'focusOut',
  // Input event
  Input: 'input',
  BeforeInput: 'beforeinput',
  // Clipboard events
  Cut: 'cut',
  Copy: 'copy',
  Paste: 'paste',
  // Generic events
  Change: 'change',
  Scroll: 'scroll',
  Select: 'select',
  // Touch events
  TouchCancel: 'touchCancel',
  TouchStart: 'touchStart',
  TouchMove: 'touchMove',
  TouchEnd: 'touchEnd',
};
export type EventTypeValue = ValueOf<typeof EventType>;

export type EventHandler<E> = (event: E) => void;

export type CaptureEventHandlerName = keyof DomCaptureEventProps<EventTarget>;

export type BubbleEventHandlerName = keyof DomBubbleEventProps<EventTarget>;

export type ModifierKey =
  | 'Alt'
  | 'AltGraph'
  | 'CapsLock'
  | 'Control'
  | 'Fn'
  | 'FnLock'
  | 'Hyper'
  | 'Meta'
  | 'NumLock'
  | 'ScrollLock'
  | 'Shift'
  | 'Super'
  | 'Symbol'
  | 'SymbolLock';

export type PointerType = 'mouse' | 'pen' | 'touch';

export class Event<
  T extends EventTarget = EventTarget,
  E extends DomEvent = DomEvent,
> {
  public readonly nativeEvent: E;
  public readonly type: EventTypeValue;
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

function getType(type: string): EventTypeValue {
  switch (type) {
    case 'auxclick':
      return EventType.AuxClick;
    case 'cut':
      return EventType.Cut;
    case 'copy':
      return EventType.Copy;
    case 'paste':
      return EventType.Paste;
    case 'focusin':
      return EventType.FocusIn;
    case 'focusout':
      return EventType.FocusOut;
    case 'change':
      return EventType.Change;
    case 'select':
      return EventType.Select;
    case 'scroll':
      return EventType.Scroll;
    case 'input':
      return EventType.Input;
    case 'beforeinput':
      return EventType.BeforeInput;
    case 'keydown':
      return EventType.KeyDown;
    case 'keyup':
      return EventType.KeyUp;
    case 'keypress':
      return EventType.KeyPress;
    case 'dblclick':
      return EventType.DblClick;
    case 'pointercancel':
      return EventType.PointerCancel;
    case 'pointerdown':
      return EventType.PointerDown;
    case 'pointerup':
      return EventType.PointerUp;
    case 'pointerenter':
      return EventType.PointerEnter;
    case 'pointerleave':
      return EventType.PointerLeave;
    case 'pointerover':
      return EventType.PointerOver;
    case 'pointerout':
      return EventType.PointerOut;
    case 'pointermove':
      return EventType.PointerMove;
    case 'click':
      return EventType.Click;
    case 'contextmenu':
      return EventType.ContextMenu;
    case 'wheel':
      return EventType.Wheel;
    case 'touchcancel':
      return EventType.TouchCancel;
    case 'touchstart':
      return EventType.TouchStart;
    case 'touchmove':
      return EventType.TouchMove;
    case 'touchend':
      return EventType.TouchEnd;
    default:
      throw new Error(`Unexpected event type: ${type}`);
  }
}

export class UiEvent<
  T extends EventTarget = EventTarget,
  E extends DomUiEvent = DomUiEvent,
> extends Event<T, E> {
  public readonly detail: number;
  public readonly view: Window | null;

  constructor(event: E) {
    super(event);
    this.detail = event.detail;
    this.view = event.view;
  }
}

export class ClipboardEvent<T extends EventTarget = EventTarget> extends Event<
  T,
  DomClipboardEvent
> {
  public readonly clipboardData: DataTransfer | null;

  constructor(event: DomClipboardEvent) {
    super(event);
    this.clipboardData = event.clipboardData;
  }
}

export class FocusEvent<T extends EventTarget = EventTarget> extends Event<
  T,
  DomFocusEvent
> {
  public readonly relatedTarget: EventTarget | null;

  constructor(event: DomFocusEvent) {
    super(event);
    this.relatedTarget = event.relatedTarget;
  }
}

export class InputEvent<T extends EventTarget = EventTarget> extends Event<
  T,
  DomInputEvent
> {
  public readonly data: string | null;
  public readonly dataTransfer: DataTransfer | null;
  public readonly inputType: string;
  public readonly isComposing: boolean;

  constructor(event: DomInputEvent) {
    super(event);
    this.data = event.data;
    this.dataTransfer = event.dataTransfer;
    this.inputType = event.inputType;
    this.isComposing = event.isComposing;
  }

  public getTargetRanges(): StaticRange[] {
    return this.nativeEvent.getTargetRanges();
  }
}

export class KeyboardEvent<T extends EventTarget = EventTarget> extends UiEvent<
  T,
  DomKeyboardEvent
> {
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

  constructor(event: DomKeyboardEvent) {
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

  public getModifierState(key: ModifierKey): boolean {
    return this.nativeEvent.getModifierState(key);
  }
}

export class MouseEvent<
  T extends EventTarget = EventTarget,
  E extends DomMouseEvent = DomMouseEvent,
> extends UiEvent<T, E> {
  public readonly altKey: boolean;
  public readonly button: number;
  public readonly buttons: number;
  public readonly clientX: number;
  public readonly clientY: number;
  public readonly offsetX: number;
  public readonly offsetY: number;
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
    this.offsetX = event.offsetX;
    this.offsetY = event.offsetY;
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

  public getModifierState(key: ModifierKey): boolean {
    return this.nativeEvent.getModifierState(key);
  }
}

export class PointerEvent<
  T extends EventTarget = EventTarget,
> extends MouseEvent<T, DomPointerEvent> {
  public readonly pointerId: number;
  public readonly pressure: number;
  public readonly tangentialPressure: number;
  public readonly tiltX: number;
  public readonly tiltY: number;
  public readonly twist: number;
  public readonly width: number;
  public readonly height: number;
  public readonly pointerType: PointerType;
  public readonly isPrimary: boolean;

  constructor(event: DomPointerEvent) {
    super(event);
    this.pointerId = event.pointerId;
    this.pressure = event.pressure;
    this.tangentialPressure = event.tangentialPressure;
    this.tiltX = event.tiltX;
    this.tiltY = event.tiltY;
    this.twist = event.twist;
    this.width = event.width;
    this.height = event.height;
    this.pointerType = event.pointerType as PointerType;
    this.isPrimary = event.isPrimary;
  }
}

export class TouchEvent<T extends EventTarget = EventTarget> extends UiEvent<
  T,
  DomTouchEvent
> {
  public readonly altKey: boolean;
  public readonly changedTouches: TouchList;
  public readonly ctrlKey: boolean;
  public readonly metaKey: boolean;
  public readonly shiftKey: boolean;
  public readonly targetTouches: TouchList;
  public readonly touches: TouchList;

  constructor(event: DomTouchEvent) {
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

export class WheelEvent<T extends EventTarget = EventTarget> extends MouseEvent<
  T,
  DomWheelEvent
> {
  public readonly deltaMode: number;
  public readonly deltaX: number;
  public readonly deltaY: number;
  public readonly deltaZ: number;

  constructor(event: DomWheelEvent) {
    super(event);
    this.deltaMode = event.deltaMode;
    this.deltaX = event.deltaX;
    this.deltaY = event.deltaY;
    this.deltaZ = event.deltaZ;
  }
}

type EventFilterProps = PropsWithChildren<DomEventProps<Element>>;

export function EventFilter(props: EventFilterProps): Renderable {
  return props.children ?? null;
}

export type DomCaptureEventProps<T extends EventTarget> = {
  // Pointer
  onCaptureAuxClick?: EventHandler<PointerEvent<T>> | undefined;
  onCapturePointerCancel?: EventHandler<PointerEvent<T>> | undefined;
  onCapturePointerDown?: EventHandler<PointerEvent<T>> | undefined;
  onCapturePointerUp?: EventHandler<PointerEvent<T>> | undefined;
  onCapturePointerEnter?: EventHandler<PointerEvent<T>> | undefined;
  onCapturePointerLeave?: EventHandler<PointerEvent<T>> | undefined;
  onCapturePointerOver?: EventHandler<PointerEvent<T>> | undefined;
  onCapturePointerOut?: EventHandler<PointerEvent<T>> | undefined;
  onCapturePointerMove?: EventHandler<PointerEvent<T>> | undefined;
  onCaptureClick?: EventHandler<PointerEvent<T>> | undefined;
  onCaptureContextMenu?: EventHandler<PointerEvent<T>> | undefined;
  // Mouse
  onCaptureDblClick?: EventHandler<MouseEvent<T>> | undefined;
  // Wheel
  onCaptureWheel?: EventHandler<WheelEvent<T>> | undefined;
  // Focus
  onCaptureFocusIn?: EventHandler<FocusEvent<T>> | undefined;
  onCaptureFocusOut?: EventHandler<FocusEvent<T>> | undefined;
  // Clipboard
  onCaptureCut?: EventHandler<ClipboardEvent<T>> | undefined;
  onCaptureCopy?: EventHandler<ClipboardEvent<T>> | undefined;
  onCapturePaste?: EventHandler<ClipboardEvent<T>> | undefined;
  // Keyboard
  onCaptureKeyDown?: EventHandler<KeyboardEvent<T>> | undefined;
  onCaptureKeyUp?: EventHandler<KeyboardEvent<T>> | undefined;
  onCaptureKeyPress?: EventHandler<KeyboardEvent<T>> | undefined;
  // Input
  onCaptureInput?: EventHandler<InputEvent<T>> | undefined;
  onCaptureBeforeInput?: EventHandler<InputEvent<T>> | undefined;
  // Generic
  onCaptureChange?: EventHandler<Event<T>> | undefined;
  onCaptureSelect?: EventHandler<Event<T>> | undefined;
  onCaptureScroll?: EventHandler<Event<T>> | undefined;
  // Touch
  onCaptureTouchCancel?: EventHandler<TouchEvent<T>> | undefined;
  onCaptureTouchStart?: EventHandler<TouchEvent<T>> | undefined;
  onCaptureTouchMove?: EventHandler<TouchEvent<T>> | undefined;
  onCaptureTouchEnd?: EventHandler<TouchEvent<T>> | undefined;
  // TODO Add missing events
};

export type DomBubbleEventProps<T extends EventTarget> = {
  // Pointer
  onAuxClick?: EventHandler<PointerEvent<T>> | undefined;
  onPointerCancel?: EventHandler<PointerEvent<T>> | undefined;
  onPointerDown?: EventHandler<PointerEvent<T>> | undefined;
  onPointerUp?: EventHandler<PointerEvent<T>> | undefined;
  onPointerEnter?: EventHandler<PointerEvent<T>> | undefined;
  onPointerLeave?: EventHandler<PointerEvent<T>> | undefined;
  onPointerOver?: EventHandler<PointerEvent<T>> | undefined;
  onPointerOut?: EventHandler<PointerEvent<T>> | undefined;
  onPointerMove?: EventHandler<PointerEvent<T>> | undefined;
  onClick?: EventHandler<PointerEvent<T>> | undefined;
  onContextMenu?: EventHandler<PointerEvent<T>> | undefined;
  // Mouse
  onDblClick?: EventHandler<MouseEvent<T>> | undefined;
  // Wheel
  onWheel?: EventHandler<WheelEvent<T>> | undefined;
  // Focus
  onFocusIn?: EventHandler<FocusEvent<T>> | undefined;
  onFocusOut?: EventHandler<FocusEvent<T>> | undefined;
  // Clipboard
  onCut?: EventHandler<ClipboardEvent<T>> | undefined;
  onCopy?: EventHandler<ClipboardEvent<T>> | undefined;
  onPaste?: EventHandler<ClipboardEvent<T>> | undefined;
  // Keyboard
  onKeyDown?: EventHandler<KeyboardEvent<T>> | undefined;
  onKeyUp?: EventHandler<KeyboardEvent<T>> | undefined;
  onKeyPress?: EventHandler<KeyboardEvent<T>> | undefined;
  // Input
  onInput?: EventHandler<InputEvent<T>> | undefined;
  onBeforeInput?: EventHandler<InputEvent<T>> | undefined;
  // Generic
  onChange?: EventHandler<Event<T>> | undefined;
  onSelect?: EventHandler<Event<T>> | undefined;
  onScroll?: EventHandler<Event<T>> | undefined;
  // Touch
  onTouchCancel?: EventHandler<TouchEvent<T>> | undefined;
  onTouchStart?: EventHandler<TouchEvent<T>> | undefined;
  onTouchMove?: EventHandler<TouchEvent<T>> | undefined;
  onTouchEnd?: EventHandler<TouchEvent<T>> | undefined;
  // TODO Add missing events
};

export type DomEventProps<T extends EventTarget> = DomCaptureEventProps<T> &
  DomBubbleEventProps<T>;
