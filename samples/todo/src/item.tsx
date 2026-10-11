import {
  classNames,
  createStyleSheet,
  css,
  PropsWithKey,
  useContext,
  useStyleSheet,
} from '@nano-ui/nano';
import { TodoItemState } from './reducer';
import { DispatchContext } from './action';
import { CheckBox } from './check-box';

type Props = PropsWithKey<{
  item: TodoItemState;
}>;

export function TodoItem({ item }: Props): JSX.Element {
  const { done, label } = item;
  const css = useStyleSheet(styleSheet);
  const dispatch = useContext(DispatchContext);

  return (
    <li class={css.root}>
      <CheckBox
        checked={done}
        onClick={() => dispatch({ type: 'completeItem', id: item.id })}
      />
      <span
        class={classNames({
          [css.label]: true,
          [css.done]: done,
        })}
      >
        {label}
      </span>
      <button
        class={css.remove}
        onClick={() => dispatch({ type: 'removeItem', id: item.id })}
      >
        ×
      </button>
    </li>
  );
}

const styleSheet = createStyleSheet(() => {
  const remove = css`
    display: none;
    appearance: none;
    border: 0;
    background: none;
    transition: color 0.4s;
    font-size: 30px;
    cursor: pointer;
    color: #cc9a9a;

    &:hover {
      color: #af5b5e;
    }

    &:focus {
      outline: 0;
    }
  `;

  return {
    root: css`
      display: flex;
      padding: 4px 12px;
      align-items: center;
      border-bottom: 1px solid #ededed;

      &:hover > ${remove} {
        display: block;
      }
    `,
    label: css`
      margin: 16px;
      transition: color 0.4s;
      font-size: 24px;
      flex-grow: 1;
    `,
    done: css`
      color: #d9d9d9;
      text-decoration: line-through;
    `,
    remove,
  };
});
