export type StyleBundle = {
  [key: string]: Style;
};

export interface StyleSheet<B extends StyleBundle> {
  bundle: B;
  classNames: Record<keyof B, string>;
}

export type StyleId = string;

export interface Style {
  id: StyleId;
  rule: string;
}
