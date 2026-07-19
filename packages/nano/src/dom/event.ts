import type { NanoClipboardEvent } from '../event/clipboard-event';
import type { NanoEvent } from '../event/event';
import type { NanoFocusEvent } from '../event/focus-event';
import type { NanoInputEvent } from '../event/input-event';
import type { NanoKeyboardEvent } from '../event/keyboard-event';
import type { NanoMouseEvent } from '../event/mouse-event';
import type { NanoPointerEvent } from '../event/pointer-event';
import type { NanoTouchEvent } from '../event/touch-event';
import type { NanoEventHandler } from '../event/type';
import type { NanoWheelEvent } from '../event/wheel-event';

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
