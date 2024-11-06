import { css, JSX, render, useContext, useEffect, useStyleSheet } from '@nano-ui/core';
import { createContext } from '../../core/dist/vdom/context';

const MyContext = createContext<boolean>('MyContext');

function Bar(): JSX.Element {
  const my = useContext(MyContext);
  // TODO useStyleSheet(styleSheet) vs useParametrizedStyleSheet(provider, arg)
  // TODO parametrized  
  const css = useStyleSheet(barStyleSheet, undefined);  
  return <div class={css.root}>{my ? 'true' : 'false'}</div>;
}

// TODO
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function barStyleSheet() {
    return {
        root: css`
            color: red;
        `,
    };
}

function Foo(): JSX.Element {
  useEffect((): undefined => {
    console.log('Rendered passive');
  });

  return (
    <MyContext value={true}>
      <div class={'foo'}>
        Hello: <Bar />
      </div>
    </MyContext>
  );
}

function run(): void {
  render(<Foo />, document.body);
}

window.addEventListener('DOMContentLoaded', run);

// TODO Tets fragments and specify jsxFragment in esbuild config if it doesn't work
