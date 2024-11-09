import { NanoPointerEvent } from '../../event/pointer-event';
import { NanoEventHandler } from '../../event/type';
import { NanoChildrenProps, NanoRefProps } from '../type';

// Host Component Prop types
export type NanoHostComponentClassPropValue = string | string[];
export type NanoHostComponentStylePropValue = Record<string, string>;

// TODO Merge somehow with intrinsic elements?
export type NanoHostComponentCaptureEventProps = {
  // TODO
  onCaptureClick?: NanoEventHandler<NanoPointerEvent>;
};
export type NanoHostComponentBubbleEventProps = {
  // TODO
  onClick?: NanoEventHandler<NanoPointerEvent>;
};
export type NanoHostComponentEventProps = NanoHostComponentCaptureEventProps &
  NanoHostComponentBubbleEventProps;

export type NanoHostComponentAttributeProps = {
  id?: string;
  class?: NanoHostComponentClassPropValue;
  style?: NanoHostComponentStylePropValue;
};

// TODO Explicitly name all style props
export type NanoHostComponentProps = NanoChildrenProps &
  NanoRefProps &
  NanoHostComponentAttributeProps &
  NanoHostComponentEventProps;
