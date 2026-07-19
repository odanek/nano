import { type NanoChildren } from '../../vdom/type';
import type { DomEventProps } from '../../dom';

export type Booleanish = boolean | 'true' | 'false';

export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export interface DomProps<T extends EventTarget> extends DomEventProps<T> {
  children?: NanoChildren;
}


