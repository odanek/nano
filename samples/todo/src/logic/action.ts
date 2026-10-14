import { createContext } from '@nano-ui/nano';
import { TodoFilterType } from './state';

export interface TodoAddItemAction {
  type: 'addItem';
  label: string;
}

export interface TodoRemoveItemAction {
  type: 'removeItem';
  id: number;
}

export interface TodoCompleteItemAction {
  type: 'completeItem';
  id: number;
}

export interface TodoCompleteAllAction {
  type: 'completeAll';
}

export interface TodoClearCompletedAction {
  type: 'clearCompleted';
}

export interface TodoSetFilterAction {
  type: 'setFilter';
  filter: TodoFilterType;
}

export type TodoAction =
  | TodoAddItemAction
  | TodoRemoveItemAction
  | TodoCompleteItemAction
  | TodoCompleteAllAction
  | TodoClearCompletedAction
  | TodoSetFilterAction;

export type ActionDispatcher = (action: TodoAction) => void;

export const DispatchContext = createContext<ActionDispatcher>('dispatch');
