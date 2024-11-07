import {
  classNames,
  css,
  JSX,
  render,
  useContext,
  useEffect,
  useState,
  useStyleSheet,
} from '@nano-ui/core';
import { createContext } from '../../core/dist/vdom/context';

const MyContext = createContext<boolean>('MyContext');

function Bar({ bold }: { bold: boolean }): JSX.Element {
  const my = useContext(MyContext);
  const css = useStyleSheet(barStyleSheet);
  return (
    <div
      class={classNames({
        [css.root]: true,
        [css.bold]: bold,
      })}
    >
      {my ? 'true' : 'false'}
    </div>
  );
}

const barStyleSheet = {
  root: css`
    color: red;
  `,
  bold: css`
    font-weight: bold;
  `,
};

function Foo(): JSX.Element {
  const [bold, setBold] = useState(false);

  useEffect((): undefined => {
    console.log('Rendered passive');
  }, []);

  return (
    <MyContext value={true}>
      <div class={'foo'}>
        Hello: <Bar bold={bold} />
        <button onClick={() => setBold(!bold)}>Toggle bold</button>
      </div>
    </MyContext>
  );
}

function run(): void {
  render(<Foo />, document.body);
}

window.addEventListener('DOMContentLoaded', run);

// TODO Tets fragments and specify jsxFragment in esbuild config if it doesn't work
