import {
  classNames,
  createStyleSheet,
  css,
  JSX,
  useStyleSheet,
} from '@nano-ui/nano';

interface Props {
  checked?: boolean;
  onClick?: (checked: boolean) => void;
}

export function CheckBox({ checked = false, onClick }: Props): JSX.Element {
  const css = useStyleSheet(styleSheet);
  return (
    <input
      type={'checkbox'}
      class={classNames({
        [css.root]: true,
        [css.checked]: checked,
      })}
      onClick={() => onClick?.(!checked)}
    />
  );
}

const styleSheet = createStyleSheet({
  root: css`
    display: inline-block;
    width: 36px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 18px;
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  `,
  checked: css`
    background: url('/img/check.svg');
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
  `,
});
