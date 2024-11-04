import { JSX, render, useEffect } from '@nano-ui/core';

function Foo(): JSX.Element {
  useEffect((): undefined => {
    console.log('Rendered passive');
  });

  return (
    <div class={'foo'}>
      Hello <div>Nic se nedeje</div>
    </div>
  );
}

function run(): void {
  render(<Foo />, document.body);
}

window.addEventListener('DOMContentLoaded', run);

// TODO Tets fragments and specify jsxFragment in esbuild config if it doesn't work
