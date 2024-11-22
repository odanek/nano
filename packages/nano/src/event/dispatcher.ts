import { getInstanceFiber, NanoFiber } from '../vdom/fiber.js';
import { NanoFocusEvent } from './focus-event.js';
import { NanoPointerEvent } from './pointer-event.js';
import { NanoKeyboardEvent } from './keyboard-event.js';
import { NanoWheelEvent } from './wheel-event.js';
import { NanoInputEvent } from './input-event.js';
import { NanoClipboardEvent } from './clipboard-event.js';
import { NanoEvent } from './event.js';
import { NanoElementTag } from '../vdom/element.js';
import {
  NanoBubbleEventHandlerName,
  NanoCaptureEventHandlerName,
  NanoEventHandler,
  NanoEventType,
} from './type.js';
import { NanoMouseEvent } from './mouse-event.js';
import { NanoDomEventProps } from '../vdom/host/type.js';
import { NanoTouchEvent } from './touch-event.js';
import { capitalizeFirstLetter } from '../util.js';
import { NanoMessageFilter } from './message-filter.js';

export class NanoEventDispatcher {
  private eventHandler: (event: Event) => void;

  constructor() {
    this.eventHandler = this.handleEvent.bind(this);
  }

  public connect(root: EventTarget) {
    for (const event of nativeEventType) {
      root.addEventListener(event, this.eventHandler, {
        capture: true,
        passive: false,
      });
    }

    return (): void => this.disconnect(root);
  }

  public disconnect(root: EventTarget): void {
    for (const event of nativeEventType) {
      root.removeEventListener(event, this.eventHandler);
    }
  }

  private handleEvent(nativeEvent: Event): void {
    const event = this.createEvent(nativeEvent);
    if (event === null) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    const bubbles = this.isBubblingEvent(event);
    const fiberChain = this.getFiberChain(target, bubbles);
    const type = capitalizeFirstLetter(event.type);
    const captureHandler = ('onCapture' + type) as NanoCaptureEventHandlerName;
    const bubbleHandler = ('on' + type) as NanoBubbleEventHandlerName;
    this.runHandlerChain(fiberChain, event, captureHandler, bubbleHandler);

    if (event.isDefaultPrevented()) {
      nativeEvent.preventDefault();
    }
    if (event.isPropagationStopped()) {
      nativeEvent.stopPropagation();
      nativeEvent.stopImmediatePropagation();
    }
  }

  private getFiberChain(target: Node, bubbles: boolean): NanoFiber[] {
    const chain: NanoFiber[] = [];
    let current: Node | null = target;
    let fiber: NanoFiber | null = null;
    while (current !== null && fiber === null) {
      fiber = getInstanceFiber(current);
      current = current.parentNode;
    }

    while (fiber !== null) {
      if (
        fiber.tag === NanoElementTag.HostComponent &&
        (bubbles || fiber.stateNode === target)
      ) {
        chain.push(fiber);
      } else if (fiber.type === NanoMessageFilter) {
        chain.push(fiber);
      }
      fiber = fiber.return;
    }
    return chain;
  }

  private runHandlerChain(
    fiberChain: NanoFiber[],
    event: NanoEvent<Event, unknown>,
    captureHandlerName: NanoCaptureEventHandlerName,
    bubbleHandlerName: NanoBubbleEventHandlerName,
  ): void {
    const length = fiberChain.length;

    for (let i = length - 1; i >= 0 && !event.isPropagationStopped(); i--) {
      const fiber = fiberChain[i] as NanoFiber;
      const props = fiber.memoizedProps as NanoDomEventProps<unknown>;
      const captureHandler = props[captureHandlerName] as
        | NanoEventHandler<NanoEvent<Event, unknown>>
        | undefined;
      captureHandler?.(event);
    }

    for (let i = 0; i < length && !event.isPropagationStopped(); i++) {
      const fiber = fiberChain[i] as NanoFiber;
      const props = fiber.memoizedProps as NanoDomEventProps<unknown>;
      const bubbleHandler = props[bubbleHandlerName] as
        | NanoEventHandler<NanoEvent<Event, unknown>>
        | undefined;
      bubbleHandler?.(event);
    }
  }

  private createEvent(nativeEvent: Event): NanoEvent<Event, unknown> | null {
    switch (nativeEvent.type) {
      case 'focusin':
      case 'focusout':
        return new NanoFocusEvent(nativeEvent as FocusEvent);
      case 'auxclick':
      case 'pointercancel':
      case 'pointerenter':
      case 'pointerleave':
      case 'pointerover':
      case 'pointerout':
      case 'pointerdown':
      case 'pointerup':
      case 'pointermove':
      case 'click':
      case 'contextmenu':
        return new NanoPointerEvent(nativeEvent as PointerEvent);
      case 'dblclick':
        return new NanoMouseEvent(nativeEvent as MouseEvent);
      case 'keydown':
      case 'keyup':
      case 'keypress':
        return new NanoKeyboardEvent(nativeEvent as KeyboardEvent);
      case 'wheel':
        return new NanoWheelEvent(nativeEvent as WheelEvent);
      case 'input':
      case 'beforeinput':
        return new NanoInputEvent(nativeEvent as InputEvent);
      case 'cut':
      case 'copy':
      case 'paste':
        return new NanoClipboardEvent(nativeEvent as ClipboardEvent);
      case 'change':
      case 'select':
      case 'scroll':
        return new NanoEvent(nativeEvent);
      case 'touchcancel':
      case 'touchstart':
      case 'touchmove':
      case 'touchend':
        return new NanoTouchEvent(nativeEvent as TouchEvent);
      default:
        return null;
    }
  }

  private isBubblingEvent(event: NanoEvent<Event, unknown>): boolean {
    return !nonBubblingEvents.includes(event.type);
  }
}

const nativeEventType = [
  'pointerdown',
  'pointerup',
  'pointerenter',
  'pointerleave',
  'pointerover',
  'pointerout',
  'pointermove',
  'click',
  'dblclick',
  'wheel',
  'scroll',
  'contextmenu',
  'keydown',
  'keyup',
  'keypress',
  'focusin',
  'focusout',
  'input',
  'beforeinput',
  'change',
  'cut',
  'copy',
  'paste',
  'select',
];

const nonBubblingEvents = [
  NanoEventType.PointerEnter,
  NanoEventType.PointerLeave,
];
