import {
  TodoAction,
  TodoAddItemAction,
  TodoCompleteItemAction,
  TodoRemoveItemAction,
  TodoSetFilterAction,
} from './action';
import { TodoAppState } from './state';

export function todoReducer(
  state: TodoAppState,
  action: TodoAction,
): TodoAppState {
  switch (action.type) {
    case 'completeItem':
      state = actionCompleteItem(state, action);
      break;
    case 'completeAll':
      state = actionCompleteAll(state);
      break;
    case 'removeItem':
      state = actionRemoveItem(state, action);
      break;
    case 'addItem':
      state = actionAddItem(state, action);
      break;
    case 'clearCompleted':
      state = actionClearCompleted(state);
      break;
    case 'setFilter': {
      state = actionSetFilter(state, action);
      break;
    }
  }
  return state;
}

function actionCompleteItem(
  state: TodoAppState,
  action: TodoCompleteItemAction,
): TodoAppState {
  return {
    ...state,
    items: state.items.map((item) =>
      item.id === action.id ? { ...item, done: !item.done } : item,
    ),
  };
}

function actionCompleteAll(state: TodoAppState): TodoAppState {
  const allSet = state.items.every((item) => item.done);
  return {
    ...state,
    items: state.items.map((item) => ({ ...item, done: !allSet })),
  };
}

function actionRemoveItem(
  state: TodoAppState,
  action: TodoRemoveItemAction,
): TodoAppState {
  return {
    ...state,
    items: state.items.filter((item) => item.id !== action.id),
  };
}

function actionAddItem(
  state: TodoAppState,
  action: TodoAddItemAction,
): TodoAppState {
  return {
    ...state,
    items: [
      ...state.items,
      { id: state.nextId + 1, done: false, label: action.label },
    ],
    nextId: state.nextId + 1,
  };
}

function actionClearCompleted(state: TodoAppState): TodoAppState {
  return {
    ...state,
    items: state.items.filter((item) => !item.done),
  };
}

function actionSetFilter(
  state: TodoAppState,
  action: TodoSetFilterAction,
): TodoAppState {
  return {
    ...state,
    filter: action.filter,
  };
}
