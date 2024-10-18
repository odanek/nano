import * as JSX from './jsx';

export type FiberProps = object;
export type FiberKey = unknown;
export type FiberType = string | FunctionComponent;
export type FunctionComponent = (props?: FiberProps) => JSX.Element;
