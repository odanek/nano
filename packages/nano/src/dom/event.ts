import type { PropsWithChildren, Renderable } from '../api/renderable';
import type { ValueOf } from '../shared/type';

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

export class NanoEvent<
  T extends EventTarget = EventTarget,
  E extends Event = Event,
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

export class NanoUiEvent<
  T extends EventTarget = EventTarget,
  E extends UIEvent = UIEvent,
> extends NanoEvent<T, E> {
  public readonly detail: number;
  public readonly view: Window | null;

  constructor(event: E) {
    super(event);
    this.detail = event.detail;
    this.view = event.view;
  }
}

export class NanoClipboardEvent<
  T extends EventTarget = EventTarget,
> extends NanoEvent<T, ClipboardEvent> {
  public readonly clipboardData: DataTransfer | null;

  constructor(event: ClipboardEvent) {
    super(event);
    this.clipboardData = event.clipboardData;
  }
}

export class NanoFocusEvent<
  T extends EventTarget = EventTarget,
> extends NanoEvent<T, FocusEvent> {
  public readonly relatedTarget: EventTarget | null;

  constructor(event: FocusEvent) {
    super(event);
    this.relatedTarget = event.relatedTarget;
  }
}

export class NanoInputEvent<
  T extends EventTarget = EventTarget,
