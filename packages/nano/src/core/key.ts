export type Key = unknown;

export type PropsWithKey<P = unknown> = P & {
  key?: Key | undefined;
};
