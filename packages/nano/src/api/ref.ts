export interface Ref<T = unknown> {
  current: T;
}

export type PropsWithRef<P = unknown> = P & {
  ref?: Ref | undefined;
};
