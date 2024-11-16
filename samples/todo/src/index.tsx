import { render } from '@nano-ui/core';
import { TodoApp } from './app';

function run(): void {
  render(<TodoApp />, document.body);
}

window.addEventListener('DOMContentLoaded', run);