> extends NanoEvent<T, InputEvent> {
  public readonly data: string | null;
  public readonly dataTransfer: DataTransfer | null;
  public readonly inputType: string;
  public readonly isComposing: boolean;

  constructor(event: InputEvent) {
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

export class NanoKeyboardEvent<
  T extends EventTarget = EventTarget,
> extends NanoUiEvent<T, KeyboardEvent> {
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

  public getModifierState(key: ModifierKey): boolean {
    return this.nativeEvent.getModifierState(key);
  }
}

export class NanoMouseEvent<
  T extends EventTarget = EventTarget,
  E extends MouseEvent = MouseEvent,
> extends NanoUiEvent<T, E> {
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

export class NanoPointerEvent<
  T extends EventTarget = EventTarget,
> extends NanoMouseEvent<T, PointerEvent> {
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

  constructor(event: PointerEvent) {
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

export class NanoTouchEvent<
  T extends EventTarget = EventTarget,
> extends NanoUiEvent<T, TouchEvent> {
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

export class NanoWheelEvent<
  T extends EventTarget = EventTarget,
> extends NanoMouseEvent<T, WheelEvent> {
  public readonly deltaMode: number;
  public readonly deltaX: number;
  public readonly deltaY: number;
  public readonly deltaZ: number;

  constructor(event: WheelEvent) {
    super(event);
    this.deltaMode = event.deltaMode;
    this.deltaX = event.deltaX;
    this.deltaY = event.deltaY;
    this.deltaZ = event.deltaZ;
  }
}

type NanoEventFilterProps = PropsWithChildren<DomEventProps<Element>>;

// TODO TS does not allow the return value to be NanoChildren
export function NanoEventFilter(props: NanoEventFilterProps): Renderable {
  return props.children ?? null;
}

export type DomCaptureEventProps<T extends EventTarget> = {
  // Pointer
  onCaptureAuxClick?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerCancel?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerDown?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerUp?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerEnter?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerLeave?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerOver?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerOut?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerMove?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCaptureClick?: EventHandler<NanoPointerEvent<T>> | undefined;
  onCaptureContextMenu?: EventHandler<NanoPointerEvent<T>> | undefined;
  // Mouse
  onCaptureDblClick?: EventHandler<NanoMouseEvent<T>> | undefined;
  // Wheel
  onCaptureWheel?: EventHandler<NanoWheelEvent<T>> | undefined;
  // Focus
  onCaptureFocusIn?: EventHandler<NanoFocusEvent<T>> | undefined;
  onCaptureFocusOut?: EventHandler<NanoFocusEvent<T>> | undefined;
  // Clipboard
  onCaptureCut?: EventHandler<NanoClipboardEvent<T>> | undefined;
  onCaptureCopy?: EventHandler<NanoClipboardEvent<T>> | undefined;
  onCapturePaste?: EventHandler<NanoClipboardEvent<T>> | undefined;
  // Keyboard
  onCaptureKeyDown?: EventHandler<NanoKeyboardEvent<T>> | undefined;
  onCaptureKeyUp?: EventHandler<NanoKeyboardEvent<T>> | undefined;
  onCaptureKeyPress?: EventHandler<NanoKeyboardEvent<T>> | undefined;
  // Input
  onCaptureInput?: EventHandler<NanoInputEvent<T>> | undefined;
  onCaptureBeforeInput?: EventHandler<NanoInputEvent<T>> | undefined;
  // Generic
  onCaptureChange?: EventHandler<NanoEvent<T>> | undefined;
  onCaptureSelect?: EventHandler<NanoEvent<T>> | undefined;
  onCaptureScroll?: EventHandler<NanoEvent<T>> | undefined;
  // Touch
  onCaptureTouchCancel?: EventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchStart?: EventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchMove?: EventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchEnd?: EventHandler<NanoTouchEvent<T>> | undefined;
  // TODO Add missing events
};

export type DomBubbleEventProps<T extends EventTarget> = {
  // Pointer
  onAuxClick?: EventHandler<NanoPointerEvent<T>> | undefined;
  onPointerCancel?: EventHandler<NanoPointerEvent<T>> | undefined;
  onPointerDown?: EventHandler<NanoPointerEvent<T>> | undefined;
  onPointerUp?: EventHandler<NanoPointerEvent<T>> | undefined;
  onPointerEnter?: EventHandler<NanoPointerEvent<T>> | undefined;
  onPointerLeave?: EventHandler<NanoPointerEvent<T>> | undefined;
  onPointerOver?: EventHandler<NanoPointerEvent<T>> | undefined;
  onPointerOut?: EventHandler<NanoPointerEvent<T>> | undefined;
  onPointerMove?: EventHandler<NanoPointerEvent<T>> | undefined;
  onClick?: EventHandler<NanoPointerEvent<T>> | undefined;
  onContextMenu?: EventHandler<NanoPointerEvent<T>> | undefined;
  // Mouse
  onDblClick?: EventHandler<NanoMouseEvent<T>> | undefined;
  // Wheel
  onWheel?: EventHandler<NanoWheelEvent<T>> | undefined;
  // Focus
  onFocusIn?: EventHandler<NanoFocusEvent<T>> | undefined;
  onFocusOut?: EventHandler<NanoFocusEvent<T>> | undefined;
  // Clipboard
  onCut?: EventHandler<NanoClipboardEvent<T>> | undefined;
  onCopy?: EventHandler<NanoClipboardEvent<T>> | undefined;
  onPaste?: EventHandler<NanoClipboardEvent<T>> | undefined;
  // Keyboard
  onKeyDown?: EventHandler<NanoKeyboardEvent<T>> | undefined;
  onKeyUp?: EventHandler<NanoKeyboardEvent<T>> | undefined;
  onKeyPress?: EventHandler<NanoKeyboardEvent<T>> | undefined;
  // Input
  onInput?: EventHandler<NanoInputEvent<T>> | undefined;
  onBeforeInput?: EventHandler<NanoInputEvent<T>> | undefined;
  // Generic
  onChange?: EventHandler<NanoEvent<T>> | undefined;
  onSelect?: EventHandler<NanoEvent<T>> | undefined;
  onScroll?: EventHandler<NanoEvent<T>> | undefined;
  // Touch
  onTouchCancel?: EventHandler<NanoTouchEvent<T>> | undefined;
  onTouchStart?: EventHandler<NanoTouchEvent<T>> | undefined;
  onTouchMove?: EventHandler<NanoTouchEvent<T>> | undefined;
  onTouchEnd?: EventHandler<NanoTouchEvent<T>> | undefined;
  // TODO Add missing events
};

export type DomEventProps<T extends EventTarget> = DomCaptureEventProps<T> &
  DomBubbleEventProps<T>;
