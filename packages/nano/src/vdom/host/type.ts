import * as CSS from 'csstype';
import { NanoPointerEvent } from '../../event/pointer-event';
import { type NanoEventHandler } from '../../event/type';
import { type NanoChildren, type NanoKeyProps, type NanoRefProps } from '../type';
import { NanoMouseEvent } from '../../event/mouse-event';
import { NanoWheelEvent } from '../../event/wheel-event';
import { NanoFocusEvent } from '../../event/focus-event';
import { NanoClipboardEvent } from '../../event/clipboard-event';
import { NanoKeyboardEvent } from '../../event/keyboard-event';
import { NanoInputEvent } from '../../event/input-event';
import { NanoTouchEvent } from '../../event/touch-event';
import { NanoGenericEvent } from '../../event/generic-event';

// Largely taken from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts

type Booleanish = boolean | 'true' | 'false';

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export type NanoHostComponentHtmlProps<
  P extends NanoHtmlProps<E>,
  E extends HTMLElement,
> = NanoRefProps & NanoKeyProps & P;

export type NanoHostComponentSvgProps<T> = NanoRefProps &
  NanoKeyProps &
  NanoSvgProps<T>;

export type NanoDomClass = string | string[];
export type NanoDomStyle = CSS.Properties<string | number>;

export type NanoDomCaptureEventProps<T> = {
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
  onCaptureDblClick?: NanoEventHandler<NanoMouseEvent<MouseEvent, T>> | undefined;
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
  onCaptureChange?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onCaptureSelect?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onCaptureScroll?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  // Touch
  onCaptureTouchCancel?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchStart?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchMove?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onCaptureTouchEnd?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  // TODO Add missing events
};

export type NanoDomBubbleEventProps<T> = {
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
  onDblClick?: NanoEventHandler<NanoMouseEvent<MouseEvent, T>> | undefined;
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
  onChange?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onSelect?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onScroll?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  // Touch
  onTouchCancel?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onTouchStart?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onTouchMove?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  onTouchEnd?: NanoEventHandler<NanoTouchEvent<T>> | undefined;
  // TODO Add missing events
};
export type NanoDomEventProps<T> = NanoDomCaptureEventProps<T> &
  NanoDomBubbleEventProps<T>;

export interface NanoDomProps<T> extends NanoDomEventProps<T> {
  children?: NanoChildren;
}

export type NanoAriaProps = {
  'aria-activedescendant'?: string | undefined;
  'aria-atomic'?: Booleanish | undefined;
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined;
  'aria-braillelabel'?: string | undefined;
  'aria-brailleroledescription'?: string | undefined;
  'aria-busy'?: Booleanish | undefined;
  'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
  'aria-colcount'?: number | undefined;
  'aria-colindex'?: number | undefined;
  'aria-colindextext'?: string | undefined;
  'aria-colspan'?: number | undefined;
  'aria-controls'?: string | undefined;
  'aria-current'?:
    | boolean
    | 'false'
    | 'true'
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | undefined;
  'aria-describedby'?: string | undefined;
  'aria-description'?: string | undefined;
  'aria-details'?: string | undefined;
  'aria-disabled'?: Booleanish | undefined;
  'aria-dropeffect'?:
    | 'none'
    | 'copy'
    | 'execute'
    | 'link'
    | 'move'
    | 'popup'
    | undefined;
  'aria-errormessage'?: string | undefined;
  'aria-expanded'?: Booleanish | undefined;
  'aria-flowto'?: string | undefined;
  'aria-grabbed'?: Booleanish | undefined;
  'aria-haspopup'?:
    | boolean
    | 'false'
    | 'true'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog'
    | undefined;
  'aria-hidden'?: Booleanish | undefined;
  'aria-invalid'?:
    | boolean
    | 'false'
    | 'true'
    | 'grammar'
    | 'spelling'
    | undefined;
  'aria-keyshortcuts'?: string | undefined;
  'aria-label'?: string | undefined;
  'aria-labelledby'?: string | undefined;
  'aria-level'?: number | undefined;
  'aria-live'?: 'off' | 'assertive' | 'polite' | undefined;
  'aria-modal'?: Booleanish | undefined;
  'aria-multiline'?: Booleanish | undefined;
  'aria-multiselectable'?: Booleanish | undefined;
  'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
  'aria-owns'?: string | undefined;
  'aria-placeholder'?: string | undefined;
  'aria-posinset'?: number | undefined;
  'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
  'aria-readonly'?: Booleanish | undefined;
  'aria-relevant'?:
    | 'additions'
    | 'additions removals'
    | 'additions text'
    | 'all'
    | 'removals'
    | 'removals additions'
    | 'removals text'
    | 'text'
    | 'text additions'
    | 'text removals'
    | undefined;
  'aria-required'?: Booleanish | undefined;
  'aria-roledescription'?: string | undefined;
  'aria-rowcount'?: number | undefined;
  'aria-rowindex'?: number | undefined;
  'aria-rowindextext'?: string | undefined;
  'aria-rowspan'?: number | undefined;
  'aria-selected'?: Booleanish | undefined;
  'aria-setsize'?: number | undefined;
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined;
  'aria-valuemax'?: number | undefined;
  'aria-valuemin'?: number | undefined;
  'aria-valuenow'?: number | undefined;
  'aria-valuetext'?: string | undefined;
};

export type NanoAriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'button'
  | 'cell'
  | 'checkbox'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

