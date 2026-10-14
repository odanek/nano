import type { PropsWithKey } from '../../api/key';
import type { PropsWithRef } from '../../api/ref';
import type { DomClass, DomStyle } from '../../dom/type';
import type { Event, EventHandler } from '../../dom/event';
import type { AriaProps, AriaRole } from './aria';
import type { Booleanish, CrossOrigin, DomProps } from './common';

// Largely taken from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts

export interface HtmlProps<T extends HTMLElement>
  extends AriaProps, DomProps<T> {
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
  class?: DomClass | undefined;
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
  style?: DomStyle | undefined;
  tabIndex?: number | undefined;
  title?: string | undefined;
  translate?: 'yes' | 'no' | undefined;

  // Unknown
  radioGroup?: string | undefined; // <command>, <menuitem>

  // WAI-ARIA
  role?: AriaRole | undefined;

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

export interface HtmlAnchorProps extends HtmlProps<HTMLAnchorElement> {
  download?: unknown;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

interface HtmlAreaProps extends HtmlProps<HTMLAreaElement> {
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
interface HtmlAudioProps extends HtmlMediaProps<HTMLAudioElement> {}

interface HtmlBaseProps extends HtmlProps<HTMLBaseElement> {
  href?: string | undefined;
  target?: string | undefined;
}

interface HtmlBlockquoteProps extends HtmlProps<HTMLQuoteElement> {
  cite?: string | undefined;
}

interface HtmlButtonProps extends HtmlProps<HTMLButtonElement> {
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

interface HtmlCanvasProps extends HtmlProps<HTMLCanvasElement> {
  height?: number | string | undefined;
  width?: number | string | undefined;
}

interface HtmlColProps extends HtmlProps<HTMLTableColElement> {
  span?: number | undefined;
  width?: number | string | undefined;
}

interface HtmlColgroupProps extends HtmlProps<HTMLTableColElement> {
  span?: number | undefined;
}

interface HtmlDataProps extends HtmlProps<HTMLDataElement> {
  value?: string | readonly string[] | number | undefined;
}

interface HtmlDelProps extends HtmlProps<HTMLModElement> {
  cite?: string | undefined;
  dateTime?: string | undefined;
}

interface HtmlDetailsProps extends HtmlProps<HTMLDetailsElement> {
  open?: boolean | undefined;
  name?: string | undefined;
  onToggle?: EventHandler<Event<HTMLDetailsElement>> | undefined;
  onCaptureToggle?: EventHandler<Event<HTMLDetailsElement>> | undefined;
}

interface HtmlDialogProps extends HtmlProps<HTMLDialogElement> {
  open?: boolean | undefined;
  onCancel?: EventHandler<Event<HTMLDialogElement>> | undefined;
  onCaptureCancel?: EventHandler<Event<HTMLDialogElement>> | undefined;
  onClose?: EventHandler<Event<HTMLDialogElement>> | undefined;
  onCaptureClose?: EventHandler<Event<HTMLDialogElement>> | undefined;
}

interface HtmlEmbedProps extends HtmlProps<HTMLEmbedElement> {
  height?: number | string | undefined;
  src?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
}

interface HtmlFieldsetProps extends HtmlProps<HTMLFieldSetElement> {
  disabled?: boolean | undefined;
  form?: string | undefined;
  name?: string | undefined;
}

interface HtmlFormProps extends HtmlProps<HTMLFormElement> {
  acceptCharset?: string | undefined;
  action?: string | undefined;
  autoComplete?: string | undefined;
  encType?: string | undefined;
  method?: string | undefined;
  name?: string | undefined;
  noValidate?: boolean | undefined;
  target?: string | undefined;
}

interface HtmlHtmlProps extends HtmlProps<HTMLHtmlElement> {
  manifest?: string | undefined;
}

interface HtmlIframeProps extends HtmlProps<HTMLIFrameElement> {
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

interface HtmlImgProps extends HtmlProps<HTMLImageElement> {
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

type HtmlInputTypeAttribute =
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
type HtmlInputAutoCompleteAttribute = AutoFill | (string & {});

interface HtmlInputProps extends HtmlProps<HTMLInputElement> {
  accept?: string | undefined;
  alt?: string | undefined;
  autoComplete?: HtmlInputAutoCompleteAttribute | undefined;
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
  type?: HtmlInputTypeAttribute | undefined;
  value?: string | readonly string[] | number | undefined;
  width?: number | string | undefined;
  onChange?: EventHandler<Event<HTMLInputElement>> | undefined;
  onCaptureChange?: EventHandler<Event<HTMLInputElement>> | undefined;
}

interface HtmlInsProps extends HtmlProps<HTMLModElement> {
  cite?: string | undefined;
  dateTime?: string | undefined;
}

interface HtmlKeygenProps extends HtmlProps<HTMLUnknownElement> {
  challenge?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  keyType?: string | undefined;
  keyParams?: string | undefined;
  name?: string | undefined;
}

interface HtmlLabelProps extends HtmlProps<HTMLLabelElement> {
  form?: string | undefined;
  htmlFor?: string | undefined;
}

interface HtmlLiProps extends HtmlProps<HTMLLIElement> {
  value?: string | readonly string[] | number | undefined;
}

interface HtmlLinkProps extends HtmlProps<HTMLLinkElement> {
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

interface HtmlMapProps extends HtmlProps<HTMLMapElement> {
  name?: string | undefined;
}

interface HtmlMenuProps extends HtmlProps<HTMLMenuElement> {
  type?: string | undefined;
}

interface HtmlMediaProps<T extends HTMLMediaElement> extends HtmlProps<T> {
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

interface HtmlMetaProps extends HtmlProps<HTMLMetaElement> {
  charSet?: string | undefined;
  content?: string | undefined;
  httpEquiv?: string | undefined;
  media?: string | undefined;
  name?: string | undefined;
}

interface HtmlMeterProps extends HtmlProps<HTMLMeterElement> {
  form?: string | undefined;
  high?: number | undefined;
  low?: number | undefined;
  max?: number | string | undefined;
  min?: number | string | undefined;
  optimum?: number | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface HtmlObjectProps extends HtmlProps<HTMLObjectElement> {
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

interface HtmlOlProps extends HtmlProps<HTMLOListElement> {
  reversed?: boolean | undefined;
  start?: number | undefined;
  type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
}

interface HtmlOptgroupProps extends HtmlProps<HTMLOptGroupElement> {
  disabled?: boolean | undefined;
  label?: string | undefined;
}

interface HtmlOptionProps extends HtmlProps<HTMLOptionElement> {
  disabled?: boolean | undefined;
  label?: string | undefined;
  selected?: boolean | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface HtmlOutputProps extends HtmlProps<HTMLOutputElement> {
  form?: string | undefined;
  htmlFor?: string | undefined;
  name?: string | undefined;
}

interface HtmlParamProps extends HtmlProps<HTMLParamElement> {
  name?: string | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface HtmlProgressProps extends HtmlProps<HTMLProgressElement> {
  max?: number | string | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface HtmlQuoteProps extends HtmlProps<HTMLQuoteElement> {
  cite?: string | undefined;
}

interface HtmlSlotProps extends HtmlProps<HTMLSlotElement> {
  name?: string | undefined;
}

interface HtmlScriptProps extends HtmlProps<HTMLScriptElement> {
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

interface HtmlSelectProps extends HtmlProps<HTMLSelectElement> {
  autoComplete?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  value?: string | readonly string[] | number | undefined;
  onChange?: EventHandler<Event<HTMLSelectElement>> | undefined;
  onCaptureChange?: EventHandler<Event<HTMLSelectElement>> | undefined;
}

interface HtmlSourceProps extends HtmlProps<HTMLSourceElement> {
  height?: number | string | undefined;
  media?: string | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
}

interface HtmlStyleProps extends HtmlProps<HTMLStyleElement> {
  media?: string | undefined;
  scoped?: boolean | undefined;
  type?: string | undefined;
}

interface HtmlTableProps extends HtmlProps<HTMLTableElement> {
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

interface HtmlTextareaProps extends HtmlProps<HTMLTextAreaElement> {
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
  onChange?: EventHandler<Event<HTMLTextAreaElement>> | undefined;
  onCaptureChange?: EventHandler<Event<HTMLTextAreaElement>> | undefined;
}

interface HtmlTdProps extends HtmlProps<HTMLTableCellElement> {
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

interface HtmlThProps extends HtmlProps<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
}

interface HtmlTimeProps extends HtmlProps<HTMLTimeElement> {
  dateTime?: string | undefined;
}

interface HtmlTrackProps extends HtmlProps<HTMLTrackElement> {
  default?: boolean | undefined;
  kind?: string | undefined;
  label?: string | undefined;
  src?: string | undefined;
  srcLang?: string | undefined;
}

interface HtmlVideoProps extends HtmlMediaProps<HTMLVideoElement> {
  height?: number | string | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  width?: number | string | undefined;
  disablePictureInPicture?: boolean | undefined;
  disableRemotePlayback?: boolean | undefined;
}

interface HtmlWebViewProps extends HtmlProps<HTMLUnknownElement> {
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

export type JsxHtmlProps<
  P extends HtmlProps<E>,
  E extends HTMLElement,
> = PropsWithRef<PropsWithKey<P>>;

export interface HtmlIntrinsicElements {
  a: JsxHtmlProps<HtmlAnchorProps, HTMLAnchorElement>;
  abbr: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  address: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  area: JsxHtmlProps<HtmlAreaProps, HTMLAreaElement>;
  article: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  aside: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  audio: JsxHtmlProps<HtmlAudioProps, HTMLAudioElement>;
  b: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  base: JsxHtmlProps<HtmlBaseProps, HTMLBaseElement>;
  bdi: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  bdo: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  big: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  blockquote: JsxHtmlProps<HtmlBlockquoteProps, HTMLQuoteElement>;
  body: JsxHtmlProps<HtmlProps<HTMLBodyElement>, HTMLBodyElement>;
  br: JsxHtmlProps<HtmlProps<HTMLBRElement>, HTMLBRElement>;
  button: JsxHtmlProps<HtmlButtonProps, HTMLButtonElement>;
  canvas: JsxHtmlProps<HtmlCanvasProps, HTMLCanvasElement>;
  caption: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  center: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  cite: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  code: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  col: JsxHtmlProps<HtmlColProps, HTMLTableColElement>;
  colgroup: JsxHtmlProps<HtmlColgroupProps, HTMLTableColElement>;
  data: JsxHtmlProps<HtmlDataProps, HTMLDataElement>;
  datalist: JsxHtmlProps<HtmlProps<HTMLDataListElement>, HTMLDataListElement>;
  dd: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  del: JsxHtmlProps<HtmlDelProps, HTMLModElement>;
  details: JsxHtmlProps<HtmlDetailsProps, HTMLDetailsElement>;
  dfn: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  dialog: JsxHtmlProps<HtmlDialogProps, HTMLDialogElement>;
  div: JsxHtmlProps<HtmlProps<HTMLDivElement>, HTMLDivElement>;
  dl: JsxHtmlProps<HtmlProps<HTMLDListElement>, HTMLDListElement>;
  dt: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  em: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  embed: JsxHtmlProps<HtmlEmbedProps, HTMLEmbedElement>;
  fieldset: JsxHtmlProps<HtmlFieldsetProps, HTMLFieldSetElement>;
  figcaption: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  figure: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  footer: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  form: JsxHtmlProps<HtmlFormProps, HTMLFormElement>;
  h1: JsxHtmlProps<HtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h2: JsxHtmlProps<HtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h3: JsxHtmlProps<HtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h4: JsxHtmlProps<HtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h5: JsxHtmlProps<HtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  h6: JsxHtmlProps<HtmlProps<HTMLHeadingElement>, HTMLHeadingElement>;
  head: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  header: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  hgroup: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  hr: JsxHtmlProps<HtmlProps<HTMLHRElement>, HTMLHRElement>;
  html: JsxHtmlProps<HtmlHtmlProps, HTMLHtmlElement>;
  i: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  iframe: JsxHtmlProps<HtmlIframeProps, HTMLIFrameElement>;
  img: JsxHtmlProps<HtmlImgProps, HTMLImageElement>;
  input: JsxHtmlProps<HtmlInputProps, HTMLInputElement>;
  ins: JsxHtmlProps<HtmlInsProps, HTMLModElement>;
  kbd: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  keygen: JsxHtmlProps<HtmlKeygenProps, HTMLElement>;
  label: JsxHtmlProps<HtmlLabelProps, HTMLLabelElement>;
  legend: JsxHtmlProps<HtmlProps<HTMLLegendElement>, HTMLLegendElement>;
  li: JsxHtmlProps<HtmlLiProps, HTMLLIElement>;
  link: JsxHtmlProps<HtmlLinkProps, HTMLLinkElement>;
  main: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  map: JsxHtmlProps<HtmlMapProps, HTMLMapElement>;
  mark: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  menu: JsxHtmlProps<HtmlMenuProps, HTMLMenuElement>;
  menuitem: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  meta: JsxHtmlProps<HtmlMetaProps, HTMLMetaElement>;
  meter: JsxHtmlProps<HtmlMeterProps, HTMLMeterElement>;
  nav: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  noscript: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  object: JsxHtmlProps<HtmlObjectProps, HTMLObjectElement>;
  ol: JsxHtmlProps<HtmlOlProps, HTMLOListElement>;
  optgroup: JsxHtmlProps<HtmlOptgroupProps, HTMLOptGroupElement>;
  option: JsxHtmlProps<HtmlOptionProps, HTMLOptionElement>;
  output: JsxHtmlProps<HtmlOutputProps, HTMLOutputElement>;
  p: JsxHtmlProps<HtmlProps<HTMLParagraphElement>, HTMLParagraphElement>;
  param: JsxHtmlProps<HtmlParamProps, HTMLParamElement>;
  picture: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  pre: JsxHtmlProps<HtmlProps<HTMLPreElement>, HTMLPreElement>;
  progress: JsxHtmlProps<HtmlProgressProps, HTMLProgressElement>;
  q: JsxHtmlProps<HtmlQuoteProps, HTMLQuoteElement>;
  rp: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  rt: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  ruby: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  s: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  samp: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  search: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  slot: JsxHtmlProps<HtmlSlotProps, HTMLSlotElement>;
  script: JsxHtmlProps<HtmlScriptProps, HTMLScriptElement>;
  section: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  select: JsxHtmlProps<HtmlSelectProps, HTMLSelectElement>;
  small: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  source: JsxHtmlProps<HtmlSourceProps, HTMLSourceElement>;
  span: JsxHtmlProps<HtmlProps<HTMLSpanElement>, HTMLSpanElement>;
  strong: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  style: JsxHtmlProps<HtmlStyleProps, HTMLStyleElement>;
  sub: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  summary: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  sup: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  table: JsxHtmlProps<HtmlTableProps, HTMLTableElement>;
  template: JsxHtmlProps<HtmlProps<HTMLTemplateElement>, HTMLTemplateElement>;
  tbody: JsxHtmlProps<
    HtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  td: JsxHtmlProps<HtmlTdProps, HTMLTableCellElement>;
  textarea: JsxHtmlProps<HtmlTextareaProps, HTMLTextAreaElement>;
  tfoot: JsxHtmlProps<
    HtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  th: JsxHtmlProps<HtmlThProps, HTMLTableCellElement>;
  thead: JsxHtmlProps<
    HtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  time: JsxHtmlProps<HtmlTimeProps, HTMLTimeElement>;
  title: JsxHtmlProps<HtmlProps<HTMLTitleElement>, HTMLTitleElement>;
  tr: JsxHtmlProps<HtmlProps<HTMLTableRowElement>, HTMLTableRowElement>;
  track: JsxHtmlProps<HtmlTrackProps, HTMLTrackElement>;
  u: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  ul: JsxHtmlProps<HtmlProps<HTMLUListElement>, HTMLUListElement>;
  var: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  video: JsxHtmlProps<HtmlVideoProps, HTMLVideoElement>;
  wbr: JsxHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  webview: JsxHtmlProps<HtmlWebViewProps, HTMLElement>;
}
