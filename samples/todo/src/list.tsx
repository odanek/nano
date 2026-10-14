import { createStyleSheet, css, useMemo, useStyleSheet } from '@nano-ui/nano';
import { TodoFilterType, TodoItemState } from './logic/state';
import { TodoFooter } from './footer';
import { TodoHeader } from './header';
import { TodoItem } from './item';

interface Props {
  items: TodoItemState[];
  filter: TodoFilterType;
}

export function TodoList({ items, filter }: Props): JSX.Element {
  const css = useStyleSheet(styleSheet);
  const filteredItems = useMemo(
    () => filterItems(items, filter),
    [items, filter],
  );

  return (
    <div class={css.root}>
      <TodoHeader />
      <ul class={css.list}>{filteredItems}</ul>
      <TodoFooter items={items} filter={filter} />
    </div>
  );
}

function filterItems(
  items: TodoItemState[],
  filter: TodoFilterType,
): JSX.Element[] {
  return items
    .filter((item) => isVisible(filter, item.done))
    .map((item) => <TodoItem item={item} key={item.id} />);
}

function isVisible(filter: TodoFilterType, done: boolean): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'active':
      return !done;
    case 'completed':
      return done;
  }
}

const styleSheet = createStyleSheet({
  root: css`
    background-color: white;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.2),
      0 25px 50px 0 rgba(0, 0, 0, 0.1);
  `,
  list: css`
    margin: 0;
    padding: 0;
    list-style: none;
  `,
});
