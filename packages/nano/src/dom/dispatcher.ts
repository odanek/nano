import { getInstanceFiber, Fiber } from '../reconciler/fiber';
import { VNodeKind } from '../api/vnode';
import {
  ClipboardEvent,
  DragEvent,
  Event,
  EventFilter,
  EventType,
  FocusEvent,
  InputEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  TouchEvent,
  WheelEvent,
  type DomEventProps,
  type BubbleEventHandlerName,
  type CaptureEventHandlerName,
  type EventHandler,
  type DomFocusEvent,
  type DomPointerEvent,
  type DomMouseEvent,
  type DomDragEvent,
  type DomKeyboardEvent,
  type DomWheelEvent,
  type DomEvent,
  type DomInputEvent,
  type DomClipboardEvent,
  type DomTouchEvent,
} from './event';
import { capitalizeFirstLetter } from '../shared/string';

type EventProps = DomEventProps<EventTarget>;

export class EventDispatcher {
  private eventHandler: (event: DomEvent) => void;
  private filters: EventProps[];

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
      root.removeEventListener(event, this.eventHandler, { capture: true });
    }
  }

  public addFilter(filter: EventProps): () => void {
    this.filters.push(filter);
    return (): void => this.removeFilter(filter);
  }

  public removeFilter(filter: EventProps): void {
    const index = this.filters.indexOf(filter);
    if (index !== -1) {
      this.filters.splice(index, 1);
    }
  }

  private handleEvent(nativeEvent: DomEvent): void {
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
    const captureHandler = ('onCapture' + type) as CaptureEventHandlerName;
    const bubbleHandler = ('on' + type) as BubbleEventHandlerName;
    this.runHandlerChain(fiberChain, event, captureHandler, bubbleHandler);

    if (event.isDefaultPrevented()) {
      nativeEvent.preventDefault();
    }
    if (event.isPropagationStopped()) {
      nativeEvent.stopPropagation();
      nativeEvent.stopImmediatePropagation();
    }
  }

  private getFiberChain(target: Node, bubbles: boolean): EventProps[] {
    const chain: EventProps[] = [];
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
        chain.push(fiber.memoizedProps as EventProps);
      } else if (fiber.type === EventFilter) {
        chain.push(fiber.memoizedProps as EventProps);
      }
      fiber = fiber.return;
    }

    for (const filter of this.filters) {
      chain.push(filter);
    }

    return chain;
  }

  private runHandlerChain(
    handlers: EventProps[],
    event: Event,
    captureHandlerName: CaptureEventHandlerName,
    bubbleHandlerName: BubbleEventHandlerName,
  ): void {
    const length = handlers.length;

    for (let i = length - 1; i >= 0 && !event.isPropagationStopped(); i--) {
      const handler = handlers[i] as EventProps;
      const captureHandler = handler[captureHandlerName] as
        | EventHandler<Event>
        | undefined;
      captureHandler?.(event);
    }

    for (let i = 0; i < length && !event.isPropagationStopped(); i++) {
      const handler = handlers[i] as EventProps;
      const bubbleHandler = handler[bubbleHandlerName] as
        | EventHandler<Event>
        | undefined;
      bubbleHandler?.(event);
    }
  }

  private createEvent(nativeEvent: DomEvent): Event | null {
    switch (nativeEvent.type) {
      case 'focusin':
      case 'focusout':
        return new FocusEvent(nativeEvent as DomFocusEvent);
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
        return new PointerEvent(nativeEvent as DomPointerEvent);
      case 'dblclick':
      case 'mousedown':
      case 'mouseup':
      case 'mouseenter':
      case 'mouseleave':
      case 'mouseover':
      case 'mouseout':
      case 'mousemove':
        return new MouseEvent(nativeEvent as DomMouseEvent);
      case 'drag':
      case 'dragstart':
      case 'dragend':
      case 'dragenter':
      case 'dragleave':
      case 'dragover':
      case 'drop':
        return new DragEvent(nativeEvent as DomDragEvent);
      case 'keydown':
      case 'keyup':
      case 'keypress':
        return new KeyboardEvent(nativeEvent as DomKeyboardEvent);
      case 'wheel':
        return new WheelEvent(nativeEvent as DomWheelEvent);
      case 'input':
      case 'beforeinput':
        return new InputEvent(nativeEvent as DomInputEvent);
      case 'cut':
      case 'copy':
      case 'paste':
        return new ClipboardEvent(nativeEvent as DomClipboardEvent);
      case 'change':
      case 'select':
      case 'scroll':
        return new Event(nativeEvent);
      case 'touchcancel':
      case 'touchstart':
      case 'touchmove':
      case 'touchend':
        return new TouchEvent(nativeEvent as DomTouchEvent);
      default:
        return null;
    }
  }

  private isBubblingEvent(event: Event): boolean {
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
  'mousedown',
  'mouseup',
  'mouseenter',
  'mouseleave',
  'mouseover',
  'mouseout',
  'mousemove',
  'drag',
  'dragstart',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'drop',
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
  EventType.PointerEnter,
  EventType.PointerLeave,
  EventType.MouseEnter,
  EventType.MouseLeave,
];
