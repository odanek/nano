import {
  createStyleSheet,
  css,
  NanoKeyboardEvent,
  useContext,
  useRef,
  useStyleSheet,
} from '@nano-ui/nano';
import { DispatchContext } from './action';

export function TodoHeader(): JSX.Element {
  const css = useStyleSheet(styleSheet);
  const dispatch = useContext(DispatchContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submit = (event: NanoKeyboardEvent<HTMLInputElement>): void => {
    console.log(event);
    const input = inputRef.current;
    if (input !== null && event.key === 'Enter') {
      const label = input.value;
      if (label.length > 0) {
        dispatch({ type: 'addItem', label });
        input.value = '';
      }
    }
  };

  return (
    <header class={css.root}>
      <button
        class={css.completeAll}
        onClick={() => dispatch({ type: 'completeAll' })}
      />
      <input
        class={css.input}
        type={'text'}
        placeholder={'What needs to be done?'}
        onKeyDown={submit}
        ref={inputRef}
      />
    </header>
  );
}

const styleSheet = createStyleSheet({
  root: css`
    display: flex;
    padding: 4px 4px 4px 22px;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  `,
  completeAll: css`
    cursor: pointer;
    appearance: none;
    transform: rotate(90deg);
    border: 0;
    background: none;
    align-self: center;
    transition: color 0.4s;
    font-size: 30px;
    color: #e6e6e6;

    &:hover {
      color: #c6c6c6;
    }

    &:focus {
      outline: 0;
    }
  `,
  input: css`
    margin-left: 8px;
    flex-grow: 1;
    font-size: 24px;
    padding: 12px;
    border: 0;

    &:focus {
      outline: 0;
    }

    &::placeholder {
      color: #ddd;
    }
  `,
});
