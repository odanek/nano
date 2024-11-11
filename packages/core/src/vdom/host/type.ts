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
import { NanoGenericEvent } from '../../event/generic-event';

type Booleanish = boolean | 'true' | 'false';

type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type NanoHostComponentClassPropValue = string | string[];
export type NanoHostComponentStylePropValue = CSS.Properties<string | number>;

export type NanoHostComponentCaptureEventProps<T> = {
  // Pointer
  onCapturePointerDown?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerUp?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerEnter?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerLeave?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerOver?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerOut?: NanoEventHandler<NanoPointerEvent<T>>;
  onCapturePointerMove?: NanoEventHandler<NanoPointerEvent<T>>;
  onCaptureClick?: NanoEventHandler<NanoPointerEvent<T>>;
  onCaptureContextMenu?: NanoEventHandler<NanoPointerEvent<T>>;
  // Mouse
  onCaptureDblClick?: NanoEventHandler<NanoMouseEvent<T>>;
  // Wheel
  onCaptureWheel?: NanoEventHandler<NanoWheelEvent<T>>;
  // Focus
  onCaptureFocusIn?: NanoEventHandler<NanoFocusEvent<T>>;
  onCaptureFocusOut?: NanoEventHandler<NanoFocusEvent<T>>;
  // Clipboard
  onCaptureCut?: NanoEventHandler<NanoClipboardEvent<T>>;
  onCaptureCopy?: NanoEventHandler<NanoClipboardEvent<T>>;
  onCapturePaste?: NanoEventHandler<NanoClipboardEvent<T>>;
  // Keyboard
  onCaptureKeyDown?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onCaptureKeyUp?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onCaptureKeyPress?: NanoEventHandler<NanoKeyboardEvent<T>>;
  // Input
  onCaptureInput?: NanoEventHandler<NanoInputEvent<T>>;
  onCaptureBeforeInput?: NanoEventHandler<NanoInputEvent<T>>;
  // Generic
  onCaptureChange?: NanoEventHandler<NanoGenericEvent<T>>;
  onCaptureSelect?: NanoEventHandler<NanoGenericEvent<T>>;
  onCaptureScroll?: NanoEventHandler<NanoGenericEvent<T>>;
  // TODO
};

export type NanoHostComponentBubbleEventProps<T> = {
  // Pointer
  onPointerDown?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerUp?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerEnter?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerLeave?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerOver?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerOut?: NanoEventHandler<NanoPointerEvent<T>>;
  onPointerMove?: NanoEventHandler<NanoPointerEvent<T>>;
  onClick?: NanoEventHandler<NanoPointerEvent<T>>;
  onContextMenu?: NanoEventHandler<NanoPointerEvent<T>>;
  // Mouse
  onDblClick?: NanoEventHandler<NanoMouseEvent<T>>;
  // Wheel
  onWheel?: NanoEventHandler<NanoWheelEvent<T>>;
  // Focus
  onFocusIn?: NanoEventHandler<NanoFocusEvent<T>>;
  onFocusOut?: NanoEventHandler<NanoFocusEvent<T>>;
  // Clipboard
  onCut?: NanoEventHandler<NanoClipboardEvent<T>>;
  onCopy?: NanoEventHandler<NanoClipboardEvent<T>>;
  onPaste?: NanoEventHandler<NanoClipboardEvent<T>>;
  // Keyboard
  onKeyDown?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onKeyUp?: NanoEventHandler<NanoKeyboardEvent<T>>;
  onKeyPress?: NanoEventHandler<NanoKeyboardEvent<T>>;
  // Input
  onInput?: NanoEventHandler<NanoInputEvent<T>>;
  onBeforeInput?: NanoEventHandler<NanoInputEvent<T>>;
  // Generic
  onChange?: NanoEventHandler<NanoGenericEvent<T>>;
  onSelect?: NanoEventHandler<NanoGenericEvent<T>>;
  onScroll?: NanoEventHandler<NanoGenericEvent<T>>;
  // TODO
};
export type NanoHostComponentEventProps<T> =
  NanoHostComponentCaptureEventProps<T> & NanoHostComponentBubbleEventProps<T>;

export type NanoHostComponentDomProps<T> = NanoHostComponentEventProps<T> & {
  children?: NanoChildren;
};

