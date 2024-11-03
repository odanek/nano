import { JSX, render } from '@nano-ui/core';

function Foo(): JSX.Element {
  return (
    <div class={'foo'}>
      Hello
      <div />
    </div>
  );
}

function run() {
    render(<Foo />, document.body);
}

window.addEventListener('DOMContentLoaded', run);