import type { ValueOf } from '../util';
import {
  type NanoDomBubbleEventProps,
  type NanoDomCaptureEventProps,
} from '../vdom/host/type';

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
  keyof NanoDomCaptureEventProps<EventTarget>;

export type NanoBubbleEventHandlerName =
  keyof NanoDomBubbleEventProps<EventTarget>;

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
