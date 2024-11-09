import * as CSS from 'csstype';
import { NanoPointerEvent } from '../../event/pointer-event';
import { NanoEventHandler } from '../../event/type';
import { NanoChildren, NanoRefProps } from '../type';
import { NanoMouseEvent } from '../../event/mouse-event';
import { NanoWheelEvent } from '../../event/wheel-event';
import { NanoFocusEvent } from '../../event/focus-event';
import { NanoClipboardEvent } from '../../event/clipboard-event';
import { NanoKeyboardEvent } from '../../event/keyboard-event';
import { NanoInputEvent } from '../../event/input-event';

type Booleanish = boolean | 'true' | 'false';

export type NanoHostComponentClassPropValue = string | string[];
export type NanoHostComponentStylePropValue = CSS.Properties<string | number>;

export type NanoHostComponentCaptureEventProps<T> = {
  onCapturePointerDown?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerUp?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerEnter?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerLeave?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerOver?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerOut?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerMove?: NanoEventHandler<NanoPointerEvent<T>>;
  onCaptureClick?: NanoEventHandler<NanoPointerEvent<T>>;
  onCaptureDblClick?: NanoEventHandler<NanoMouseEvent<T>>;
  onCaptureWheel?: NanoEventHandler<NanoWheelEvent<T>>;
  onCaptureFocusIn?: NanoEventHandler<NanoFocusEvent<T>>;
  onCaptureFocusOut?: NanoEventHandler<NanoFocusEvent<T>>;
  onCaptureCut?: NanoEventHandler<NanoClipboardEvent<T>>;
  onCaptureCopy?: NanoEventHandler<NanoClipboardEvent<T>>;
  onCapturePaste?: NanoEventHandler<NanoClipboardEvent<T>>;
  onCaptureKeyDown?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onCaptureKeyUp?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onCaptureKeyPress?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onCaptureInput?: NanoEventHandler<NanoInputEvent<T>>;
  onCaptureBeforeInput?: NanoEventHandler<NanoInputEvent<T>>;
  // TODO
};

export type NanoHostComponentBubbleEventProps<T> = {
  onPointerDown?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerUp?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerEnter?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerLeave?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerOver?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerOut?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerMove?: NanoEventHandler<NanoPointerEvent<T>>;
  onClick?: NanoEventHandler<NanoPointerEvent<T>>;
  onDblClick?: NanoEventHandler<NanoMouseEvent<T>>;
  onWheel?: NanoEventHandler<NanoWheelEvent<T>>;
  onFocusIn?: NanoEventHandler<NanoFocusEvent<T>>;
  onFocusOut?: NanoEventHandler<NanoFocusEvent<T>>;
  onCut?: NanoEventHandler<NanoClipboardEvent<T>>;
  onCopy?: NanoEventHandler<NanoClipboardEvent<T>>;
  onPaste?: NanoEventHandler<NanoClipboardEvent<T>>;
  onKeyDown?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onKeyUp?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onKeyPress?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onInput?: NanoEventHandler<NanoInputEvent<T>>;
  onBeforeInput?: NanoEventHandler<NanoInputEvent<T>>;
  // TODO
};
export type NanoHostComponentEventProps<T> =
  NanoHostComponentCaptureEventProps<T> & NanoHostComponentBubbleEventProps<T>;

export type NanoHostComponentDomProps<T> = NanoHostComponentEventProps<T> & {
  children?: NanoChildren;
};

export type NanoHostComponentAriaProps = {
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

export type NanoHostComponentAriaRole =
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

export interface NanoHostComponentHtmlProps<T>
  extends NanoHostComponentAriaProps,
    NanoHostComponentDomProps<T> {
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
  class?: NanoHostComponentClassPropValue | undefined;
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
  style?: NanoHostComponentStylePropValue | undefined;
  tabIndex?: number | undefined;
  title?: string | undefined;
  translate?: 'yes' | 'no' | undefined;

  // Unknown
  radioGroup?: string | undefined; // <command>, <menuitem>

  // WAI-ARIA
  role?: NanoHostComponentAriaRole | undefined;

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

export type NanoHostComponentProps<T> = NanoRefProps &
  NanoHostComponentHtmlProps<T>;

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

export interface NanoHostComponentAnchorProps<T>
  extends NanoHostComponentProps<T> {
  download?: unknown;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

interface NanoHostComponentButtonProps<T>
  extends NanoHostComponentHtmlProps<T> {
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

export interface NanoHostComponentDomElement {
  a: NanoHostComponentAnchorProps<HTMLAnchorElement>;
  abbr: NanoHostComponentProps<HTMLElement>;
  address: NanoHostComponentProps<HTMLElement>;

  button: NanoHostComponentButtonProps<HTMLButtonElement>;

  div: NanoHostComponentProps<HTMLDivElement>;

  span: NanoHostComponentProps<HTMLSpanElement>;
}

export interface NanoHostComponentSvgElement {
  // TODO Fix
  svg: NanoHostComponentProps<HTMLSpanElement>;
}
