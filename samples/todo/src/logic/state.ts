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

export const initialState: TodoAppState = {
  nextId: 4,
  filter: 'all',
  items: [
    { id: 1, done: false, label: 'One' },
    { id: 2, done: true, label: 'Two' },
    { id: 3, done: true, label: 'Three' },
  ],
};
