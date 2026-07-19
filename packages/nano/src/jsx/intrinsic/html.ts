import type {
  NanoDomClass,
  NanoDomStyle,
  NanoEvent,
  NanoEventHandler,
} from '../../dom';
import type { NanoKeyProps, NanoRefProps } from '../../vdom/type';
import type { AriaProps, AriaRole } from './aria';
import type {
  Booleanish,
  CrossOrigin,
  DomProps,
} from './common';

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

export interface NanoHtmlAnchorProps extends HtmlProps<HTMLAnchorElement> {
  download?: unknown;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

interface NanoHtmlAreaProps extends HtmlProps<HTMLAreaElement> {
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
interface NanoHtmlAudioProps extends NanoHtmlMediaProps<HTMLAudioElement> {}

interface NanoHtmlBaseProps extends HtmlProps<HTMLBaseElement> {
  href?: string | undefined;
  target?: string | undefined;
}

interface NanoHtmlBlockquoteProps extends HtmlProps<HTMLQuoteElement> {
  cite?: string | undefined;
}

interface NanoHtmlButtonProps extends HtmlProps<HTMLButtonElement> {
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

interface NanoHtmlCanvasProps extends HtmlProps<HTMLCanvasElement> {
  height?: number | string | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlColProps extends HtmlProps<HTMLTableColElement> {
  span?: number | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlColgroupProps extends HtmlProps<HTMLTableColElement> {
  span?: number | undefined;
}

interface NanoHtmlDataProps extends HtmlProps<HTMLDataElement> {
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlDelProps extends HtmlProps<HTMLModElement> {
  cite?: string | undefined;
  dateTime?: string | undefined;
}

interface NanoHtmlDetailsProps extends HtmlProps<HTMLDetailsElement> {
  open?: boolean | undefined;
  name?: string | undefined;
  onToggle?: NanoEventHandler<NanoEvent<HTMLDetailsElement>> | undefined;
  onCaptureToggle?: NanoEventHandler<NanoEvent<HTMLDetailsElement>> | undefined;
}

interface NanoHtmlDialogProps extends HtmlProps<HTMLDialogElement> {
  open?: boolean | undefined;
  onCancel?: NanoEventHandler<NanoEvent<HTMLDialogElement>> | undefined;
  onCaptureCancel?: NanoEventHandler<NanoEvent<HTMLDialogElement>> | undefined;
  onClose?: NanoEventHandler<NanoEvent<HTMLDialogElement>> | undefined;
  onCaptureClose?: NanoEventHandler<NanoEvent<HTMLDialogElement>> | undefined;
}

interface NanoHtmlEmbedProps extends HtmlProps<HTMLEmbedElement> {
  height?: number | string | undefined;
  src?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlFieldsetProps extends HtmlProps<HTMLFieldSetElement> {
  disabled?: boolean | undefined;
  form?: string | undefined;
  name?: string | undefined;
}

interface NanoHtmlFormProps extends HtmlProps<HTMLFormElement> {
  acceptCharset?: string | undefined;
  action?: string | undefined;
  autoComplete?: string | undefined;
  encType?: string | undefined;
  method?: string | undefined;
  name?: string | undefined;
  noValidate?: boolean | undefined;
  target?: string | undefined;
}

interface NanoHtmlHtmlProps extends HtmlProps<HTMLHtmlElement> {
  manifest?: string | undefined;
}

interface NanoHtmlIframeProps extends HtmlProps<HTMLIFrameElement> {
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

interface NanoHtmlImgProps extends HtmlProps<HTMLImageElement> {
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

interface NanoHtmlInputProps extends HtmlProps<HTMLInputElement> {
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
  onChange?: NanoEventHandler<NanoEvent<HTMLInputElement>> | undefined;
  onCaptureChange?: NanoEventHandler<NanoEvent<HTMLInputElement>> | undefined;
}

interface NanoHtmlInsProps extends HtmlProps<HTMLModElement> {
  cite?: string | undefined;
  dateTime?: string | undefined;
}

interface NanoHtmlKeygenProps extends HtmlProps<HTMLUnknownElement> {
  challenge?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  keyType?: string | undefined;
  keyParams?: string | undefined;
  name?: string | undefined;
}

interface NanoHtmlLabelProps extends HtmlProps<HTMLLabelElement> {
  form?: string | undefined;
  htmlFor?: string | undefined;
}

interface NanoHtmlLiProps extends HtmlProps<HTMLLIElement> {
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlLinkProps extends HtmlProps<HTMLLinkElement> {
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

interface NanoHtmlMapProps extends HtmlProps<HTMLMapElement> {
  name?: string | undefined;
}

interface NanoHtmlMenuProps extends HtmlProps<HTMLMenuElement> {
  type?: string | undefined;
}

interface NanoHtmlMediaProps<T extends HTMLMediaElement> extends HtmlProps<T> {
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

interface NanoHtmlMetaProps extends HtmlProps<HTMLMetaElement> {
  charSet?: string | undefined;
  content?: string | undefined;
  httpEquiv?: string | undefined;
  media?: string | undefined;
  name?: string | undefined;
}

interface NanoHtmlMeterProps extends HtmlProps<HTMLMeterElement> {
  form?: string | undefined;
  high?: number | undefined;
  low?: number | undefined;
  max?: number | string | undefined;
  min?: number | string | undefined;
  optimum?: number | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlObjectProps extends HtmlProps<HTMLObjectElement> {
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

interface NanoHtmlOlProps extends HtmlProps<HTMLOListElement> {
  reversed?: boolean | undefined;
  start?: number | undefined;
  type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
}

interface NanoHtmlOptgroupProps extends HtmlProps<HTMLOptGroupElement> {
  disabled?: boolean | undefined;
  label?: string | undefined;
}

interface NanoHtmlOptionProps extends HtmlProps<HTMLOptionElement> {
  disabled?: boolean | undefined;
  label?: string | undefined;
  selected?: boolean | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlOutputProps extends HtmlProps<HTMLOutputElement> {
  form?: string | undefined;
  htmlFor?: string | undefined;
  name?: string | undefined;
}

interface NanoHtmlParamProps extends HtmlProps<HTMLParamElement> {
  name?: string | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlProgressProps extends HtmlProps<HTMLProgressElement> {
  max?: number | string | undefined;
  value?: string | readonly string[] | number | undefined;
}

interface NanoHtmlQuoteProps extends HtmlProps<HTMLQuoteElement> {
  cite?: string | undefined;
}

interface NanoHtmlSlotProps extends HtmlProps<HTMLSlotElement> {
  name?: string | undefined;
}

interface NanoHtmlScriptProps extends HtmlProps<HTMLScriptElement> {
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

interface NanoHtmlSelectProps extends HtmlProps<HTMLSelectElement> {
  autoComplete?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  value?: string | readonly string[] | number | undefined;
  onChange?: NanoEventHandler<NanoEvent<HTMLSelectElement>> | undefined;
  onCaptureChange?: NanoEventHandler<NanoEvent<HTMLSelectElement>> | undefined;
}

interface NanoHtmlSourceProps extends HtmlProps<HTMLSourceElement> {
  height?: number | string | undefined;
  media?: string | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
}

interface NanoHtmlStyleProps extends HtmlProps<HTMLStyleElement> {
  media?: string | undefined;
  scoped?: boolean | undefined;
  type?: string | undefined;
}

interface NanoHtmlTableProps extends HtmlProps<HTMLTableElement> {
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

interface NanoHtmlTextareaProps extends HtmlProps<HTMLTextAreaElement> {
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
  onChange?: NanoEventHandler<NanoEvent<HTMLTextAreaElement>> | undefined;
  onCaptureChange?:
    | NanoEventHandler<NanoEvent<HTMLTextAreaElement>>
    | undefined;
}

interface NanoHtmlTdProps extends HtmlProps<HTMLTableCellElement> {
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

interface NanoHtmlThProps extends HtmlProps<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
}

interface NanoHtmlTimeProps extends HtmlProps<HTMLTimeElement> {
  dateTime?: string | undefined;
}

interface NanoHtmlTrackProps extends HtmlProps<HTMLTrackElement> {
  default?: boolean | undefined;
  kind?: string | undefined;
  label?: string | undefined;
  src?: string | undefined;
  srcLang?: string | undefined;
}

interface NanoHtmlVideoProps extends NanoHtmlMediaProps<HTMLVideoElement> {
  height?: number | string | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  width?: number | string | undefined;
  disablePictureInPicture?: boolean | undefined;
  disableRemotePlayback?: boolean | undefined;
}

interface NanoHtmlWebViewProps extends HtmlProps<HTMLUnknownElement> {
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

export type NanoHostComponentHtmlProps<
  P extends HtmlProps<E>,
  E extends HTMLElement,
> = NanoRefProps & NanoKeyProps & P;

export interface HtmlIntrinsicElements {
  a: NanoHostComponentHtmlProps<NanoHtmlAnchorProps, HTMLAnchorElement>;
  abbr: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  address: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  area: NanoHostComponentHtmlProps<NanoHtmlAreaProps, HTMLAreaElement>;
  article: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  aside: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  audio: NanoHostComponentHtmlProps<NanoHtmlAudioProps, HTMLAudioElement>;
  b: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  base: NanoHostComponentHtmlProps<NanoHtmlBaseProps, HTMLBaseElement>;
  bdi: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  bdo: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  big: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  blockquote: NanoHostComponentHtmlProps<
    NanoHtmlBlockquoteProps,
    HTMLQuoteElement
  >;
  body: NanoHostComponentHtmlProps<HtmlProps<HTMLBodyElement>, HTMLBodyElement>;
  br: NanoHostComponentHtmlProps<HtmlProps<HTMLBRElement>, HTMLBRElement>;
  button: NanoHostComponentHtmlProps<NanoHtmlButtonProps, HTMLButtonElement>;
  canvas: NanoHostComponentHtmlProps<NanoHtmlCanvasProps, HTMLCanvasElement>;
  caption: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  center: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  cite: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  code: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  col: NanoHostComponentHtmlProps<NanoHtmlColProps, HTMLTableColElement>;
  colgroup: NanoHostComponentHtmlProps<
    NanoHtmlColgroupProps,
    HTMLTableColElement
  >;
  data: NanoHostComponentHtmlProps<NanoHtmlDataProps, HTMLDataElement>;
  datalist: NanoHostComponentHtmlProps<
    HtmlProps<HTMLDataListElement>,
    HTMLDataListElement
  >;
  dd: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  del: NanoHostComponentHtmlProps<NanoHtmlDelProps, HTMLModElement>;
  details: NanoHostComponentHtmlProps<NanoHtmlDetailsProps, HTMLDetailsElement>;
  dfn: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  dialog: NanoHostComponentHtmlProps<NanoHtmlDialogProps, HTMLDialogElement>;
  div: NanoHostComponentHtmlProps<HtmlProps<HTMLDivElement>, HTMLDivElement>;
  dl: NanoHostComponentHtmlProps<HtmlProps<HTMLDListElement>, HTMLDListElement>;
  dt: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  em: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  embed: NanoHostComponentHtmlProps<NanoHtmlEmbedProps, HTMLEmbedElement>;
  fieldset: NanoHostComponentHtmlProps<
    NanoHtmlFieldsetProps,
    HTMLFieldSetElement
  >;
  figcaption: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  figure: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  footer: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  form: NanoHostComponentHtmlProps<NanoHtmlFormProps, HTMLFormElement>;
  h1: NanoHostComponentHtmlProps<
    HtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h2: NanoHostComponentHtmlProps<
    HtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h3: NanoHostComponentHtmlProps<
    HtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h4: NanoHostComponentHtmlProps<
    HtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h5: NanoHostComponentHtmlProps<
    HtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  h6: NanoHostComponentHtmlProps<
    HtmlProps<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  head: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  header: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  hgroup: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  hr: NanoHostComponentHtmlProps<HtmlProps<HTMLHRElement>, HTMLHRElement>;
  html: NanoHostComponentHtmlProps<NanoHtmlHtmlProps, HTMLHtmlElement>;
  i: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  iframe: NanoHostComponentHtmlProps<NanoHtmlIframeProps, HTMLIFrameElement>;
  img: NanoHostComponentHtmlProps<NanoHtmlImgProps, HTMLImageElement>;
  input: NanoHostComponentHtmlProps<NanoHtmlInputProps, HTMLInputElement>;
  ins: NanoHostComponentHtmlProps<NanoHtmlInsProps, HTMLModElement>;
  kbd: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  keygen: NanoHostComponentHtmlProps<NanoHtmlKeygenProps, HTMLElement>;
  label: NanoHostComponentHtmlProps<NanoHtmlLabelProps, HTMLLabelElement>;
  legend: NanoHostComponentHtmlProps<
    HtmlProps<HTMLLegendElement>,
    HTMLLegendElement
  >;
  li: NanoHostComponentHtmlProps<NanoHtmlLiProps, HTMLLIElement>;
  link: NanoHostComponentHtmlProps<NanoHtmlLinkProps, HTMLLinkElement>;
  main: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  map: NanoHostComponentHtmlProps<NanoHtmlMapProps, HTMLMapElement>;
  mark: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  menu: NanoHostComponentHtmlProps<NanoHtmlMenuProps, HTMLMenuElement>;
  menuitem: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  meta: NanoHostComponentHtmlProps<NanoHtmlMetaProps, HTMLMetaElement>;
  meter: NanoHostComponentHtmlProps<NanoHtmlMeterProps, HTMLMeterElement>;
  nav: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  noscript: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  object: NanoHostComponentHtmlProps<NanoHtmlObjectProps, HTMLObjectElement>;
  ol: NanoHostComponentHtmlProps<NanoHtmlOlProps, HTMLOListElement>;
  optgroup: NanoHostComponentHtmlProps<
    NanoHtmlOptgroupProps,
    HTMLOptGroupElement
  >;
  option: NanoHostComponentHtmlProps<NanoHtmlOptionProps, HTMLOptionElement>;
  output: NanoHostComponentHtmlProps<NanoHtmlOutputProps, HTMLOutputElement>;
  p: NanoHostComponentHtmlProps<
    HtmlProps<HTMLParagraphElement>,
    HTMLParagraphElement
  >;
  param: NanoHostComponentHtmlProps<NanoHtmlParamProps, HTMLParamElement>;
  picture: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  pre: NanoHostComponentHtmlProps<HtmlProps<HTMLPreElement>, HTMLPreElement>;
  progress: NanoHostComponentHtmlProps<
    NanoHtmlProgressProps,
    HTMLProgressElement
  >;
  q: NanoHostComponentHtmlProps<NanoHtmlQuoteProps, HTMLQuoteElement>;
  rp: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  rt: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  ruby: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  s: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  samp: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  search: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  slot: NanoHostComponentHtmlProps<NanoHtmlSlotProps, HTMLSlotElement>;
  script: NanoHostComponentHtmlProps<NanoHtmlScriptProps, HTMLScriptElement>;
  section: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  select: NanoHostComponentHtmlProps<NanoHtmlSelectProps, HTMLSelectElement>;
  small: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  source: NanoHostComponentHtmlProps<NanoHtmlSourceProps, HTMLSourceElement>;
  span: NanoHostComponentHtmlProps<HtmlProps<HTMLSpanElement>, HTMLSpanElement>;
  strong: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  style: NanoHostComponentHtmlProps<NanoHtmlStyleProps, HTMLStyleElement>;
  sub: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  summary: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  sup: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  table: NanoHostComponentHtmlProps<NanoHtmlTableProps, HTMLTableElement>;
  template: NanoHostComponentHtmlProps<
    HtmlProps<HTMLTemplateElement>,
    HTMLTemplateElement
  >;
  tbody: NanoHostComponentHtmlProps<
    HtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  td: NanoHostComponentHtmlProps<NanoHtmlTdProps, HTMLTableCellElement>;
  textarea: NanoHostComponentHtmlProps<
    NanoHtmlTextareaProps,
    HTMLTextAreaElement
  >;
  tfoot: NanoHostComponentHtmlProps<
    HtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  th: NanoHostComponentHtmlProps<NanoHtmlThProps, HTMLTableCellElement>;
  thead: NanoHostComponentHtmlProps<
    HtmlProps<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  time: NanoHostComponentHtmlProps<NanoHtmlTimeProps, HTMLTimeElement>;
  title: NanoHostComponentHtmlProps<
    HtmlProps<HTMLTitleElement>,
    HTMLTitleElement
  >;
  tr: NanoHostComponentHtmlProps<
    HtmlProps<HTMLTableRowElement>,
    HTMLTableRowElement
  >;
  track: NanoHostComponentHtmlProps<NanoHtmlTrackProps, HTMLTrackElement>;
  u: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  ul: NanoHostComponentHtmlProps<HtmlProps<HTMLUListElement>, HTMLUListElement>;
  var: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  video: NanoHostComponentHtmlProps<NanoHtmlVideoProps, HTMLVideoElement>;
  wbr: NanoHostComponentHtmlProps<HtmlProps<HTMLElement>, HTMLElement>;
  webview: NanoHostComponentHtmlProps<NanoHtmlWebViewProps, HTMLElement>;
}
