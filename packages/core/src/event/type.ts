import {
  NanoDomBubbleEventProps,
  NanoDomCaptureEventProps,
} from '../vdom/host/type';

export enum NanoEventType {
  PointerEnter = 'pointerEnter',
  PointerLeave = 'pointerLeave',
  PointerOver = 'pointerOver',
  PointerOut = 'pointerOut',
  PointerDown = 'pointerDown',
  PointerUp = 'pointerUp',
  PointerMove = 'pointerMove',
  Click = 'click',
  DblClick = 'dblClick',
  Wheel = 'wheel',
  Scroll = 'scroll',
  ContextMenu = 'contextMenu',
  KeyDown = 'keyDown',
  KeyUp = 'keyUp',
  KeyPress = 'keyPress',
  FocusIn = 'focusIn',
  FocusOut = 'focusOut',
  Input = 'input',
  BeforeInput = 'beforeinput',
  Change = 'change',
  Cut = 'cut',
  Copy = 'copy',
  Paste = 'paste',
  Select = 'select',
}

export type NanoEventResult = {
  handled: boolean;
  executeDefault: boolean;
};

export type NanoEventFilter<E> = (
  event: E,
  result: NanoEventResult,
  next: NanoEventHandler<unknown>,
) => void;

export type NanoEventHandler<E> = (event: E, result: NanoEventResult) => void;

export type NanoCaptureEventHandlerName =
  keyof NanoDomCaptureEventProps<unknown>;

export type NanoBubbleEventHandlerName = keyof NanoDomBubbleEventProps<unknown>;
