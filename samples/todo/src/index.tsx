import { render, useState } from '@nano-ui/core';
import { CheckBox } from './check-box';

function App(): JSX.Element {
  const [checked, setChecked] = useState<boolean>(false);
  return <CheckBox checked={checked} onClick={setChecked} />;
}

function run(): void {
  render(<App />, document.body);
}

window.addEventListener('DOMContentLoaded', run);
