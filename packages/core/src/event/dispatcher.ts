import { capitalizeFirstLetter } from '@nano-ui/util';
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
  NanoEventDispatchResult,
  NanoEventHandler,
  NanoEventType,
} from './type.js';
import { NanoHostComponentEventProps } from '../vdom/host/type.js';
import { NanoMouseEvent } from './mouse-event.js';
import { NanoGenericEvent } from './generic-event.js';

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
    const result = this.runHandlerChain(
      fiberChain,
      event,
      captureHandler,
      bubbleHandler,
    );

    if (result.handled) {
      if (!result.executeDefault) {
        nativeEvent.preventDefault();
      }
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
      if (fiber?.tag === NanoElementTag.HostComponent) {
        // TODO || NanoElementTag.MessageFilter
        if (!bubbles && fiber.stateNode !== target) {
          return chain;
        }
        chain.push(fiber);
      }
      fiber = fiber.return;
    }
    return chain;
  }

  private runHandlerChain(
    fiberChain: NanoFiber[],
    event: NanoEvent<unknown>,
    captureHandlerName: NanoCaptureEventHandlerName,
    bubbleHandlerName: NanoBubbleEventHandlerName,
  ): NanoEventDispatchResult {
    const result: NanoEventDispatchResult = {
      handled: false,
      executeDefault: true,
    };
    const length = fiberChain.length;

    for (let i = length - 1; i >= 0 && !result.handled; i--) {
      const fiber = fiberChain[i] as NanoFiber;
      const props = fiber.memoizedProps as NanoHostComponentEventProps<unknown>;
      const captureHandler = props[captureHandlerName] as
        | NanoEventHandler<NanoEvent<unknown>>
        | undefined;
      captureHandler?.(event, result);
    }

    for (let i = 0; i < length && !result.handled; i++) {
      const fiber = fiberChain[i] as NanoFiber;
      const props = fiber.memoizedProps as NanoHostComponentEventProps<unknown>;
      const bubbleHandler = props[bubbleHandlerName] as
        | NanoEventHandler<NanoEvent<unknown>>
        | undefined;
      bubbleHandler?.(event, result);
    }

    return result;
  }

  private createEvent(nativeEvent: Event): NanoEvent<unknown> | null {
    switch (nativeEvent.type) {
      case 'focusin':
      case 'focusout':
        return NanoFocusEvent.fromNative(nativeEvent as FocusEvent);
      case 'pointerenter':
      case 'pointerleave':
      case 'pointerover':
      case 'pointerout':
      case 'pointerdown':
      case 'pointerup':
      case 'pointermove':
      case 'click':
      case 'contextmenu':
        return NanoPointerEvent.fromNative(nativeEvent as PointerEvent);
      case 'dblclick':
        return NanoMouseEvent.fromNative(nativeEvent as MouseEvent);
      case 'keydown':
      case 'keyup':
      case 'keypress':
        return NanoKeyboardEvent.fromNative(nativeEvent as KeyboardEvent);
      case 'wheel':
        return NanoWheelEvent.fromNative(nativeEvent as WheelEvent);
      case 'input':
      case 'beforeinput':
        return NanoInputEvent.fromNative(nativeEvent as InputEvent);
      case 'cut':
      case 'copy':
      case 'paste':
        return NanoClipboardEvent.fromNative(nativeEvent as ClipboardEvent);
      case 'change':
      case 'select':
      case 'scroll':
        return NanoGenericEvent.fromNative(nativeEvent);
      default:
        return null;
    }
  }

  private isBubblingEvent(event: NanoEvent<unknown>): boolean {
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