export interface NanoHtmlProps<T> extends NanoAriaProps, NanoDomProps<T> {
  // Standard HTML Attributes
  accessKey?: string | undefined;
  autoCapitalize?:
    | 'off'
    | 'none'
    | 'on'
    | 'sentences'
    | 'words'
    | 'characters'
    | undefined
    | (string & {});
  autoFocus?: boolean | undefined;
  class?: NanoDomClass | undefined;
  contentEditable?: Booleanish | 'inherit' | 'plaintext-only' | undefined;
  contextMenu?: string | undefined;
  dir?: string | undefined;
  draggable?: Booleanish | undefined;
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
    | undefined;
  hidden?: boolean | undefined;
  id?: string | undefined;
  lang?: string | undefined;
  nonce?: string | undefined;
  slot?: string | undefined;
  spellCheck?: Booleanish | undefined;
  style?: NanoDomStyle | undefined;
  tabIndex?: number | undefined;
  title?: string | undefined;
  translate?: 'yes' | 'no' | undefined;

  // Unknown
  radioGroup?: string | undefined; // <command>, <menuitem>

  // WAI-ARIA
  role?: NanoAriaRole | undefined;

  // RDFa Attributes
  about?: string | undefined;
  content?: string | undefined;
  datatype?: string | undefined;
  inlist?: string | undefined;
  prefix?: string | undefined;
  property?: string | undefined;
  rel?: string | undefined;
  resource?: string | undefined;
  rev?: string | undefined;
  typeof?: string | undefined;
  vocab?: string | undefined;

  // Non-standard Attributes
  autoCorrect?: string | undefined;
  autoSave?: string | undefined;
  color?: string | undefined;
  itemProp?: string | undefined;
  itemScope?: boolean | undefined;
  itemType?: string | undefined;
  itemID?: string | undefined;
  itemRef?: string | undefined;
  results?: number | undefined;
  security?: string | undefined;
  unselectable?: 'on' | 'off' | undefined;

  // Living Standard
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined;
  is?: string | undefined;
}

type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

type HTMLAttributeAnchorTarget =
  | '_self'
  | '_blank'
  | '_parent'
  | '_top'
  | (string & {});

