import type { PropsWithChildren } from '../../api/renderable';
import type { DomEventProps } from '../../dom/event';

export type Booleanish = boolean | 'true' | 'false';

export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export type DomProps<T extends EventTarget> = PropsWithChildren<
  DomEventProps<T>
>;
