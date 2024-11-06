import { NanoStyle } from "../style/style";

export type NanoIntrinsicElements = {
  div: {
    id?: string;
    class?: string | NanoStyle | (string | NanoStyle)[];
  };
};
