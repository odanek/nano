import {
  NanoHostComponentBubbleEventProps,
  NanoHostComponentCaptureEventProps,
} from '../vdom/host/type';
import { NanoEvent } from './event';

export enum NanoEventType {
  PointerEnter = 'pointerEnter',
  PointerLeave = 'pointerLeave',
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

export type NanoEventDispatchResult = {
  handled: boolean;
  executeDefault: boolean;
};

export type NanoEventFilter<E extends NanoEvent> = (
  event: E,
  result: NanoEventDispatchResult,
  next: NanoEventHandler<NanoEvent>,
) => void;

export type NanoEventHandler<E extends NanoEvent> = (
  event: E,
  result: NanoEventDispatchResult,
) => void;

export type NanoCaptureEventHandlerName =
  keyof NanoHostComponentCaptureEventProps;

export type NanoBubbleEventHandlerName =
  keyof NanoHostComponentBubbleEventProps;