export type NanoHtmlAriaProps = {
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

export type NanoHtmlAriaRole =
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

export interface NanoHtmlProps<T>
  extends NanoHtmlAriaProps,
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
  role?: NanoHtmlAriaRole | undefined;

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

export type NanoHostComponentProps<P extends NanoHtmlProps<E>, E extends HTMLElement> = NanoRefProps & P;

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

export interface NanoHtmlAnchorProps<T>
  extends NanoHtmlProps<T> {
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

interface NanoHtmlButtonProps<T>
  extends NanoHtmlProps<T> {
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

export interface NanoDomElement {
  a: NanoHostComponentProps<NanoHtmlAnchorProps<HTMLAnchorElement>, HTMLAnchorElement>;
  abbr: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  address: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  area: NanoHostComponentProps<NanoHtmlAreaProps<HTMLAreaElement>, HTMLAreaElement>;
  article: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  aside: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  audio: NanoHostComponentProps<NanoHtmlAudioProps<HTMLAudioElement>, HTMLAudioElement>;
  b: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  base: NanoHostComponentProps<NanoHtmlBaseProps<HTMLBaseElement>, HTMLBaseElement>;
  bdi: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  bdo: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  big: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  blockquote: NanoHostComponentProps<NanoHtmlBlockquoteProps<HTMLQuoteElement>, HTMLQuoteElement>;
  body: NanoHostComponentProps<NanoHtmlProps<HTMLBodyElement>, HTMLBodyElement>;
  br: NanoHostComponentProps<NanoHtmlProps<HTMLBRElement>, HTMLBRElement>;
  button: NanoHostComponentProps<NanoHtmlButtonProps<HTMLButtonElement>, HTMLButtonElement>;

  // canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
  caption: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  center: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  cite: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  code: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // col: ColHTMLAttributes<HTMLTableColElement>;
  // colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
  // data: DataHTMLAttributes<HTMLDataElement>;
  datalist: NanoHostComponentProps<NanoHtmlProps<HTMLDataListElement>, HTMLDataListElement>;
  dd: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // del: DelHTMLAttributes<HTMLModElement>;
  // details: DetailsHTMLAttributes<HTMLDetailsElement>;
  dfn: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // dialog: DialogHTMLAttributes<HTMLDialogElement>;
  div: NanoHostComponentProps<NanoHtmlProps<HTMLDivElement>, HTMLDivElement>;
  dl: NanoHostComponentProps<NanoHtmlProps<HTMLDListElement>, HTMLDListElement>;
  dt: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  em: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // embed: EmbedHTMLAttributes<HTMLEmbedElement>;
  // fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
  figcaption: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  figure: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  footer: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // form: FormHTMLAttributes<HTMLFormElement>;
  h1: NanoHostComponentProps<NanoHtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h2: NanoHostComponentProps<NanoHtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h3: NanoHostComponentProps<NanoHtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h4: NanoHostComponentProps<NanoHtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h5: NanoHostComponentProps<NanoHtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h6: NanoHostComponentProps<NanoHtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  head: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  header: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  hgroup: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // hr: NanoHostComponentProps<HTMLHRElement>;
  // html: HtmlHTMLAttributes<HTMLHtmlElement>;
  i: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // iframe: IframeHTMLAttributes<HTMLIFrameElement>;
  // img: ImgHTMLAttributes<HTMLImageElement>;
  // input: InputHTMLAttributes<HTMLInputElement>;
  // ins: InsHTMLAttributes<HTMLModElement>;
  kbd: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // keygen: KeygenHTMLAttributes<HTMLElement>;
  // label: LabelHTMLAttributes<HTMLLabelElement>;
  legend: NanoHostComponentProps<NanoHtmlProps<HTMLLegendElement>, HTMLLegendElement>;
  // li: LiHTMLAttributes<HTMLLIElement>;
  // link: LinkHTMLAttributes<HTMLLinkElement>;
  main: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // map: MapHTMLAttributes<HTMLMapElement>;
  mark: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // menu: MenuHTMLAttributes<HTMLElement>;
  menuitem: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // meta: MetaHTMLAttributes<HTMLMetaElement>;
  // meter: MeterHTMLAttributes<HTMLMeterElement>;
  nav: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  noscript: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // object: ObjectHTMLAttributes<HTMLObjectElement>;
  // ol: OlHTMLAttributes<HTMLOListElement>;
  // optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
  // option: OptionHTMLAttributes<HTMLOptionElement>;
  // output: OutputHTMLAttributes<HTMLOutputElement>;
  p: NanoHostComponentProps<NanoHtmlProps<HTMLParagraphElement>, HTMLParagraphElement>;
  // param: ParamHTMLAttributes<HTMLParamElement>;
  picture: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  pre: NanoHostComponentProps<NanoHtmlProps<HTMLPreElement>, HTMLPreElement>;
  // progress: ProgressHTMLAttributes<HTMLProgressElement>;
  // q: QuoteHTMLAttributes<HTMLQuoteElement>;
  rp: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  rt: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  ruby: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  s: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  samp: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  search: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // slot: SlotHTMLAttributes<HTMLSlotElement>;
  // script: ScriptHTMLAttributes<HTMLScriptElement>;
  section: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // select: SelectHTMLAttributes<HTMLSelectElement>;
  small: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // source: SourceHTMLAttributes<HTMLSourceElement>;
  span: NanoHostComponentProps<NanoHtmlProps<HTMLSpanElement>, HTMLSpanElement>;
  strong: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // style: StyleHTMLAttributes<HTMLStyleElement>;
  sub: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  summary: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  sup: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // table: TableHTMLAttributes<HTMLTableElement>;
  template: NanoHostComponentProps<NanoHtmlProps<HTMLTemplateElement>, HTMLTemplateElement>;
  tbody: NanoHostComponentProps<NanoHtmlProps<HTMLTableSectionElement>, HTMLTableSectionElement>;
  // td: TdHTMLAttributes<HTMLTableDataCellElement>;
  // textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
  tfoot: NanoHostComponentProps<NanoHtmlProps<HTMLTableSectionElement>, HTMLTableSectionElement>;
  // th: ThHTMLAttributes<HTMLTableHeaderCellElement>;
  thead: NanoHostComponentProps<NanoHtmlProps<HTMLTableSectionElement>, HTMLTableSectionElement>;
  // time: TimeHTMLAttributes<HTMLTimeElement>;
  title: NanoHostComponentProps<NanoHtmlProps<HTMLTitleElement>, HTMLTitleElement>;
  tr: NanoHostComponentProps<NanoHtmlProps<HTMLTableRowElement>, HTMLTableRowElement>;
  // track: TrackHTMLAttributes<HTMLTrackElement>;
  u: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  ul: NanoHostComponentProps<NanoHtmlProps<HTMLUListElement>, HTMLUListElement>;
  var: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // video: VideoHTMLAttributes<HTMLVideoElement>;
  wbr: NanoHostComponentProps<NanoHtmlProps<HTMLElement>, HTMLElement>;
  // webview: WebViewHTMLAttributes<HTMLWebViewElement>;
}

export interface NanoSvgElement {
  // TODO Fix
  
}
