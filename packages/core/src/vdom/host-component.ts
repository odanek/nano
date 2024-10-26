import { isString, isNumber } from '@nano-ui/type';
import { setHostTextContent } from './host-text';
import { NanoFiber } from './fiber';
import { NanoPropsWithChildren } from './type';
import { NanoEventHandler } from '../event/dispatcher';

export type NanoHostComponentStateNode = HTMLElement | SVGElement;
export type NanoHostComponentStyle = Record<string, string>;

export type NanoHostComponentCaptureEventProps = { // TODO
  onCaptureClick?: NanoEventHandler;
};
export type NanoHostComponentBubbleEventProps = { // TODO
  onClick?: NanoEventHandler;
};
export type NanoHostComponentAttributeProps = {
  class?: string;
  style: NanoHostComponentStyle;
};
// TODO Explicitly name all style props
export type NanoHostComponentProps = NanoPropsWithChildren<
  NanoHostComponentAttributeProps &
    NanoHostComponentCaptureEventProps &
    NanoHostComponentBubbleEventProps
>;

export type NanoHostComponentPropsDiff = Array<string | null>;
type DiffFunc = (
  diff: NanoHostComponentPropsDiff,
  key: string,
  oldValue: unknown,
  newValue: unknown,
) => void;

// TODO Determine this automatically based on whether we are inside svg or not
const svgNamespace = 'http://www.w3.org/2000/svg';
const typeNamespace: Record<string, string> = Object.freeze({
  circle: svgNamespace,
  clipPath: svgNamespace,
  defs: svgNamespace,
  desc: svgNamespace,
  ellipse: svgNamespace,
  filter: svgNamespace,
  g: svgNamespace,
  line: svgNamespace,
  linearGradient: svgNamespace,
  marker: svgNamespace,
  mask: svgNamespace,
  metadata: svgNamespace,
  mpath: svgNamespace,
  path: svgNamespace,
  pattern: svgNamespace,
  polygon: svgNamespace,
  polyline: svgNamespace,
  radialGradient: svgNamespace,
  rect: svgNamespace,
  set: svgNamespace,
  stop: svgNamespace,
  svg: svgNamespace,
  switch: svgNamespace,
  symbol: svgNamespace,
  text: svgNamespace,
  textPath: svgNamespace,
  use: svgNamespace,
  view: svgNamespace,
});

export function createHostComponentInstance(
  fiber: NanoFiber,
): NanoHostComponentStateNode {
  const props = fiber.pendingProps as NanoHostComponentProps;
  const node = createElement(fiber.type as string);
  setInitialProperties(node, props);
  setInitialChildren(node, props);
  return node;
}

export function updateHostComponentInstance(
  node: NanoHostComponentStateNode,
  diff: NanoHostComponentPropsDiff,
) {
  let i = 0;
  const length = diff.length;
  while (i < length) {
    const key = diff[i++] as string;
    const value = diff[i++] as string | null;

    if (key === SET_STYLE) {
      // @ts-expect-error TODO
      node.style[value] = diff[i++];
    } else if (key === SET_TEXT_CHILD) {
      setHostTextContent(node, value as string);
    } else if (value === null) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, value);
    }
  }
}

function createElement(type: string): NanoHostComponentStateNode {
  const namespace = typeNamespace[type];
  const element =
    namespace !== undefined
      ? document.createElementNS(namespace, type)
      : document.createElement(type);
  return element as NanoHostComponentStateNode;
}

function setInitialProperties(
  node: NanoHostComponentStateNode,
  props: NanoHostComponentProps,
) {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (key === 'style') {
      for (const [styleKey, styleValue] of Object.entries(
        value as NanoHostComponentStyle,
      )) {
        // @ts-expect-error Setting a custom style
        node.style[styleKey] = styleValue;
      }
    } else if (key !== 'children' && !key.startsWith('on')) {
      node.setAttribute(key, value as string);
    }
  }
}

function setInitialChildren(
  node: NanoHostComponentStateNode,
  props: NanoHostComponentProps,
) {
  const children = props.children;
  if (isString(children) || isNumber(children)) {
    setHostTextContent(node, children.toString());
  }
}

export function diffProperties(current: NanoFiber, workInProgress: NanoFiber) {
  const oldProps = current.memoizedProps as NanoHostComponentProps;
  const newProps = workInProgress.pendingProps as NanoHostComponentProps;
  if (oldProps === newProps) {
    return null;
  }

  const diff: NanoHostComponentPropsDiff = [];
  diffObjects(diff, oldProps, newProps, diffPropertyChange);
  return diff.length === 0 ? null : diff;
}

function diffObjects(
  diff: NanoHostComponentPropsDiff,
  left: object,
  right: object,
  handler: DiffFunc,
) {
  for (const [key, value] of Object.entries(left)) {
    // @ts-expect-error TODO
    const newValue = right[key];
    if (value !== newValue) {
      handler(diff, key, value, newValue);
    }
  }
  for (const [key, value] of Object.entries(right)) {
    // @ts-expect-error TODO
    const oldValue = left[key];
    if (oldValue === undefined) {
      handler(diff, key, oldValue, value);
    }
  }
}

function diffPropertyChange(
  diff: NanoHostComponentPropsDiff,
  key: string,
  oldValue: unknown,
  newValue: unknown,
) {
  if (key === 'children') {
    if (isString(newValue) || isNumber(newValue)) {
      diff.push(SET_TEXT_CHILD, newValue.toString());
    }
  } else if (key === 'style') {
    diffObjects(
      diff,
      oldValue ?? emptyObject,
      newValue ?? emptyObject,
      diffStyleChange,
    );
  } else if (!key.startsWith('on')) {
    // @ts-expect-error TODO
    diff.push(key, newValue === undefined ? null : newValue);
  }
}

function diffStyleChange(
  diff: NanoHostComponentPropsDiff,
  key: string,
  oldValue: unknown,
  newValue: unknown,
) {
  // @ts-expect-error TODO
  diff.push(SET_STYLE, key, newValue === undefined ? null : newValue);
}

const SET_STYLE = '%1';
const SET_TEXT_CHILD = '%2';
const emptyObject = {};
