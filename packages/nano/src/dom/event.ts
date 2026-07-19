import type { ValueOf } from '../shared/type';
import type { NanoChildrenProps, NanoNode } from '../vdom/type';

export const NanoEventType = {
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
export type NanoEventTypeValue = ValueOf<typeof NanoEventType>;

export type NanoEventHandler<E> = (event: E) => void;

export type NanoCaptureEventHandlerName =
  keyof DomCaptureEventProps<EventTarget>;

export type NanoBubbleEventHandlerName = keyof DomBubbleEventProps<EventTarget>;

export type NanoModifierKey =
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

export type NanoPointerType = 'mouse' | 'pen' | 'touch';

export class NanoEvent<
  T extends EventTarget = EventTarget,
  E extends Event = Event,
> {
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
    case 'auxclick':
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

  public getModifierState(key: NanoModifierKey): boolean {
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

  public getModifierState(key: NanoModifierKey): boolean {
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
  public readonly pointerType: NanoPointerType;
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
    this.pointerType = event.pointerType as NanoPointerType;
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

type NanoEventFilterProps = DomEventProps<Element> & NanoChildrenProps;

// TODO TS does not allow the return value to be NanoChildren
export function NanoEventFilter(props: NanoEventFilterProps): NanoNode {
  return (props.children ?? null) as NanoNode;
}

export type DomCaptureEventProps<T extends EventTarget> = {
  // Pointer
  onCaptureAuxClick?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerCancel?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerDown?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerUp?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerEnter?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerLeave?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerOver?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerOut?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCapturePointerMove?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCaptureClick?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onCaptureContextMenu?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  // Mouse
  onCaptureDblClick?: NanoEventHandler<NanoMouseEvent<T>> | undefined;
  // Wheel
  onCaptureWheel?: NanoEventHandler<NanoWheelEvent<T>> | undefined;
  // Focus
  onCaptureFocusIn?: NanoEventHandler<NanoFocusEvent<T>> | undefined;
  onCaptureFocusOut?: NanoEventHandler<NanoFocusEvent<T>> | undefined;
  // Clipboard
  onCaptureCut?: NanoEventHandler<NanoClipboardEvent<T>> | undefined;
  onCaptureCopy?: NanoEventHandler<NanoClipboardEvent<T>> | undefined;
  onCapturePaste?: NanoEventHandler<NanoClipboardEvent<T>> | undefined;
  // Keyboard
  onCaptureKeyDown?: NanoEventHandler<NanoKeyboardEvent<T>> | undefined;
  onCaptureKeyUp?: NanoEventHandler<NanoKeyboardEvent<T>> | undefined;
  onCaptureKeyPress?: NanoEventHandler<NanoKeyboardEvent<T>> | undefined;
  // Input
  onCaptureInput?: NanoEventHandler<NanoInputEvent<T>> | undefined;
  onCaptureBeforeInput?: NanoEventHandler<NanoInputEvent<T>> | undefined;
  // Generic
  onCaptureChange?: NanoEventHandler<NanoEvent<T>> | undefined;
  onCaptureSelect?: NanoEventHandler<NanoEvent<T>> | undefined;
  onCaptureScroll?: NanoEventHandler<NanoEvent<T>> | undefined;
  // Touch
  onCaptureTouchCancel?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchStart?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchMove?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchEnd?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  // TODO Add missing events
};

export type DomBubbleEventProps<T extends EventTarget> = {
  // Pointer
  onAuxClick?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onPointerCancel?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onPointerDown?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onPointerUp?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onPointerEnter?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onPointerLeave?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onPointerOver?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onPointerOut?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onPointerMove?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onClick?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  onContextMenu?: NanoEventHandler<NanoPointerEvent<T>> | undefined;
  // Mouse
  onDblClick?: NanoEventHandler<NanoMouseEvent<T>> | undefined;
  // Wheel
  onWheel?: NanoEventHandler<NanoWheelEvent<T>> | undefined;
  // Focus
  onFocusIn?: NanoEventHandler<NanoFocusEvent<T>> | undefined;
  onFocusOut?: NanoEventHandler<NanoFocusEvent<T>> | undefined;
  // Clipboard
  onCut?: NanoEventHandler<NanoClipboardEvent<T>> | undefined;
  onCopy?: NanoEventHandler<NanoClipboardEvent<T>> | undefined;
  onPaste?: NanoEventHandler<NanoClipboardEvent<T>> | undefined;
  // Keyboard
  onKeyDown?: NanoEventHandler<NanoKeyboardEvent<T>> | undefined;
  onKeyUp?: NanoEventHandler<NanoKeyboardEvent<T>> | undefined;
  onKeyPress?: NanoEventHandler<NanoKeyboardEvent<T>> | undefined;
  // Input
  onInput?: NanoEventHandler<NanoInputEvent<T>> | undefined;
  onBeforeInput?: NanoEventHandler<NanoInputEvent<T>> | undefined;
  // Generic
  onChange?: NanoEventHandler<NanoEvent<T>> | undefined;
  onSelect?: NanoEventHandler<NanoEvent<T>> | undefined;
  onScroll?: NanoEventHandler<NanoEvent<T>> | undefined;
  // Touch
  onTouchCancel?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onTouchStart?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onTouchMove?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onTouchEnd?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  // TODO Add missing events
};

export type DomEventProps<T extends EventTarget> = DomCaptureEventProps<T> &
  DomBubbleEventProps<T>;
