import type {
  Component,
  Empty,
  Primitive,
  Renderable,
  PropsWithChildren,
} from './api/renderable';
import type { Ref, PropsWithRef } from './api/ref';
import type { Key, PropsWithKey } from './api/key';
import type { Context } from './api/context';
import { Fragment } from './api/fragment';
import { Portal } from './api/portal';
import type { VNode } from './api/vnode';
import type { Style, StyleSheet } from './api/style';

import { createContext } from './core/context';
import { render } from './core/render';

import type { DomClass, DomStyle } from './dom/type';

import {
  type DomEventProps,
  Event,
  ClipboardEvent,
  DragEvent,
  FocusEvent,
  InputEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  WheelEvent,
  EventFilter,
} from './dom/event';

import { classNames } from './dom/element';
import type { EventDispatcher } from './dom/dispatcher';
import { StyleDecorator } from './dom/style-decorator';

import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useStyleSheet,
  useEventDispatcher,
} from './hooks/hook';

import { css, keyframes, createStyleSheet } from './style/style';

import * as JSX from './jsx/runtime';
import type { HtmlProps } from './jsx/intrinsic/html';

export {
  render,
  // Classes and types
  type Renderable,
  type Empty,
  type Primitive,
  type Component,
  type Ref,
  type Key,
  type VNode,
  type PropsWithKey,
  type PropsWithRef,
  type PropsWithChildren,
  type Context,
  Fragment,
  Portal,
  EventFilter,
  type EventDispatcher,
  StyleDecorator,
  createContext,
  type DomClass,
  type DomStyle,
  type HtmlProps,
  type DomEventProps,
  classNames,
  // Events
  Event,
  ClipboardEvent,
  DragEvent,
  FocusEvent,
  InputEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  WheelEvent,
  // Hooks
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useStyleSheet,
  useEventDispatcher,
  // Styles
  css,
  keyframes,
  createStyleSheet,
  type Style,
  type StyleSheet,
  // JSX
  JSX,
};
