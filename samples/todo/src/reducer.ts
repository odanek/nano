import { TodoAction } from './action';

export interface TodoItemState {
  id: number;
  done: boolean;
  label: string;
}

export type TodoFilterType = 'all' | 'active' | 'completed';

export interface TodoAppState {
  nextId: number;
  items: TodoItemState[];
  filter: TodoFilterType;
}

export function todoReducer(
  state: TodoAppState,
  action: TodoAction,
): TodoAppState {
  switch (action.type) {
    case 'completeItem': {
      state = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, done: !item.done } : item,
        ),
      };
      break;
    }
    case 'completeAll': {
      const allSet = state.items.every((item) => item.done);
      state = {
        ...state,
        items: state.items.map((item) => ({ ...item, done: !allSet })),
      };
      break;
    }
    case 'removeItem':
      state = {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
      break;
    case 'addItem':
      state = {
        ...state,
        items: [
          ...state.items,
          { id: state.nextId + 1, done: false, label: action.label },
        ],
        nextId: state.nextId + 1,
      };
      break;
    case 'clearCompleted': {
      state = {
        ...state,
        items: state.items.filter((item) => !item.done),
      };
      break;
    }
    case 'setFilter': {
      state = {
        ...state,
        filter: action.filter,
      };
      break;
    }
  }
  return state;
}
