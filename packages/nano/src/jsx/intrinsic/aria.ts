import type { Booleanish } from './common';

export type AriaProps = {
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
    'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined;
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
    boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
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

export type AriaRole =
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
