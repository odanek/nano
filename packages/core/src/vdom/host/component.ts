import { isString, isNumber } from '@nano-ui/type';
import { setHostTextContent } from './text';
import { NanoFiber } from '../fiber';
import {
  NanoHostComponentClassPropValue,
  NanoHostComponentProps,
  NanoHostComponentStylePropValue,
} from './type';

export type NanoHostComponentStateNode = HTMLElement | SVGElement;
export type NanoHostComponentPropsDiff = Array<string | null>;

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
  const props = fiber.pendingProps as NanoHostComponentProps<unknown>;
  const node = createElement(fiber.type as string);
  setInitialProperties(node, props);
  setInitialChildren(node, props);
  return node;
}

export function updateHostComponentInstance(
  node: NanoHostComponentStateNode,
  diff: NanoHostComponentPropsDiff,
): void {
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
  props: NanoHostComponentProps<unknown>,
): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (key === 'class') {
      const className = classNameString(
        value as NanoHostComponentClassPropValue,
      );
      if (className !== null) {
        node.setAttribute('class', className);
      }
    } else if (key === 'style') {
      for (const [styleKey, styleValue] of Object.entries(
        value as NanoHostComponentStylePropValue,
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
  props: NanoHostComponentProps<unknown>,
): void {
  const children = props.children;
  if (isString(children) || isNumber(children)) {
    setHostTextContent(node, children.toString());
  }
}

export function diffProperties(
  current: NanoFiber,
  workInProgress: NanoFiber,
): NanoHostComponentPropsDiff | null {
  const oldProps = current.memoizedProps as NanoHostComponentProps<unknown>;
  const newProps =
    workInProgress.pendingProps as NanoHostComponentProps<unknown>;
  if (oldProps === newProps) {
    return null;
  }

  const diff: NanoHostComponentPropsDiff = [];
  diffObjects(diff, oldProps, newProps);
  return diff.length === 0 ? null : diff;
}

function diffObjects(
  diff: NanoHostComponentPropsDiff,
  left: object,
  right: object,
): void {
  for (const [key, value] of Object.entries(left)) {
    // @ts-expect-error TODO
    const newValue = right[key];
    if (value !== newValue) {
      diffPropertyChange(diff, key, value, newValue);
    }
  }
  for (const [key, value] of Object.entries(right)) {
    // @ts-expect-error TODO
    const oldValue = left[key];
    if (oldValue === undefined) {
      diffPropertyChange(diff, key, oldValue, value);
    }
  }
}

function diffPropertyChange(
  diff: NanoHostComponentPropsDiff,
  key: string,
  oldValue: unknown,
  newValue: unknown,
): void {
  // TODO class?
  if (key === 'children') {
    if (isString(newValue) || isNumber(newValue)) {
      diff.push(SET_TEXT_CHILD, newValue.toString());
    }
  } else if (key === 'class') {
    const oldClassName = classNameString(
      oldValue as NanoHostComponentClassPropValue,
    );
    const newClassName = classNameString(
      newValue as NanoHostComponentClassPropValue,
    );
    if (oldClassName !== newClassName) {
      diff.push(key, newClassName);
    }
  } else if (key === 'style') {
    diffStyle(
      diff,
      (oldValue ?? emptyStyle) as NanoHostComponentStylePropValue,
      (newValue ?? emptyStyle) as NanoHostComponentStylePropValue,
    );
  } else if (!key.startsWith('on')) {
    // @ts-expect-error TODO
    diff.push(key, newValue === undefined ? null : newValue);
  }
}

function diffStyle(
  diff: NanoHostComponentPropsDiff,
  oldStyle: NanoHostComponentStylePropValue,
  newStyle: NanoHostComponentStylePropValue,
): void {
  for (const [key, value] of Object.entries(newStyle)) {
    const oldValue = oldStyle[key as keyof NanoHostComponentStylePropValue];
    if (value !== oldValue) {
      diff.push(SET_STYLE, key, value === undefined ? null : value);
    }
  }
  for (const key of Object.keys(oldStyle)) {
    const newValue = newStyle[key as keyof NanoHostComponentStylePropValue];
    if (newValue === undefined) {
      diff.push(SET_STYLE, key, null);
    }
  }
}

function classNameString(name: string | string[]): string | null {
  if (name === null || undefined) {
    return null;
  }
  return isString(name) ? name : name.join(' ');
}

export function classNames(names: Record<string, boolean>): string {
  const result: string[] = [];
  for (const [key, value] of Object.entries(names)) {
    if (value) {
      result.push(key);
    }
  }
  return result.join(' ');
}

const SET_STYLE = '%1';
const SET_TEXT_CHILD = '%2';
const emptyStyle = {};
