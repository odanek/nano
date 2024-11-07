import { isString, isNumber, isArray } from '@nano-ui/type';
import { setHostTextContent } from './host-text';
import { NanoFiber } from './fiber';

import { NanoEventHandler } from '../event/dispatcher';
import { NanoChildrenProp, NanoRefProp } from './type';
import { NanoStyle } from '../style/style';

// TODO How to represent this?
export type NanoHostComponentClassAttributeObject = [(string | NanoStyle), boolean];
export type NanoHostComponentClassAttribute = string | NanoStyle | (string | NanoStyle | NanoHostComponentClassAttributeObject)[];
export type NanoHostComponentStateNode = HTMLElement | SVGElement;
export type NanoHostComponentStyleAttribute = Record<string, string>;

// TODO Merge somehow with intrinsic elements?
export type NanoHostComponentCaptureEventProps = {
  // TODO
  onCaptureClick?: NanoEventHandler;
};
export type NanoHostComponentBubbleEventProps = {
  // TODO
  onClick?: NanoEventHandler;
};
export type NanoHostComponentEventProps = NanoHostComponentCaptureEventProps &
  NanoHostComponentBubbleEventProps;

export type NanoHostComponentAttributeProps = {
  id?: string;
  class?: NanoHostComponentClassAttribute;
  style?: NanoHostComponentStyleAttribute;
};

// TODO Explicitly name all style props
export type NanoHostComponentProps = NanoChildrenProp &
  NanoRefProp &
  NanoHostComponentAttributeProps &
  NanoHostComponentEventProps;

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
  const props = fiber.pendingProps as NanoHostComponentProps;
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
  props: NanoHostComponentProps,
): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (key === 'class') {
      node.setAttribute('class', classNames(value as NanoHostComponentClassAttribute));
    } else if (key === 'style') {
      for (const [styleKey, styleValue] of Object.entries(
        value as NanoHostComponentStyleAttribute,
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
  const oldProps = current.memoizedProps as NanoHostComponentProps;
  const newProps = workInProgress.pendingProps as NanoHostComponentProps;
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
    const oldClassName = classNames(oldValue as NanoHostComponentClassAttribute);
    const newClassName = classNames(newValue as NanoHostComponentClassAttribute);
    if (oldClassName !== newClassName) {
      diff.push(key, newClassName);
    }
  } else if (key === 'style') {
    diffStyle(
      diff,
      (oldValue ?? emptyStyle) as NanoHostComponentStyleAttribute,
      (newValue ?? emptyStyle) as NanoHostComponentStyleAttribute,
    );
  } else if (!key.startsWith('on')) {
    // @ts-expect-error TODO
    diff.push(key, newValue === undefined ? null : newValue);
  }
}

function diffStyle(
  diff: NanoHostComponentPropsDiff,
  oldStyle: NanoHostComponentStyleAttribute,
  newStyle: NanoHostComponentStyleAttribute,
): void {
  for (const [key, value] of Object.entries(newStyle)) {
    const oldValue = oldStyle[key];
    if (value !== oldValue) {
      diff.push(SET_STYLE, key, value === undefined ? null : value);
    }
  }
  for (const key of Object.keys(oldStyle)) {
    const newValue = newStyle[key];
    if (newValue === undefined) {
      diff.push(SET_STYLE, key, null);
    }
  }
}

export function classNames(names: NanoHostComponentClassAttribute): string {  
	const result: string[] = [];
  if (isArray(names)) {
    for (const name of names) {
      addClassNames(result, name);
    }
  } else {
    addClassNames(result, names);
  }  
	return result.join(' ');
}

function addClassNames(result: string[], name: string | NanoStyle | NanoHostComponentClassAttributeObject): void {
  if (isString(name)) {
    result.push(name);
  } else if (name instanceof NanoStyle) {
    result.push(name.id);
  } else if (isArray(name)) {    
    if (name[1]) {
      result.push(name[0].toString());
    }
  }
}

const SET_STYLE = '%1';
const SET_TEXT_CHILD = '%2';
const emptyStyle = {};
