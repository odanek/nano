import {
  classNames,
  createStyleSheet,
  css,
  useMemo,
  useStyleSheet,
} from '@nano-ui/nano';
import { TodoFilterType, TodoItemState } from './logic/state';
import { useActionDispatch } from './hooks/useActionDispatch';

interface Props {
  items: TodoItemState[];
  filter: TodoFilterType;
}

const filters: TodoFilterType[] = ['all', 'active', 'completed'];

export function TodoFooter({
  items,
  filter: activeFilter,
}: Props): JSX.Element {
  const css = useStyleSheet(styleSheet);
  const dispatch = useActionDispatch();
  const remaining = useMemo(() => countDone(false, items), [items]);
  const done = useMemo(() => countDone(true, items), [items]);

  return (
    <footer class={css.root}>
      <span class={css.count}>{remaining} item(s) left</span>
      <div>
        {filters.map((filter) => {
          const classes = classNames({
            [css.toggleButton]: true,
            [css.toggleButtonSelected]: filter === activeFilter,
          });
          return (
            <button
              class={classes}
              onClick={() => dispatch({ type: 'setFilter', filter })}
              key={filter}
            >
              {filter}
            </button>
          );
        })}
      </div>
      {done > 0 ? (
        <button
          class={css.clear}
          onClick={() => dispatch({ type: 'clearCompleted' })}
        >
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}

function countDone(done: boolean, items: TodoItemState[]): number {
  return items.reduce(
    (count, item) => (item.done === done ? count + 1 : count),
    0,
  );
}

const styleSheet = createStyleSheet({
  root: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;

    h1,
    h2 {
      color: black;
    }

    @media screen and (min-width: 900px) {
      padding: 1rem 3rem;

      li {
        border: black;
      }
    }
  `,
  count: css`
    position: absolute;
    left: 0;
    color: #777;
    padding: 4px 15px;
  `,
  clear: css`
    position: absolute;
    right: 0;
    padding: 4px 15px;
    color: #777;
    appearance: none;
    border: none;
    background: none;
    font-size: inherit;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &:focus {
      outline: 0;
    }
  `,
  toggleButton: css`
    color: #777;
    appearance: none;
    border: 1px solid transparent;
    border-radius: 4px;
    background: none;
    font-size: inherit;
    padding: 4px 6px;
    cursor: pointer;
    text-transform: capitalize;
    transition: border-color 0.4s;

    &:hover {
      border-color: #ddd;
    }

    &:focus {
      outline: 0;
    }

    & + & {
      margin-left: 8px;
    }
  `,
  toggleButtonSelected: css`
    border-color: #aaa !important;
  `,
});