export interface NanoHtmlAnchorProps<T> extends NanoHtmlProps<T> {
  download?: unknown;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

interface NanoHtmlAreaProps<T> extends NanoHtmlProps<T> {
  alt?: string | undefined;
  coords?: string | undefined;
  download?: unknown;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  shape?: string | undefined;
  target?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NanoHtmlAudioProps<T> extends NanoHtmlMediaProps<T> {}

interface NanoHtmlBaseProps<T> extends NanoHtmlProps<T> {
  href?: string | undefined;
  target?: string | undefined;
}

interface NanoHtmlBlockquoteProps<T> extends NanoHtmlProps<T> {
  cite?: string | undefined;
}

interface NanoHtmlButtonProps<T> extends NanoHtmlProps<T> {
  disabled?: boolean | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  name?: string | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlCanvasProps<T> extends NanoHtmlProps<T> {
  height?: number | string | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlColProps<T> extends NanoHtmlProps<T> {
  span?: number | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlColgroupProps<T> extends NanoHtmlProps<T> {
  span?: number | undefined;
}

interface NanoHtmlDataProps<T> extends NanoHtmlProps<T> {
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlDelProps<T> extends NanoHtmlProps<T> {
  cite?: string | undefined;
  dateTime?: string | undefined;
}

interface NanoHtmlDetailsProps<T> extends NanoHtmlProps<T> {
  open?: boolean | undefined;
  onToggle?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onCaptureToggle?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  name?: string | undefined;
}

interface NanoHtmlDialogProps<T> extends NanoHtmlProps<T> {
  onCancel?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onCaptureCancel?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onClose?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onCaptureClose?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  open?: boolean | undefined;
}

interface NanoHtmlEmbedProps<T> extends NanoHtmlProps<T> {
  height?: number | string | undefined;
  src?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlFieldsetProps<T> extends NanoHtmlProps<T> {
  disabled?: boolean | undefined;
  form?: string | undefined;
  name?: string | undefined;
}

interface NanoHtmlFormProps<T> extends NanoHtmlProps<T> {
  acceptCharset?: string | undefined;
  action?: string | undefined;
  autoComplete?: string | undefined;
  encType?: string | undefined;
  method?: string | undefined;
  name?: string | undefined;
  noValidate?: boolean | undefined;
  target?: string | undefined;
}

interface NanoHtmlHtmlProps<T> extends NanoHtmlProps<T> {
  manifest?: string | undefined;
}

interface NanoHtmlIframeProps<T> extends NanoHtmlProps<T> {
  allow?: string | undefined;
  allowFullScreen?: boolean | undefined;
  allowTransparency?: boolean | undefined;
  /** @deprecated */
  frameBorder?: number | string | undefined;
  height?: number | string | undefined;
  loading?: 'eager' | 'lazy' | undefined;
  /** @deprecated */
  marginHeight?: number | undefined;
  /** @deprecated */
  marginWidth?: number | undefined;
  name?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sandbox?: string | undefined;
  /** @deprecated */
  scrolling?: string | undefined;
  seamless?: boolean | undefined;
  src?: string | undefined;
  srcDoc?: string | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlImgProps<T> extends NanoHtmlProps<T> {
  alt?: string | undefined;
  crossOrigin?: CrossOrigin;
  decoding?: 'async' | 'auto' | 'sync' | undefined;
  fetchPriority?: 'high' | 'low' | 'auto';
  height?: number | string | undefined;
  loading?: 'eager' | 'lazy' | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
}

type NanoHtmlInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {});

type AutoFillAddressKind = 'billing' | 'shipping';
type AutoFillBase = '' | 'off' | 'on';
type AutoFillContactField =
  | 'email'
  | 'tel'
  | 'tel-area-code'
  | 'tel-country-code'
  | 'tel-extension'
  | 'tel-local'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-national';
type AutoFillContactKind = 'home' | 'mobile' | 'work';
type AutoFillCredentialField = 'webauthn';
type AutoFillNormalField =
  | 'additional-name'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-family-name'
  | 'cc-given-name'
  | 'cc-name'
  | 'cc-number'
  | 'cc-type'
  | 'country'
  | 'country-name'
  | 'current-password'
  | 'family-name'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'name'
  | 'new-password'
  | 'one-time-code'
  | 'organization'
  | 'postal-code'
  | 'street-address'
  | 'transaction-amount'
  | 'transaction-currency'
  | 'username';
type OptionalPrefixToken<T extends string> = `${T} ` | '';
type OptionalPostfixToken<T extends string> = ` ${T}` | '';
type AutoFillField =
  | AutoFillNormalField
  | `${OptionalPrefixToken<AutoFillContactKind>}${AutoFillContactField}`;
type AutoFillSection = `section-${string}`;
type AutoFill =
  | AutoFillBase
  | `${OptionalPrefixToken<AutoFillSection>}${OptionalPrefixToken<AutoFillAddressKind>}${AutoFillField}${OptionalPostfixToken<AutoFillCredentialField>}`;
type NanoHtmlInputAutoCompleteAttribute = AutoFill | (string & {});

interface NanoHtmlInputProps<T> extends NanoHtmlProps<T> {
  accept?: string | undefined;
  alt?: string | undefined;
  autoComplete?: NanoHtmlInputAutoCompleteAttribute | undefined;
  capture?: boolean | 'user' | 'environment' | undefined;
  checked?: boolean | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  height?: number | string | undefined;
  list?: string | undefined;
  max?: number | string | undefined;
  maxLength?: number | undefined;
  min?: number | string | undefined;
  minLength?: number | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  pattern?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  src?: string | undefined;
  step?: number | string | undefined;
  type?: NanoHtmlInputTypeAttribute | undefined;
  value?: string | readonly string[] | number | undefined;
  width?: number | string | undefined;
  onChange?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onCaptureChange?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
}

interface NanoHtmlInsProps<T> extends NanoHtmlProps<T> {
  cite?: string | undefined;
  dateTime?: string | undefined;
}

interface NanoHtmlKeygenProps<T> extends NanoHtmlProps<T> {
  challenge?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  keyType?: string | undefined;
  keyParams?: string | undefined;
  name?: string | undefined;
}

interface NanoHtmlLabelProps<T> extends NanoHtmlProps<T> {
  form?: string | undefined;
  htmlFor?: string | undefined;
}

interface NanoHtmlLiProps<T> extends NanoHtmlProps<T> {
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlLinkProps<T> extends NanoHtmlProps<T> {
  as?: string | undefined;
  crossOrigin?: CrossOrigin;
  fetchPriority?: 'high' | 'low' | 'auto';
  href?: string | undefined;
  hrefLang?: string | undefined;
  integrity?: string | undefined;
  media?: string | undefined;
  imageSrcSet?: string | undefined;
  imageSizes?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  type?: string | undefined;
  charSet?: string | undefined;
}

interface NanoHtmlMapProps<T> extends NanoHtmlProps<T> {
  name?: string | undefined;
}

interface NanoHtmlMenuProps<T> extends NanoHtmlProps<T> {
  type?: string | undefined;
}

interface NanoHtmlMediaProps<T> extends NanoHtmlProps<T> {
  autoPlay?: boolean | undefined;
  controls?: boolean | undefined;
  controlsList?: string | undefined;
  crossOrigin?: CrossOrigin;
  loop?: boolean | undefined;
  mediaGroup?: string | undefined;
  muted?: boolean | undefined;
  playsInline?: boolean | undefined;
  preload?: string | undefined;
  src?: string | undefined;
}

interface NanoHtmlMetaProps<T> extends NanoHtmlProps<T> {
  charSet?: string | undefined;
  content?: string | undefined;
  httpEquiv?: string | undefined;
  media?: string | undefined;
  name?: string | undefined;
}

interface NanoHtmlMeterProps<T> extends NanoHtmlProps<T> {
  form?: string | undefined;
  high?: number | undefined;
  low?: number | undefined;
  max?: number | string | undefined;
  min?: number | string | undefined;
  optimum?: number | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlObjectProps<T> extends NanoHtmlProps<T> {
  classID?: string | undefined;
  data?: string | undefined;
  form?: string | undefined;
  height?: number | string | undefined;
  name?: string | undefined;
  type?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
  wmode?: string | undefined;
}

interface NanoHtmlOlProps<T> extends NanoHtmlProps<T> {
  reversed?: boolean | undefined;
  start?: number | undefined;
  type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
}

interface NanoHtmlOptgroupProps<T> extends NanoHtmlProps<T> {
  disabled?: boolean | undefined;
  label?: string | undefined;
}

interface NanoHtmlOptionProps<T> extends NanoHtmlProps<T> {
  disabled?: boolean | undefined;
  label?: string | undefined;
  selected?: boolean | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlOutputProps<T> extends NanoHtmlProps<T> {
  form?: string | undefined;
  htmlFor?: string | undefined;
  name?: string | undefined;
}

interface NanoHtmlParamProps<T> extends NanoHtmlProps<T> {
  name?: string | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlProgressProps<T> extends NanoHtmlProps<T> {
  max?: number | string | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlQuoteProps<T> extends NanoHtmlProps<T> {
  cite?: string | undefined;
}

interface NanoHtmlSlotProps<T> extends NanoHtmlProps<T> {
  name?: string | undefined;
}

interface NanoHtmlScriptProps<T> extends NanoHtmlProps<T> {
  async?: boolean | undefined;
  /** @deprecated */
  charSet?: string | undefined;
  crossOrigin?: CrossOrigin;
  defer?: boolean | undefined;
  integrity?: string | undefined;
  noModule?: boolean | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  src?: string | undefined;
  type?: string | undefined;
}

interface NanoHtmlSelectProps<T> extends NanoHtmlProps<T> {
  autoComplete?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  value?: string | readonly string[] | number | undefined;
  onChange?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onCaptureChange?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
}

interface NanoHtmlSourceProps<T> extends NanoHtmlProps<T> {
  height?: number | string | undefined;
  media?: string | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlStyleProps<T> extends NanoHtmlProps<T> {
  media?: string | undefined;
  scoped?: boolean | undefined;
  type?: string | undefined;
}

interface NanoHtmlTableProps<T> extends NanoHtmlProps<T> {
  align?: 'left' | 'center' | 'right' | undefined;
  bgcolor?: string | undefined;
  border?: number | undefined;
  cellPadding?: number | string | undefined;
  cellSpacing?: number | string | undefined;
  frame?: boolean | undefined;
  rules?: 'none' | 'groups' | 'rows' | 'columns' | 'all' | undefined;
  summary?: string | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlTextareaProps<T> extends NanoHtmlProps<T> {
  autoComplete?: string | undefined;
  cols?: number | undefined;
  dirName?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  rows?: number | undefined;
  value?: string | readonly string[] | number | undefined;
  wrap?: string | undefined;
  onChange?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
  onCaptureChange?: NanoEventHandler<NanoGenericEvent<T>> | undefined;
}

interface NanoHtmlTdProps<T> extends NanoHtmlProps<T> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
  height?: number | string | undefined;
  width?: number | string | undefined;
  valign?: 'top' | 'middle' | 'bottom' | 'baseline' | undefined;
}

interface NanoHtmlThProps<T> extends NanoHtmlProps<T> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
}

interface NanoHtmlTimeProps<T> extends NanoHtmlProps<T> {
  dateTime?: string | undefined;
}

interface NanoHtmlTrackProps<T> extends NanoHtmlProps<T> {
  default?: boolean | undefined;
  kind?: string | undefined;
  label?: string | undefined;
  src?: string | undefined;
  srcLang?: string | undefined;
}

interface NanoHtmlVideoProps<T> extends NanoHtmlProps<T> {
  height?: number | string | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  width?: number | string | undefined;
  disablePictureInPicture?: boolean | undefined;
  disableRemotePlayback?: boolean | undefined;
}

interface NanoHtmlWebViewProps<T> extends NanoHtmlProps<T> {
  allowFullScreen?: boolean | undefined;
  allowpopups?: boolean | undefined;
  autosize?: boolean | undefined;
  blinkfeatures?: string | undefined;
  disableblinkfeatures?: string | undefined;
  disableguestresize?: boolean | undefined;
  disablewebsecurity?: boolean | undefined;
  guestinstance?: string | undefined;
  httpreferrer?: string | undefined;
  nodeintegration?: boolean | undefined;
  partition?: string | undefined;
  plugins?: boolean | undefined;
  preload?: string | undefined;
  src?: string | undefined;
  useragent?: string | undefined;
  webpreferences?: string | undefined;
}

export interface NanoDomElement {
  a: NanoHostComponentHtmlProps<
    NanoHtmlAnchorProps<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
  abbr: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  address: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  area: NanoHostComponentHtmlProps<
    NanoHtmlAreaProps<HTMLAreaElement>,
    HTMLAreaElement
  >;
  article: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  aside: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  audio: NanoHostComponentHtmlProps<
    NanoHtmlAudioProps<HTMLAudioElement>,
    HTMLAudioElement
  >;
  b: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  base: NanoHostComponentHtmlProps<
    NanoHtmlBaseProps<HTMLBaseElement>,
    HTMLBaseElement
  >;
  bdi: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  bdo: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  big: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  blockquote: NanoHostComponentHtmlProps<
    NanoHtmlBlockquoteProps<HTMLQuoteElement>,
    HTMLQuoteElement
  >;
  body: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLBodyElement>,
    HTMLBodyElement
  >;
  br: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLBRElement>, HTMLBRElement>;
  button: NanoHostComponentHtmlProps<
    NanoHtmlButtonProps<HTMLButtonElement>,
    HTMLButtonElement
  >;
  canvas: NanoHostComponentHtmlProps<
    NanoHtmlCanvasProps<HTMLCanvasElement>,
    HTMLCanvasElement
  >;
  caption: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  center: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  cite: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  code: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  col: NanoHostComponentHtmlProps<
    NanoHtmlColProps<HTMLTableColElement>,
    HTMLTableColElement
  >;
  colgroup: NanoHostComponentHtmlProps<
    NanoHtmlColgroupProps<HTMLTableColElement>,
    HTMLTableColElement
  >;
  data: NanoHostComponentHtmlProps<
    NanoHtmlDataProps<HTMLDataElement>,
    HTMLDataElement
  >;
  datalist: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLDataListElement>,
    HTMLDataListElement
  >;
  dd: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  del: NanoHostComponentHtmlProps<
    NanoHtmlDelProps<HTMLModElement>,
    HTMLModElement
  >;
  details: NanoHostComponentHtmlProps<
    NanoHtmlDetailsProps<HTMLDetailsElement>,
    HTMLDetailsElement
  >;
  dfn: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  dialog: NanoHostComponentHtmlProps<
    NanoHtmlDialogProps<HTMLDialogElement>,
    HTMLDialogElement
  >;
  div: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLDivElement>,
    HTMLDivElement
  >;
  dl: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLDListElement>,
    HTMLDListElement
  >;
  dt: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  em: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  embed: NanoHostComponentHtmlProps<
    NanoHtmlEmbedProps<HTMLEmbedElement>,
    HTMLEmbedElement
  >;
  fieldset: NanoHostComponentHtmlProps<
    NanoHtmlFieldsetProps<HTMLFieldSetElement>,
    HTMLFieldSetElement
  >;
  figcaption: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLElement>,
    HTMLElement
  >;
  figure: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  footer: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  form: NanoHostComponentHtmlProps<
    NanoHtmlFormProps<HTMLFormElement>,
    HTMLFormElement
  >;
  h1: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h2: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h3: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h4: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h5: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h6: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  head: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  header: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  hgroup: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  hr: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLHRElement>, HTMLHRElement>;
  html: NanoHostComponentHtmlProps<
    NanoHtmlHtmlProps<HTMLHtmlElement>,
    HTMLHtmlElement
  >;
  i: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  iframe: NanoHostComponentHtmlProps<
    NanoHtmlIframeProps<HTMLIFrameElement>,
    HTMLIFrameElement
  >;
  img: NanoHostComponentHtmlProps<
    NanoHtmlImgProps<HTMLImageElement>,
    HTMLImageElement
  >;
  input: NanoHostComponentHtmlProps<
    NanoHtmlInputProps<HTMLInputElement>,
    HTMLInputElement
  >;
  ins: NanoHostComponentHtmlProps<
    NanoHtmlInsProps<HTMLModElement>,
    HTMLModElement
  >;
  kbd: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  keygen: NanoHostComponentHtmlProps<
    NanoHtmlKeygenProps<HTMLElement>,
    HTMLElement
  >;
  label: NanoHostComponentHtmlProps<
    NanoHtmlLabelProps<HTMLLabelElement>,
    HTMLLabelElement
  >;
  legend: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLLegendElement>,
    HTMLLegendElement
  >;
  li: NanoHostComponentHtmlProps<NanoHtmlLiProps<HTMLLIElement>, HTMLLIElement>;
  link: NanoHostComponentHtmlProps<
    NanoHtmlLinkProps<HTMLLinkElement>,
    HTMLLinkElement
  >;
  main: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  map: NanoHostComponentHtmlProps<
    NanoHtmlMapProps<HTMLMapElement>,
    HTMLMapElement
  >;
  mark: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  menu: NanoHostComponentHtmlProps<NanoHtmlMenuProps<HTMLElement>, HTMLElement>;
  menuitem: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  meta: NanoHostComponentHtmlProps<
    NanoHtmlMetaProps<HTMLMetaElement>,
    HTMLMetaElement
  >;
  meter: NanoHostComponentHtmlProps<
    NanoHtmlMeterProps<HTMLMeterElement>,
    HTMLMeterElement
  >;
  nav: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  noscript: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  object: NanoHostComponentHtmlProps<
    NanoHtmlObjectProps<HTMLObjectElement>,
    HTMLObjectElement
  >;
  ol: NanoHostComponentHtmlProps<
    NanoHtmlOlProps<HTMLOListElement>,
    HTMLOListElement
  >;
  optgroup: NanoHostComponentHtmlProps<
    NanoHtmlOptgroupProps<HTMLOptGroupElement>,
    HTMLOptGroupElement
  >;
  option: NanoHostComponentHtmlProps<
    NanoHtmlOptionProps<HTMLOptionElement>,
    HTMLOptionElement
  >;
  output: NanoHostComponentHtmlProps<
    NanoHtmlOutputProps<HTMLOutputElement>,
    HTMLOutputElement
  >;
  p: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLParagraphElement>,
    HTMLParagraphElement
  >;
  param: NanoHostComponentHtmlProps<
    NanoHtmlParamProps<HTMLParamElement>,
    HTMLParamElement
  >;
  picture: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  pre: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLPreElement>,
    HTMLPreElement
  >;
  progress: NanoHostComponentHtmlProps<
    NanoHtmlProgressProps<HTMLProgressElement>,
    HTMLProgressElement
  >;
  q: NanoHostComponentHtmlProps<
    NanoHtmlQuoteProps<HTMLQuoteElement>,
    HTMLQuoteElement
  >;
  rp: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  rt: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  ruby: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  s: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  samp: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  search: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  slot: NanoHostComponentHtmlProps<
    NanoHtmlSlotProps<HTMLSlotElement>,
    HTMLSlotElement
  >;
  script: NanoHostComponentHtmlProps<
    NanoHtmlScriptProps<HTMLScriptElement>,
    HTMLScriptElement
  >;
  section: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  select: NanoHostComponentHtmlProps<
    NanoHtmlSelectProps<HTMLSelectElement>,
    HTMLSelectElement
  >;
  small: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  source: NanoHostComponentHtmlProps<
    NanoHtmlSourceProps<HTMLSourceElement>,
    HTMLSourceElement
  >;
  span: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLSpanElement>,
    HTMLSpanElement
  >;
  strong: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  style: NanoHostComponentHtmlProps<
    NanoHtmlStyleProps<HTMLStyleElement>,
    HTMLStyleElement
  >;
  sub: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  summary: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  sup: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  table: NanoHostComponentHtmlProps<
    NanoHtmlTableProps<HTMLTableElement>,
    HTMLTableElement
  >;
  template: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLTemplateElement>,
    HTMLTemplateElement
  >;
  tbody: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  td: NanoHostComponentHtmlProps<
    NanoHtmlTdProps<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >;
  textarea: NanoHostComponentHtmlProps<
    NanoHtmlTextareaProps<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  tfoot: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  th: NanoHostComponentHtmlProps<
    NanoHtmlThProps<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >;
  thead: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  time: NanoHostComponentHtmlProps<
    NanoHtmlTimeProps<HTMLTimeElement>,
    HTMLTimeElement
  >;
  title: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLTitleElement>,
    HTMLTitleElement
  >;
  tr: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLTableRowElement>,
    HTMLTableRowElement
  >;
  track: NanoHostComponentHtmlProps<
    NanoHtmlTrackProps<HTMLTrackElement>,
    HTMLTrackElement
  >;
  u: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  ul: NanoHostComponentHtmlProps<
    NanoHtmlProps<HTMLUListElement>,
    HTMLUListElement
  >;
  var: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  video: NanoHostComponentHtmlProps<
    NanoHtmlVideoProps<HTMLVideoElement>,
    HTMLVideoElement
  >;
  wbr: NanoHostComponentHtmlProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  webview: NanoHostComponentHtmlProps<
    NanoHtmlWebViewProps<HTMLElement>,
    HTMLElement
  >;
}

export interface NanoSvgProps<T> extends NanoAriaProps, NanoDomProps<T> {
  // Attributes which also defined in HTMLAttributes
  // See comment in SVGDOMPropertyConfig.js
  className?: string | undefined;
  color?: string | undefined;
  height?: number | string | undefined;
  id?: string | undefined;
  lang?: string | undefined;
  max?: number | string | undefined;
  media?: string | undefined;
  method?: string | undefined;
  min?: number | string | undefined;
  name?: string | undefined;
  style?: NanoDomStyle | undefined;
  target?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;

  // Other HTML properties supported by SVG elements in browsers
  role?: NanoAriaRole | undefined;
  tabIndex?: number | undefined;
  crossOrigin?: CrossOrigin;

  // SVG Specific attributes
  accentHeight?: number | string | undefined;
  accumulate?: 'none' | 'sum' | undefined;
  additive?: 'replace' | 'sum' | undefined;
  alignmentBaseline?:
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit'
    | undefined;
  allowReorder?: 'no' | 'yes' | undefined;
  alphabetic?: number | string | undefined;
  amplitude?: number | string | undefined;
  arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated' | undefined;
  ascent?: number | string | undefined;
  attributeName?: string | undefined;
  attributeType?: string | undefined;
  autoReverse?: Booleanish | undefined;
  azimuth?: number | string | undefined;
  baseFrequency?: number | string | undefined;
  baselineShift?: number | string | undefined;
  baseProfile?: number | string | undefined;
  bbox?: number | string | undefined;
  begin?: number | string | undefined;
  bias?: number | string | undefined;
  by?: number | string | undefined;
  calcMode?: number | string | undefined;
  capHeight?: number | string | undefined;
  clip?: number | string | undefined;
  clipPath?: string | undefined;
  clipPathUnits?: number | string | undefined;
  clipRule?: number | string | undefined;
  colorInterpolation?: number | string | undefined;
  colorInterpolationFilters?:
    | 'auto'
    | 'sRGB'
    | 'linearRGB'
    | 'inherit'
    | undefined;
  colorProfile?: number | string | undefined;
  colorRendering?: number | string | undefined;
  contentScriptType?: number | string | undefined;
  contentStyleType?: number | string | undefined;
  cursor?: number | string | undefined;
  cx?: number | string | undefined;
  cy?: number | string | undefined;
  d?: string | undefined;
  decelerate?: number | string | undefined;
  descent?: number | string | undefined;
  diffuseConstant?: number | string | undefined;
  direction?: number | string | undefined;
  display?: number | string | undefined;
  divisor?: number | string | undefined;
  dominantBaseline?: number | string | undefined;
  dur?: number | string | undefined;
  dx?: number | string | undefined;
  dy?: number | string | undefined;
  edgeMode?: number | string | undefined;
  elevation?: number | string | undefined;
  enableBackground?: number | string | undefined;
  end?: number | string | undefined;
  exponent?: number | string | undefined;
  externalResourcesRequired?: Booleanish | undefined;
  fill?: string | undefined;
  fillOpacity?: number | string | undefined;
  fillRule?: 'nonzero' | 'evenodd' | 'inherit' | undefined;
  filter?: string | undefined;
  filterRes?: number | string | undefined;
  filterUnits?: number | string | undefined;
  floodColor?: number | string | undefined;
  floodOpacity?: number | string | undefined;
  focusable?: Booleanish | 'auto' | undefined;
  fontFamily?: string | undefined;
  fontSize?: number | string | undefined;
  fontSizeAdjust?: number | string | undefined;
  fontStretch?: number | string | undefined;
  fontStyle?: number | string | undefined;
  fontVariant?: number | string | undefined;
  fontWeight?: number | string | undefined;
  format?: number | string | undefined;
  fr?: number | string | undefined;
  from?: number | string | undefined;
  fx?: number | string | undefined;
  fy?: number | string | undefined;
  g1?: number | string | undefined;
  g2?: number | string | undefined;
  glyphName?: number | string | undefined;
  glyphOrientationHorizontal?: number | string | undefined;
  glyphOrientationVertical?: number | string | undefined;
  glyphRef?: number | string | undefined;
  gradientTransform?: string | undefined;
  gradientUnits?: string | undefined;
  hanging?: number | string | undefined;
  horizAdvX?: number | string | undefined;
  horizOriginX?: number | string | undefined;
  href?: string | undefined;
  ideographic?: number | string | undefined;
  imageRendering?: number | string | undefined;
  in2?: number | string | undefined;
  in?: string | undefined;
  intercept?: number | string | undefined;
  k1?: number | string | undefined;
  k2?: number | string | undefined;
  k3?: number | string | undefined;
  k4?: number | string | undefined;
  k?: number | string | undefined;
  kernelMatrix?: number | string | undefined;
  kernelUnitLength?: number | string | undefined;
  kerning?: number | string | undefined;
  keyPoints?: number | string | undefined;
  keySplines?: number | string | undefined;
  keyTimes?: number | string | undefined;
  lengthAdjust?: number | string | undefined;
  letterSpacing?: number | string | undefined;
  lightingColor?: number | string | undefined;
  limitingConeAngle?: number | string | undefined;
  local?: number | string | undefined;
  markerEnd?: string | undefined;
  markerHeight?: number | string | undefined;
  markerMid?: string | undefined;
  markerStart?: string | undefined;
  markerUnits?: number | string | undefined;
  markerWidth?: number | string | undefined;
  mask?: string | undefined;
  maskContentUnits?: number | string | undefined;
  maskUnits?: number | string | undefined;
  mathematical?: number | string | undefined;
  mode?: number | string | undefined;
  numOctaves?: number | string | undefined;
  offset?: number | string | undefined;
  opacity?: number | string | undefined;
  operator?: number | string | undefined;
  order?: number | string | undefined;
  orient?: number | string | undefined;
  orientation?: number | string | undefined;
  origin?: number | string | undefined;
  overflow?: number | string | undefined;
  overlinePosition?: number | string | undefined;
  overlineThickness?: number | string | undefined;
  paintOrder?: number | string | undefined;
  panose1?: number | string | undefined;
  path?: string | undefined;
  pathLength?: number | string | undefined;
  patternContentUnits?: string | undefined;
  patternTransform?: number | string | undefined;
  patternUnits?: string | undefined;
  pointerEvents?: number | string | undefined;
  points?: string | undefined;
  pointsAtX?: number | string | undefined;
  pointsAtY?: number | string | undefined;
  pointsAtZ?: number | string | undefined;
  preserveAlpha?: Booleanish | undefined;
  preserveAspectRatio?: string | undefined;
  primitiveUnits?: number | string | undefined;
  r?: number | string | undefined;
  radius?: number | string | undefined;
  refX?: number | string | undefined;
  refY?: number | string | undefined;
  renderingIntent?: number | string | undefined;
  repeatCount?: number | string | undefined;
  repeatDur?: number | string | undefined;
  requiredExtensions?: number | string | undefined;
  requiredFeatures?: number | string | undefined;
  restart?: number | string | undefined;
  result?: string | undefined;
  rotate?: number | string | undefined;
  rx?: number | string | undefined;
  ry?: number | string | undefined;
  scale?: number | string | undefined;
  seed?: number | string | undefined;
  shapeRendering?: number | string | undefined;
  slope?: number | string | undefined;
  spacing?: number | string | undefined;
  specularConstant?: number | string | undefined;
  specularExponent?: number | string | undefined;
  speed?: number | string | undefined;
  spreadMethod?: string | undefined;
  startOffset?: number | string | undefined;
  stdDeviation?: number | string | undefined;
  stemh?: number | string | undefined;
  stemv?: number | string | undefined;
  stitchTiles?: number | string | undefined;
  stopColor?: string | undefined;
  stopOpacity?: number | string | undefined;
  strikethroughPosition?: number | string | undefined;
  strikethroughThickness?: number | string | undefined;
  string?: number | string | undefined;
  stroke?: string | undefined;
  strokeDasharray?: string | number | undefined;
  strokeDashoffset?: string | number | undefined;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined;
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit' | undefined;
  strokeMiterlimit?: number | string | undefined;
  strokeOpacity?: number | string | undefined;
  strokeWidth?: number | string | undefined;
  surfaceScale?: number | string | undefined;
  systemLanguage?: number | string | undefined;
  tableValues?: number | string | undefined;
  targetX?: number | string | undefined;
  targetY?: number | string | undefined;
  textAnchor?: string | undefined;
  textDecoration?: number | string | undefined;
  textLength?: number | string | undefined;
  textRendering?: number | string | undefined;
  to?: number | string | undefined;
  transform?: string | undefined;
  u1?: number | string | undefined;
  u2?: number | string | undefined;
  underlinePosition?: number | string | undefined;
  underlineThickness?: number | string | undefined;
  unicode?: number | string | undefined;
  unicodeBidi?: number | string | undefined;
  unicodeRange?: number | string | undefined;
  unitsPerEm?: number | string | undefined;
  vAlphabetic?: number | string | undefined;
  values?: string | undefined;
  vectorEffect?: number | string | undefined;
  version?: string | undefined;
  vertAdvY?: number | string | undefined;
  vertOriginX?: number | string | undefined;
  vertOriginY?: number | string | undefined;
  vHanging?: number | string | undefined;
  vIdeographic?: number | string | undefined;
  viewBox?: string | undefined;
  viewTarget?: number | string | undefined;
  visibility?: number | string | undefined;
  vMathematical?: number | string | undefined;
  widths?: number | string | undefined;
  wordSpacing?: number | string | undefined;
  writingMode?: number | string | undefined;
  x1?: number | string | undefined;
  x2?: number | string | undefined;
  x?: number | string | undefined;
  xChannelSelector?: string | undefined;
  xHeight?: number | string | undefined;
  xlinkActuate?: string | undefined;
  xlinkArcrole?: string | undefined;
  xlinkHref?: string | undefined;
  xlinkRole?: string | undefined;
  xlinkShow?: string | undefined;
  xlinkTitle?: string | undefined;
  xlinkType?: string | undefined;
  xmlBase?: string | undefined;
  xmlLang?: string | undefined;
  xmlns?: string | undefined;
  xmlnsXlink?: string | undefined;
  xmlSpace?: string | undefined;
  y1?: number | string | undefined;
  y2?: number | string | undefined;
  y?: number | string | undefined;
  yChannelSelector?: string | undefined;
  z?: number | string | undefined;
  zoomAndPan?: string | undefined;
}

export interface NanoSvgElement {
  svg: NanoHostComponentSvgProps<SVGSVGElement>;
  animate: NanoHostComponentSvgProps<SVGAnimateElement>;
  animateMotion: NanoHostComponentSvgProps<SVGElement>;
  animateTransform: NanoHostComponentSvgProps<SVGAnimateTransformElement>;
  circle: NanoHostComponentSvgProps<SVGCircleElement>;
  clipPath: NanoHostComponentSvgProps<SVGClipPathElement>;
  defs: NanoHostComponentSvgProps<SVGDefsElement>;
  desc: NanoHostComponentSvgProps<SVGDescElement>;
  ellipse: NanoHostComponentSvgProps<SVGEllipseElement>;
  feBlend: NanoHostComponentSvgProps<SVGFEBlendElement>;
  feColorMatrix: NanoHostComponentSvgProps<SVGFEColorMatrixElement>;
  feComponentTransfer: NanoHostComponentSvgProps<SVGFEComponentTransferElement>;
  feComposite: NanoHostComponentSvgProps<SVGFECompositeElement>;
  feConvolveMatrix: NanoHostComponentSvgProps<SVGFEConvolveMatrixElement>;
  feDiffuseLighting: NanoHostComponentSvgProps<SVGFEDiffuseLightingElement>;
  feDisplacementMap: NanoHostComponentSvgProps<SVGFEDisplacementMapElement>;
  feDistantLight: NanoHostComponentSvgProps<SVGFEDistantLightElement>;
  feDropShadow: NanoHostComponentSvgProps<SVGFEDropShadowElement>;
  feFlood: NanoHostComponentSvgProps<SVGFEFloodElement>;
  feFuncA: NanoHostComponentSvgProps<SVGFEFuncAElement>;
  feFuncB: NanoHostComponentSvgProps<SVGFEFuncBElement>;
  feFuncG: NanoHostComponentSvgProps<SVGFEFuncGElement>;
  feFuncR: NanoHostComponentSvgProps<SVGFEFuncRElement>;
  feGaussianBlur: NanoHostComponentSvgProps<SVGFEGaussianBlurElement>;
  feImage: NanoHostComponentSvgProps<SVGFEImageElement>;
  feMerge: NanoHostComponentSvgProps<SVGFEMergeElement>;
  feMergeNode: NanoHostComponentSvgProps<SVGFEMergeNodeElement>;
  feMorphology: NanoHostComponentSvgProps<SVGFEMorphologyElement>;
  feOffset: NanoHostComponentSvgProps<SVGFEOffsetElement>;
  fePointLight: NanoHostComponentSvgProps<SVGFEPointLightElement>;
  feSpecularLighting: NanoHostComponentSvgProps<SVGFESpecularLightingElement>;
  feSpotLight: NanoHostComponentSvgProps<SVGFESpotLightElement>;
  feTile: NanoHostComponentSvgProps<SVGFETileElement>;
  feTurbulence: NanoHostComponentSvgProps<SVGFETurbulenceElement>;
  filter: NanoHostComponentSvgProps<SVGFilterElement>;
  foreignObject: NanoHostComponentSvgProps<SVGForeignObjectElement>;
  g: NanoHostComponentSvgProps<SVGGElement>;
  image: NanoHostComponentSvgProps<SVGImageElement>;
  line: NanoHostComponentSvgProps<SVGLineElement>;
  linearGradient: NanoHostComponentSvgProps<SVGLinearGradientElement>;
  marker: NanoHostComponentSvgProps<SVGMarkerElement>;
  mask: NanoHostComponentSvgProps<SVGMaskElement>;
  metadata: NanoHostComponentSvgProps<SVGMetadataElement>;
  mpath: NanoHostComponentSvgProps<SVGElement>;
  path: NanoHostComponentSvgProps<SVGPathElement>;
  pattern: NanoHostComponentSvgProps<SVGPatternElement>;
  polygon: NanoHostComponentSvgProps<SVGPolygonElement>;
  polyline: NanoHostComponentSvgProps<SVGPolylineElement>;
  radialGradient: NanoHostComponentSvgProps<SVGRadialGradientElement>;
  rect: NanoHostComponentSvgProps<SVGRectElement>;
  set: NanoHostComponentSvgProps<SVGSetElement>;
  stop: NanoHostComponentSvgProps<SVGStopElement>;
  switch: NanoHostComponentSvgProps<SVGSwitchElement>;
  symbol: NanoHostComponentSvgProps<SVGSymbolElement>;
  text: NanoHostComponentSvgProps<SVGTextElement>;
  textPath: NanoHostComponentSvgProps<SVGTextPathElement>;
  tspan: NanoHostComponentSvgProps<SVGTSpanElement>;
  use: NanoHostComponentSvgProps<SVGUseElement>;
  view: NanoHostComponentSvgProps<SVGViewElement>;
}
