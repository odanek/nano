import { JSX, render } from '@nano-ui/core';

function Foo(): JSX.Element {
  return (
    <div class={'foo'}>
      Hello <div>Nic se nedeje</div>
    </div>
  );
}

function run() {
    render(<Foo />, document.body);
}

window.addEventListener('DOMContentLoaded', run);

// TODO Tets fragments and specify jsxFragment in esbuild config if it doesn't work