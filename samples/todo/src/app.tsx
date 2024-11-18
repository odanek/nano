import { TodoAppState, todoReducer } from './reducer';
import { DispatchContext } from './action';
import { TodoList } from './list';
import {
  createStyleSheet,
  css,
  useReducer,
  useStyleSheet,
} from '@nano-ui/nano';

const initialState: TodoAppState = {
  nextId: 4,
  filter: 'all',
  items: [
    { id: 1, done: false, label: 'One' },
    { id: 2, done: true, label: 'Two' },
    { id: 3, done: true, label: 'Three' },
  ],
};

export function TodoApp(): JSX.Element {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const css = useStyleSheet(styleSheet);
  return (
    <DispatchContext value={dispatch}>
      <div class={css.page}>
        <section class={css.app}>
          <h1 class={css.heading}>todos</h1>
          <TodoList items={state.items} filter={state.filter} />
        </section>
      </div>
    </DispatchContext>
  );
}

const styleSheet = createStyleSheet({
  page: css`
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 14px;
    height: 100%;
    background-color: #f5f5f5;
    overflow: auto;
  `,
  app: css`
    width: 550px;
    margin: 0 auto;
  `,
  heading: css`
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    margin: 10px;
    color: rgba(175, 47, 47, 0.15);
  `,
});
