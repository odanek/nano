import { getInstanceFiber, Fiber } from '../reconciler/fiber';
import { VNodeKind } from '../core/vnode';
import {
  NanoClipboardEvent,
  NanoEvent,
  NanoEventFilter,
  NanoEventType,
  NanoFocusEvent,
  NanoInputEvent,
  NanoKeyboardEvent,
  NanoMouseEvent,
  NanoPointerEvent,
  NanoTouchEvent,
  NanoWheelEvent,
  type DomEventProps,
  type NanoBubbleEventHandlerName,
  type NanoCaptureEventHandlerName,
  type NanoEventHandler,
} from './event';
import { capitalizeFirstLetter } from '../shared/string';

// TODO Conflicts with NanoEventFilter
type EventFilter = DomEventProps<EventTarget>;

export class EventDispatcher {
  private eventHandler: (event: Event) => void;
  private filters: EventFilter[];

  constructor() {
    this.eventHandler = this.handleEvent.bind(this);
    this.filters = [];
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

  public addFilter(filter: EventFilter): () => void {
    this.filters.push(filter);
    return (): void => this.removeFilter(filter);
  }

  public removeFilter(filter: EventFilter): void {
    const index = this.filters.indexOf(filter);
    if (index !== -1) {
      this.filters.splice(index, 1);
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

  private getFiberChain(target: Node, bubbles: boolean): EventFilter[] {
    const chain: EventFilter[] = [];
    let current: Node | null = target;
    let fiber: Fiber | null = null;
    while (current !== null && fiber === null) {
      fiber = getInstanceFiber(current);
      current = current.parentNode;
    }

    while (fiber !== null) {
      if (
        fiber.kind === VNodeKind.Element &&
        (bubbles || fiber.stateNode === target)
      ) {
        chain.push(fiber.memoizedProps as EventFilter);
      } else if (fiber.type === NanoEventFilter) {
        chain.push(fiber.memoizedProps as EventFilter);
      }
      fiber = fiber.return;
    }

    for (const filter of this.filters) {
      chain.push(filter);
    }

    return chain;
  }

  private runHandlerChain(
    handlers: EventFilter[],
    event: NanoEvent,
    captureHandlerName: NanoCaptureEventHandlerName,
    bubbleHandlerName: NanoBubbleEventHandlerName,
  ): void {
    const length = handlers.length;

    for (let i = length - 1; i >= 0 && !event.isPropagationStopped(); i--) {
      const handler = handlers[i] as EventFilter;
      const captureHandler = handler[captureHandlerName] as
        | NanoEventHandler<NanoEvent>
        | undefined;
      captureHandler?.(event);
    }

    for (let i = 0; i < length && !event.isPropagationStopped(); i++) {
      const handler = handlers[i] as EventFilter;
      const bubbleHandler = handler[bubbleHandlerName] as
        | NanoEventHandler<NanoEvent>
        | undefined;
      bubbleHandler?.(event);
    }
  }

  private createEvent(nativeEvent: Event): NanoEvent | null {
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

  private isBubblingEvent(event: NanoEvent): boolean {
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
  'auxclick',
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
  'touchcancel',
  'touchstart',
  'touchmove',
  'touchend',
];

const nonBubblingEvents = [
  NanoEventType.PointerEnter,
  NanoEventType.PointerLeave,
];
